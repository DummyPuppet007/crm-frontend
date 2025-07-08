import { Form, Input, message } from "antd";
import CustomModal from "../common/Modal";
import type { ModuleFormData } from "../../types/auth.types";
import { useState } from "react";
import { FetchData } from "../../services/FetchData";

interface ModuleFormProps {
    open : boolean;
    onClose : () => void;
    refreshData : () => void;
}

const createModule = async (formData: ModuleFormData) => {
    try {
        const response = await FetchData<any>({
            url: "access/create-module",
            method: "POST",
            data: formData,
        });
        if (!response || response.statusCode != 200) throw new Error('Failed to create module');
        return response.data;
    } catch (error) {
        throw error;
    }
};

const ModuleForm : React.FC<ModuleFormProps> = ({open, onClose, refreshData}) => {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);

    const inputStyle = {
        borderColor: '#555',
        borderWidth: 1,
        boxShadow: 'none',
    };

    const onFinish = async (values: ModuleFormData) => {
        try {
            setLoading(true);
            await createModule(values);

            message.success('Module created successfully!');
            form.resetFields();
            onClose();
            refreshData();
        } catch (error) {
            message.error('Failed To Create Module.');
        } finally {
            setLoading(false);
        }
    };

    const onFinishFailed = () => {
        message.error('Please Fill All Required Fields.');
    };

    return (
        <>
            <CustomModal
                open={open}
                title="Create Module"
                okText='Create'
                cancelText='Cancel'
                onOk={form.submit}
                onCancel={onClose}
            >
                <Form
                    form={form}
                    labelCol={{ span: 6 }}
                    wrapperCol={{ span: 17 }}
                    layout="horizontal"
                    style={{ maxWidth: 600 }}
                    autoComplete="off"
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                >
                    <Form.Item
                        label="Module Name"
                        name="moduleName"
                        rules={[{ required: true, message: 'Please input the module name!' }]}
                    >
                        <Input placeholder="Enter Module Name" style={inputStyle} autoFocus/>
                    </Form.Item>
                    <Form.Item
                        label="Description"
                        name="description"
                    >
                        <Input placeholder="Enter Module Description" style={inputStyle} />
                    </Form.Item>
                </Form>
            </CustomModal>
        </>
    );
}

export default ModuleForm;