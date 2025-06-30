import { useEffect, useState } from "react";
import { FetchData } from "../../services/FetchData";
import { Form, message, Select } from "antd";
import type { RoutePermissionFormData } from "../../types/auth.types";
import CustomModal from "../common/Modal";

interface RoutePermissionFormProps {
    open: boolean;
    onClose: () => void;
    refreshData: () => void;
}

const createRoutePermission = async (formData: RoutePermissionFormData) => {}

const RoutePermissionForm: React.FC<RoutePermissionFormProps> = ({ open, onClose, refreshData }) => {
    const [form] = Form.useForm();
    const [error, setError] = useState<string>("");
    const [loading, setLoading] = useState(false);
    const [routes, setRoutes] = useState<any[]>([]);
    const [permissions, setPermissions] = useState<any[]>([]);

    useEffect(() => {
            fetchData();
        }, []);
    
        const fetchData = async () => {
            try {
                const [routeRes, permissionRes] = await Promise.all([
                    FetchData<any>({
                        url: "access/routes",
                        method: "GET",
                    }),
                    FetchData<any>({
                        url: "access/permissions",
                        method: "GET",
                    }),
                ]);
    
                if (!routeRes || routeRes.statusCode !== 200) {
                    setError("Error : Routes not found." + routeRes.message);
                }
                else if (!permissionRes || permissionRes.statusCode !== 200) {
                    setError("Error : Permissions not found." + permissionRes.message);
                }
                console.log(routeRes.data);
                setRoutes(routeRes.data);
                setPermissions(permissionRes.data);
            } catch (error: any) {
                message.error("Error: " + error.message);
            }
        }

        const onFinish = async (values: RoutePermissionFormData) => {
                    try {
                        setLoading(true);
                        await createRoutePermission(values);
            
                        message.success('Route Permission created successfully!');
                        form.resetFields();
                        onClose();
                        refreshData();
                    } catch (error) {
                        message.error('Failed To Create Route Permission.');
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
                title="Create Route Permission"
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
                        name="routeId"
                        label="Select Route"
                        rules={[{ required: true, message: 'Please select a route!' }]}
                    >
                        {routes && routes.length > 0 ? (
                            <Select placeholder="Select an user" autoFocus>
                                {routes.map((route) => (
                                    <Select.Option key={route.routeId} value={route.routeId}>
                                        {route.routeName}
                                    </Select.Option>
                                ))}
                            </Select>
                        ) : (
                            <p className="text-red-400" style={{ margin: 0 }}>
                                No Routes Available...
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

export default RoutePermissionForm;