import CustomModal from '../common/Modal';
import { Form, Input, message } from 'antd';
import { useForm } from 'antd/es/form/Form';
import { useState } from 'react';
import type { RoleFormData } from '../../types/auth.types';
import { FetchData } from '../../services/FetchData';

interface RoleFormProps {
    open : boolean;
    onClose : () => void;
}

const createRole = async (formData: RoleFormData) => {
    try {
        const response = await FetchData<any>({
            url: "access/create-role",
            method: "POST",
            data: formData,
        });
        if (!response || response.statusCode != 200) throw new Error('Failed to create role');
        return response.data;
    } catch (error) {
        throw error;
    }
};

const RoleForm : React.FC<RoleFormProps> = ({open, onClose}) => {
    const [form] = useForm();
    const [loading, setLoading] = useState(false);

    const inputStyle = {
        borderColor: '#555',
        borderWidth: 1,
        boxShadow: 'none',
    };

    const onFinish = async (values: RoleFormData) => {
        try {
            setLoading(true);
            await createRole(values);

            message.success('Role created successfully!');
            form.resetFields();
            onClose();
        } catch (error) {
            message.error('Failed to create role.');
        } finally {
            setLoading(false);
        }
    };

    const onFinishFailed = () => {
        message.error('Please fill all required fields.');
    };

    return (
        <>
    
            <CustomModal
                open={open}
                title="Create Role"
                okText='Create'
                cancelText='Cancel'
                onOk={form.submit}
                onCancel={onClose}
            >
                <Form
                    form={form}
                    labelCol={{ span: 5 }}
                    wrapperCol={{ span: 14 }}
                    layout="horizontal"
                    style={{ maxWidth: 600 }}
                    autoComplete="off"
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                >
                    <Form.Item
                        label="Role Name"
                        name="roleName"
                        rules={[{ required: true, message: 'Please input the role name!' }]}
                    >
                        <Input placeholder="Enter Role Name" style={inputStyle} autoFocus/>
                    </Form.Item>
                    <Form.Item
                        label="Description"
                        name="description"
                    >
                        <Input placeholder="Enter Role Description" style={inputStyle} />
                    </Form.Item>
                </Form>
            </CustomModal>
        </>
    );
};

export default RoleForm;