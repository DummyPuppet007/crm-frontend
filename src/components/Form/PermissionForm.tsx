import { Form, Input, message, Select } from "antd";
import CustomModal from "../common/Modal";
import type { ActionList, ModuleList, PermissionFormData } from "../../types/auth.types";
import { useEffect, useState } from "react";
import { FetchData } from "../../services/FetchData";

interface PermissionFormProps {
    open: boolean;
    onClose: () => void;
    refreshData: () => void;
}

const createPermission = async (formData: PermissionFormData) => {
    try {
        const response = await FetchData<any>({
            url: "access/add-permission",
            method: "POST",
            data: formData,
        });
        if (!response || response.statusCode != 200) throw new Error('Failed to create permission');
        return response.data;
    } catch (error) {
        throw error;
    }
};

const PermissionForm: React.FC<PermissionFormProps> = ({ open, onClose, refreshData }) => {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const [modules, setModules] = useState<ModuleList[]>([]);
    const [actions, setActions] = useState<ActionList[]>([]);
    const [error, setError] = useState<string>("");

    const inputStyle = {
        borderColor: '#555',
        borderWidth: 1,
        borderRadius: 7
    };

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const [moduleRes, actionRes] = await Promise.all([
                FetchData<any>({
                    url: "access/modules",
                    method: "GET",
                }),
                FetchData<any>({
                    url: "access/actions",
                    method: "GET",
                }),
            ]);

            if (!moduleRes || moduleRes.statusCode !== 200) {
                setError("Error : Modules not found." + moduleRes.message);
            }
            else if (!actionRes || actionRes.statusCode !== 200) {
                setError("Error : Actions not found." + actionRes.message);
            }

            setModules(moduleRes.data);
            setActions(actionRes.data);
        } catch (error: any) {
            message.error("Error: " + error.message);
        }
    }

    const onFinish = async (values: PermissionFormData) => {
        try {
            setLoading(true);
            await createPermission(values);

            message.success('Permission created successfully!');
            form.resetFields();
            onClose();
            refreshData();
        } catch (error) {
            message.error('Failed To Create Permission.');
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
                title="Create Permission"
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
                        name="moduleId"
                        label="Select Module"
                        rules={[{ required: true, message: 'Please select a module!' }]}
                    >
                        {modules && modules.length > 0 ? (
                            <Select placeholder="Select a module" style={inputStyle} autoFocus>
                                {modules.map((module) => (
                                    <Select.Option key={module.moduleId} value={module.moduleId}>
                                        {module.moduleName}
                                    </Select.Option>
                                ))}
                            </Select>
                        ) : (
                            <p className="text-red-400" style={{ margin: 0 }}>
                                No Modules Available...
                            </p>
                        )}
                    </Form.Item>
                    <Form.Item
                        name="actionId"
                        label="Select Action"
                        rules={[{ required: true, message: 'Please select an action!' }]}
                    >
                        {actions && actions.length > 0 ? (
                            <Select placeholder="Select an action" style={inputStyle} >
                                {actions.map((action) => (
                                    <Select.Option key={action.actionId} value={action.actionId}>
                                        {action.actionName}
                                    </Select.Option>
                                ))}
                            </Select>
                        ) : (
                            <p className="text-red-400" style={{ margin: 0 }}>
                                No Actions Available...
                            </p>
                        )}
                    </Form.Item>
                </Form>
            </CustomModal>
        </>
    );
}

export default PermissionForm;