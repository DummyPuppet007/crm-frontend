import { Form, message, Select } from "antd";
import CustomModal from "../common/Modal";
import { useEffect, useState } from "react";
import { FetchData } from "../../services/FetchData";
import type { UserList, UserPermissionFormData } from "../../types/auth.types";

interface UserPermissionFormProps {
    open: boolean;
    onClose: () => void;
    refreshData: () => void;
}

const createUserPermission = async (formData: UserPermissionFormData) => {
    try {
        const response = await FetchData<any>({
            url: "access/add-user-permission",
            method: "POST",
            data: formData,
        });
        if (!response || response.statusCode !== 200) throw new Error('Failed to create user permission');
        return response.data;
    } catch (error) {
        throw error;
    }
}

const UserPermissionForm: React.FC<UserPermissionFormProps> = ({ open, onClose, refreshData }) => {
    const [form] = Form.useForm();
    const [users, setUsers] = useState<UserList[]>([]);
    const [permissions, setPermissions] = useState<any[]>([]);
    const [error, setError] = useState<string>("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const [userRes, permissionRes] = await Promise.all([
                FetchData<any>({
                    url: "auth/users",
                    method: "GET",
                }),
                FetchData<any>({
                    url: "access/permissions",
                    method: "GET",
                }),
            ]);

            if (!userRes || userRes.statusCode !== 200) {
                setError("Error : Users not found." + userRes.message);
            }
            else if (!permissionRes || permissionRes.statusCode !== 200) {
                setError("Error : Permissions not found." + permissionRes.message);
            }

            setUsers(userRes.data);
            setPermissions(permissionRes.data);
        } catch (error: any) {
            message.error("Error: " + error.message);
        }
    }

    const onFinish = async (values: UserPermissionFormData) => {
        try {
            setLoading(true);
            await createUserPermission(values);

            message.success('User Permission created successfully!');
            form.resetFields();
            onClose();
            refreshData();
        } catch (error) {
            message.error('Failed To Create User Permission.');
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
                title="Create User Permission"
                okText='Create'
                cancelText='Cancel'
                onOk={form.submit}
                onCancel={onClose}
            >
                <Form
                    form={form}
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 16 }}
                    layout="horizontal"
                    style={{ maxWidth: 600 }}
                    autoComplete="off"
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                >
                    <Form.Item
                        name="userId"
                        label="Select User"
                        rules={[{ required: true, message: 'Please select an user!' }]}
                    >
                        {users && users.length > 0 ? (
                            <Select placeholder="Select an user" autoFocus>
                                {users.map((user) => (
                                    <Select.Option key={user.userId} value={user.userId}>
                                        {user.username}
                                    </Select.Option>
                                ))}
                            </Select>
                        ) : (
                            <p className="text-red-400" style={{ margin: 0 }}>
                                No Users Available...
                            </p>
                        )}
                    </Form.Item>

                    <Form.Item
                        name="permissionId"
                        label="Select Permission"
                        rules={[{ required: true, message: 'Please select a permission!' }]}
                    >
                        {permissions && permissions.length > 0 ? (
                            <Select
                                showSearch
                                style={{ width: 315 }}
                                placeholder="Search to Select"
                                optionFilterProp="label"
                                filterSort={(optionA, optionB) =>
                                    String(optionA?.label ?? '').toLowerCase().localeCompare(String(optionB?.label ?? '').toLowerCase())
                                }
                                options={permissions.map((permission: any) => ({
                                    value: permission.permissionId,
                                    label: `${permission.module.moduleName} - ${permission.action.actionName}`,
                                }))}
                            />
                        ) : (
                            <p className="text-red-400" style={{ margin: 0 }}>
                                No Permissions Available...
                            </p>
                        )}
                    </Form.Item>
                </Form>
            </CustomModal>
        </>
    );
}

export default UserPermissionForm;