import { useForm } from "antd/es/form/Form";
import CustomModal from "../common/Modal";
import { useEffect, useState } from "react";
import { Form, Input, message, Select } from "antd";
import type { RoleList, UserFormData } from "../../types/auth.types";
import { FetchData } from "../../services/FetchData";

interface UserFormProps {
    open : boolean;
    onClose : () => void;
    refreshData: () => void;
}

const UserForm: React.FC<UserFormProps> = ({ open, onClose, refreshData }) => {
    const [form] = useForm();
    const [roles, setRoles] = useState<RoleList[]>([]);
    const [error, setError] = useState<string>("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchRoles = async () => {
            try {
                const response = await FetchData<any>({
                    url: "access/roles",
                    method: "GET",
                });

                if (!response || response.statusCode !== 200) {
                    setError("Error: Failed to fetch roles. " + response.message);
                    return;
                }
                setRoles(response.data);
            }
            catch (error: any) {
                setError("Error : " + error.message);
            }
        }
        fetchRoles();
    }, [])

    const createUser = async (formData: UserFormData) => {
        try {
            const response = await FetchData<any>({
                url: "auth/register",
                method: "POST",
                data: formData,
            });
    
            if (!response || response.statusCode != 200) throw new Error('Failed To Create User.');
            return response.data;
        } catch (error) {
            throw error;
        }
    };

    const onFinish = async (values: UserFormData) => {
        try {
            setLoading(true);
            await createUser(values);

            message.success('User Created Successfully!');
            form.resetFields();
            onClose();
            refreshData();
        } catch (error) {
            message.error('Failed To Create User.');
        } finally {
            setLoading(false);
        }
    };

    const onFinishFailed = () => {
        message.error('Please Fill All Required Fields.');
    };

    return (
        <CustomModal
            open={open}
            title="Create User"
            okText='Create'
            cancelText='Cancel'
            onOk={form.submit}
            onCancel={onClose}
        >
            <Form
                form={form}
                labelCol={{ span: 6 }}
                wrapperCol={{ span: 14 }}
                layout="horizontal"
                style={{ maxWidth: 600 }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                <Form.Item label="First Name" name="firstName" rules={[{ required: true, message: 'Please input your first name!' }]}>
                    <Input placeholder="Enter First Name" autoFocus/>
                </Form.Item>

                <Form.Item label="Middle Name" name="middleName">
                    <Input placeholder="Enter Middle Name" />
                </Form.Item>

                <Form.Item label="Last Name" name="lastName" rules={[{ required: true, message: 'Please input your last name!' }]}>
                    <Input placeholder="Enter Last Name" />
                </Form.Item>

                <Form.Item label="Email Address" name="email"
                    rules={[
                        { type: 'email', message: 'Please enter a valid email address' },
                    ]}
                >
                    <Input placeholder="example@mail.com" />
                </Form.Item>

                <Form.Item label="Username" name="username"
                    rules={[{ required: true, message: 'Please enter your username' },
                    { min: 3, message: 'Username must be at least 3 characters' },
                    ]}
                >
                    <Input placeholder="Enter Username" />
                </Form.Item>

                <Form.Item label="Password" name="password"
                    rules={[{ required: true, message: 'Please input your password!' }]}
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item
                    name="roleId"
                    label="Select Role"
                    rules={[{ required: true, message: 'Please select a role!' }]}
                >
                    <Select placeholder="Select a role">
                        {roles.map((role) => (
                            <Select.Option key={role.roleId} value={role.roleId}>
                                {role.roleName}
                            </Select.Option>
                        ))}
                    </Select>
                </Form.Item>

            </Form>
        </CustomModal>
    )
}

export default UserForm;