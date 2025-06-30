import { useState } from "react";
import CustomModal from "../common/Modal";
import { Form, Input, message } from "antd";
import type { ActionFormData } from "../../types/auth.types";
import { FetchData } from "../../services/FetchData";

interface ActionFormProps {
    open : boolean;
    onClose : () => void;
    refreshData : () => void;
}

const createAction = async (formData: ActionFormData) => {
    try {
        const response = await FetchData<any>({
            url: "access/create-action",
            method: "POST",
            data: formData,
        });
        if (!response || response.statusCode != 200) throw new Error('Failed to create action');
        return response.data;
    } catch (error) {
        throw error;
    }
};

const ActionForm : React.FC<ActionFormProps> = ({open, onClose, refreshData}) => {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);

    const inputStyle = {
        borderColor: '#555',
        borderWidth: 1,
        boxShadow: 'none',
    };

    const onFinish = async (values: ActionFormData) => {
        try {
            setLoading(true);
            await createAction(values);

            message.success('Action created successfully!');
            form.resetFields();
            onClose();
            refreshData();
        } catch (error) {
            message.error('Failed To Create Action.');
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
                title="Create Action"
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
                        label="Action Name"
                        name="actionName"
                        rules={[{ required: true, message: 'Please input the action name!' }]}
                    >
                        <Input placeholder="Enter Action Name" style={inputStyle} autoFocus/>
                    </Form.Item>
                    <Form.Item
                        label="Description"
                        name="description"
                    >
                        <Input placeholder="Enter Action Description" style={inputStyle} />
                    </Form.Item>
                </Form>
            </CustomModal>
        </>
    );
}

export default ActionForm;