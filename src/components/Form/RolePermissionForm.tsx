import { useEffect, useState } from "react";
import { FetchData } from "../../services/FetchData";
import type { RoleList, RolePermissionFormData } from "../../types/auth.types";
import { Form, message, Select } from "antd";
import CustomModal from "../common/Modal";

interface RolePermissionFormProps {
    open: boolean;
    onClose: () => void;
    refreshData: () => void;
}

const createRolePermission = async (formData: RolePermissionFormData) => {
    try {
        const response = await FetchData<any>({
            url: "access/add-role-permission",
            method: "POST",
            data: formData,
        });
        if (!response || response.statusCode !== 200) throw new Error('Failed to create role permission');
        return response.data;
    } catch (error) {
        throw error;
    }
}

const RolePermissionForm: React.FC<RolePermissionFormProps> = ({ open, onClose, refreshData }) => {
    const [form] = Form.useForm();
    const [roles, setRoles] = useState<RoleList[]>([]);
    const [permissions, setPermissions] = useState<any[]>([]);
    const [error, setError] = useState<string>("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const [roleRes, permissionRes] = await Promise.all([
                FetchData<any>({
                    url: "access/roles",
                    method: "GET",
                }),
                FetchData<any>({
                    url: "access/permissions",
                    method: "GET",
                }),
            ]);

            if (!roleRes || roleRes.statusCode !== 200) {
                setError("Error : Roles not found." + roleRes.message);
            }
            else if (!permissionRes || permissionRes.statusCode !== 200) {
                setError("Error : Permissions not found." + permissionRes.message);
            }

            setRoles(roleRes.data);
            setPermissions(permissionRes.data);
        } catch (error: any) {
            message.error("Error: " + error.message);
        }
    }

    const onFinish = async (values: RolePermissionFormData) => {
        try {
            setLoading(true);
            await createRolePermission(values);

            message.success('Role Permission created successfully!');
            form.resetFields();
            onClose();
            refreshData();
        } catch (error) {
            message.error('Failed To Create Role Permission.');
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
                title="Create Role Permission"
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
                        name="roleId"
                        label="Select Role"
                        rules={[{ required: true, message: 'Please select a role!' }]}
                    >
                        {roles && roles.length > 0 ? (
                            <Select placeholder="Select a role" autoFocus>
                                {roles.map((role) => (
                                    <Select.Option key={role.roleId} value={role.roleId}>
                                        {role.roleName}
                                    </Select.Option>
                                ))}
                            </Select>
                        ) : (
                            <p className="text-red-400" style={{ margin: 0 }}>
                                No Roles Available...
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

export default RolePermissionForm;