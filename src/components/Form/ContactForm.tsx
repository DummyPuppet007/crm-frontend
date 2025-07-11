import { Button, Col, Form, Input, Row, Select, Switch } from "antd";
import type { OrganizationList } from "../../services/MasterService/organizationService";
import CustomModal from "../common/Modal";
import { MinusCircleOutlined } from "@ant-design/icons";

interface FormProps {
    open: boolean;
    onClose: () => void;
    org?: OrganizationList;
}

const ContactForm: React.FC<FormProps> = ({ open, onClose, org }) => {
    const [form] = Form.useForm();

    return(
        <>
            <CustomModal
                open={open}
                title={`Add Email & Phone ${org?.name ? `for ${org.name}` : ''}`}
                okText="Add"
                cancelText="Cancel"
                onOk={form.submit}
                onCancel={onClose}
                width={window.innerWidth < 768 ? window.innerWidth - 32 : 700}
            >
                <Form
                    form={form}
                    layout="vertical"
                    autoComplete="off"
                    //onFinish={onFinish}
                >
                     <Row gutter={16} align="middle">
                                          <Col span={10}>
                                            <Form.Item
                                            
                                              name={"email"}
                                              rules={[
                                                {
                                                  required: true,
                                                  type: "email",
                                                  message: "Please enter valid email",
                                                },
                                              ]}
                                            >
                                              <Input
                                                size="large"
                                                placeholder="Enter email address"
                                              />
                                            </Form.Item>
                                          </Col>
                                          <Col span={6}>
                                            <Form.Item  name={"emailType"} initialValue="Work" rules={[
                                              {required: true, message: "Please Select email type"}
                                            ]}>
                                              <Select
                                                size="large"
                                                defaultValue={"Work"}
                                                options={[
                                                  { value: "Work", label: "Work" },
                                                  { value: "Other", label: "Other" },
                                                ]}
                                              />
                                            </Form.Item>
                                          </Col>
                                          <Col span={4}>
                                            <Form.Item
                                              name={"isPrimary"}
                                              valuePropName="checked"
                                            >
                                              <Switch />
                                            </Form.Item>
                                          </Col>
                                          
                                        </Row>

                    <Row gutter={16} align="middle">
                      <Col span={10}>
                        <Form.Item
                          name={"number"}
                          rules={[
                            {
                              required: true,
                              message: "Please enter phone number",
                            },
                          ]}
                        >
                          <Input
                            size="large"
                            placeholder="Enter phone number"
                          />
                        </Form.Item>
                      </Col>
                      <Col span={6}>
                        <Form.Item name={"phoneType"} initialValue="Landline" rules={[
                          { required: true, message: "Please select phone type" },
                        ]}>
                          <Select
                            size="large"
                            defaultValue={"Landline"}
                            options={[
                              { value: "Landline", label: "Landline" },
                              { value: "Fax", label: "Fax" },
                              { value: "Other", label: "Other" },
                            ]}
                          />
                        </Form.Item>
                      </Col>
                      <Col span={4}>
                        <Form.Item
                      
                          name={"isPrimary"}
                          valuePropName="checked"
                        >
                          <Switch />
                        </Form.Item>
                      </Col>
                    </Row>
                </Form>
            </CustomModal>
        </>
    );
}

export default ContactForm;