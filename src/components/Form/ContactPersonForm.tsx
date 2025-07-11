import {
    Button,
    Col,
    Form,
    Input,
    message,
    Row,
    Select,
    Switch,
} from "antd";
import CustomModal from "../common/Modal";
import { addContactPerson, type OrganizationList } from "../../services/MasterService/organizationService";
import { DeleteOutlined } from "@ant-design/icons";
import type { ContactPerson } from "../../types/organization.type";
import { useState } from "react";
import ErrorMessage from "../Misc/ErrorMessage";

interface FormProps {
    open: boolean;
    onClose: () => void;
    org?: OrganizationList;
}

const ContactPersonForm: React.FC<FormProps> = ({ open, onClose, org }) => {
    const [form] = Form.useForm();
    const [error, setError] = useState<string | null>(null);
    const [messageApi, contextHolder] = message.useMessage();

    const onFinish = async (values: ContactPerson) => {
        try {
            const formData = {
                ...values,
                organizationId: org?.organizationId
            }
            const response = await addContactPerson(formData);
            if (response.success) {
                messageApi.success(response.message);
                form.resetFields();
                onClose();
            } else {
                setError(response.message);
            }
            
        } catch (error: any) {
            setError(error.message);
        }
    };

    return (
        <CustomModal
            open={open}
            title={`Add Contact Person ${org?.name ? `for ${org.name}` : ''}`}
            okText="Add"
            cancelText="Cancel"
            onOk={form.submit}
            onCancel={onClose}
            width={window.innerWidth < 768 ? window.innerWidth - 32 : 800}
        >
            {contextHolder}
            {error && (
                <div style={{ marginBottom: 16 }}>
                    <ErrorMessage
                        message="Error"
                        description={error}
                        onClose={() => setError(null)}
                    />
                </div>
            )}
            <div className="my-4 px-2">
                <Form
                    form={form}
                    layout="vertical"
                    autoComplete="off"
                    onFinish={onFinish}
                >
                    <Row gutter={[16, 16]}>
                        <Col xs={24} sm={12}>
                            <Form.Item
                                name="name"
                                label="Name"
                                rules={[{ required: true, message: "Please enter name" }]}
                            >
                                <Input size="large" placeholder="Enter contact person name" />
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={12}>
                            <Form.Item
                                name="isPrimary"
                                label="Primary Contact Person"
                                valuePropName="checked"
                            >
                                <Switch />
                            </Form.Item>
                        </Col>
                    </Row>

                    {/* --------- EMAIL SECTION --------- */}
                    <Form.List name="emailAddresses" initialValue={[{ isPrimary: true }]}>
                        {(fields, { add, remove }) => (
                            <>
                                {fields.map(({ key, name, ...restField }, index) => (
                                    <Row gutter={[16, 16]} key={key} align="middle">
                                        <Col xs={24} sm={12}>
                                            <Form.Item
                                                {...restField}
                                                name={[name, "email"]}
                                                label={index === 0 ? "Email" : ""}
                                                rules={[
                                                    { required: true, type: "email", message: "Enter valid email" },
                                                ]}
                                            >
                                                <Input size="large" placeholder="Enter email address" />
                                            </Form.Item>
                                        </Col>

                                        <Col xs={12} sm={6}>
                                            <Form.Item
                                                {...restField}
                                                name={[name, "emailType"]}
                                                label={index === 0 ? "Email Type" : ""}
                                                initialValue="Work"
                                            >
                                                <Select
                                                    size="large"
                                                    options={[
                                                        { value: "Work", label: "Work" },
                                                        { value: "Personal", label: "Personal" },
                                                        { value: "Other", label: "Other" },
                                                    ]}
                                                />
                                            </Form.Item>
                                        </Col>

                                        <Col xs={12} sm={6} style={{ display: 'flex', alignItems: 'center' }}>
                                            {index === 0 ? (
                                                <Form.Item
                                                    {...restField}
                                                    name={[name, "isPrimary"]}
                                                    valuePropName="checked"
                                                    style={{ marginBottom: 0 }}
                                                >
                                                    <Switch
                                                        checkedChildren="Primary"
                                                        unCheckedChildren="Secondary"
                                                        defaultChecked
                                                        disabled
                                                    />

                                                </Form.Item>
                                            ) : (
                                                <DeleteOutlined
                                                    onClick={() => remove(name)}
                                                    style={{
                                                        fontSize: 25,
                                                        color: "#ff4d4f",
                                                        cursor: "pointer",
                                                        margin: '0 0 20px 8px'
                                                    }}
                                                />
                                            )}
                                        </Col>
                                    </Row>
                                ))}

                                <Form.Item>
                                    <Button
                                        type="dashed"
                                        onClick={() => add()}
                                        block
                                        icon="+"
                                    >
                                        Add Email
                                    </Button>
                                </Form.Item>
                            </>
                        )}
                    </Form.List>

                    {/* --------- PHONE SECTION --------- */}
                    <Form.List name="phoneNumbers" initialValue={[{ isPrimary: true }]}>
                        {(fields, { add, remove }) => (
                            <>
                                {fields.map(({ key, name, ...restField }, index) => (
                                    <Row gutter={[16, 16]} key={key} align="middle">
                                        <Col xs={24} sm={12}>
                                            <Form.Item
                                                {...restField}
                                                name={[name, "number"]}
                                                label={index === 0 ? "Phone Number" : ""}
                                                rules={[{ required: true, message: "Enter phone number" },
                                                    /*{ pattern: /^\d{10}$/, message: "Phone number must be 10 digits" },*/
                                                ]}
                                            >
                                                <Input size="large" placeholder="Enter phone number" />
                                            </Form.Item>
                                        </Col>

                                        <Col xs={12} sm={6}>
                                            <Form.Item
                                                {...restField}
                                                name={[name, "phoneType"]}
                                                label={index === 0 ? "Phone Type" : ""}
                                                initialValue="Mobile"
                                            >
                                                <Select
                                                    size="large"
                                                    options={[
                                                        { value: "Mobile", label: "Mobile" },
                                                        { value: "Whatsapp", label: "Whatsapp" },
                                                        { value: "Other", label: "Other" },
                                                    ]}
                                                />
                                            </Form.Item>
                                        </Col>

                                        <Col xs={12} sm={6} style={{ display: 'flex', alignItems: 'center' }}>
                                            {index === 0 ? (
                                                <Form.Item
                                                    {...restField}
                                                    name={[name, "isPrimary"]}
                                                    valuePropName="checked"
                                                    style={{ marginBottom: 0 }}
                                                >
                                                    <Switch
                                                        checkedChildren="Primary"
                                                        unCheckedChildren="Secondary"
                                                        defaultChecked
                                                        disabled
                                                    />
                                                </Form.Item>
                                            ) : (
                                                <DeleteOutlined
                                                    onClick={() => remove(name)}
                                                    style={{
                                                        fontSize: 25,
                                                        color: "#ff4d4f",
                                                        cursor: "pointer",
                                                        margin: '0 0 20px 8px'
                                                    }}
                                                />
                                            )}
                                        </Col>
                                    </Row>
                                ))}

                                <Form.Item>
                                    <Button type="dashed" onClick={() => add()} block icon="+">
                                        Add Phone
                                    </Button>
                                </Form.Item>
                            </>
                        )}
                    </Form.List>

                </Form>
            </div>
        </CustomModal>
    );
};

export default ContactPersonForm;
