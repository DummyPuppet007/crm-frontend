import { Col, Form, Input, message, Row, Select } from "antd";
import { addAddress, searchCities, searchCountries, searchStates, type CityType, type CountryType, type OrganizationList, type StateType } from "../../services/MasterService/organizationService";
import CustomModal from "../common/Modal";
import { useState } from "react";
import ErrorMessage from "../Misc/ErrorMessage";
import type { Address } from "../../types/organization.type";

interface FormProps {
    open: boolean;
    onClose: () => void;
    org?: OrganizationList;
}

const { Option } = Select;

const AddressForm: React.FC<FormProps> = ({ open, onClose, org }) => {
    const [form] = Form.useForm();
    const [countries, setCountries] = useState<CountryType[]>([]);
    const [states, setStates] = useState<StateType[]>([]);
    const [cities, setCities] = useState<CityType[]>([]);
    const [selectedCountryId, setSelectedCountryId] = useState<number | null>(
        null
    );
    const [selectedStateId, setSelectedStateId] = useState<number | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [messageApi, contextHolder] = message.useMessage();


    const handleSearchForCountry = async (value: string) => {
        if (!value.trim()) {
            setCountries([]);
            setStates([]);
            setCities([]);
            setSelectedCountryId(null);
            setSelectedStateId(null);
            return;
        }
        try {
            const result = await searchCountries(value);
            if (result.success && result.data) {
                setCountries(result.data);
            }
        } catch (error) {
            console.error("Error searching countries:", error);
            setCountries([]);
        }
    };

    const handleCountryChange = (value: number) => {
        setSelectedCountryId(value);
        setStates([]);
        setCities([]);
        setSelectedStateId(null);
    };

    const handleStateChange = (value: number) => {
        setSelectedStateId(value);
        setCities([]);
    };

    const handleSearchForState = async (value: string) => {
        if (!selectedCountryId) {
            setStates([]);
            return;
        }
        if (!value.trim()) {
            setStates([]);
            return;
        }
        try {
            const result = await searchStates(selectedCountryId, value);
            if (result.success && result.data) {
                setStates(result.data);
            }
        } catch (error) {
            console.error("Error searching states:", error);
            setStates([]);
        }
    };

    const handleSearchForCity = async (value: string) => {
        if (!selectedStateId) {
            setCities([]);
            return;
        }
        if (!value.trim()) {
            setCities([]);
            return;
        }
        try {
            const result = await searchCities(selectedStateId, value);
            if (result.success && result.data) {
                setCities(result.data);
            }
        } catch (error) {
            console.error("Error searching cities:", error);
            setCities([]);
        }
    };

    const debounce = (func: Function, delay: number) => {
        let timeoutId: ReturnType<typeof setTimeout>;
        return function (...args: any[]) {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => {
                func.apply(null, args);
            }, delay);
        };
    };

    const debouncedSearchForCountry = debounce(handleSearchForCountry, 300);
    const debouncedSearchForState = debounce(handleSearchForState, 300);
    const debouncedSearchForCity = debounce(handleSearchForCity, 300);

    const onFinish = async (values: Address) => {
            try {
                const formData = {
                    ...values,
                    isPrimary: false,
                    organizationId: org?.organizationId
                }
                console.log(formData);
                const response = await addAddress(formData);
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
        <>
            <CustomModal
                open={open}
                title={`Add Organization Address ${org?.name ? `for ${org.name}` : ''}`}
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
                <Form
                    form={form}
                    layout="vertical"
                    autoComplete="off"
                    onFinish={onFinish}
                >
                    <Row gutter={24}>
                        <Col span={24}>
                            <Form.Item
                                name={"streetAddress"}
                                label="Street Address"
                                rules={[
                                    {
                                        required: true,
                                        message: "Please enter street address",
                                    },
                                ]}
                            >
                                <Input.TextArea
                                    rows={3}
                                    placeholder="Enter complete street address"
                                />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row gutter={24}>
                        <Col span={12}>
                            <Form.Item
                                name={"countryId"}
                                label="Country"
                                rules={[
                                    {
                                        required: true,
                                        message: "Please select country",
                                    },
                                ]}
                            >
                                <Select
                                    size="large"
                                    placeholder="Select country"
                                    showSearch
                                    optionFilterProp="children"
                                    onSearch={debouncedSearchForCountry}
                                    onChange={handleCountryChange}
                                    notFoundContent={null}
                                    filterOption={false}
                                    allowClear
                                    defaultActiveFirstOption={false}
                                >
                                    {countries.map((country) => (
                                        <Option key={country.id} value={country.id}>
                                            {country.flag} {country.name}
                                        </Option>
                                    ))}
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item

                                name={"stateId"}
                                label="State"
                                rules={[
                                    { required: true, message: "Please select state" },
                                ]}
                            >
                                <Select
                                    size="large"
                                    placeholder="Select state"
                                    showSearch
                                    optionFilterProp="children"
                                    onSearch={debouncedSearchForState}
                                    onChange={handleStateChange}
                                    notFoundContent={null}
                                    filterOption={false}
                                    allowClear
                                    defaultActiveFirstOption={false}
                                >
                                    {states.map((state) => (
                                        <Option key={state.id} value={state.id}>
                                            {state.name}
                                        </Option>
                                    ))}
                                </Select>
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row gutter={24}>
                        <Col span={8}>
                            <Form.Item

                                name={"cityId"}
                                label="City"
                                rules={[
                                    { required: true, message: "Please select city" },
                                ]}
                            >
                                <Select
                                    size="large"
                                    placeholder="Select city"
                                    showSearch
                                    optionFilterProp="children"
                                    onSearch={debouncedSearchForCity}
                                    notFoundContent={null}
                                    filterOption={false}
                                    allowClear
                                    defaultActiveFirstOption={false}
                                >
                                    {cities.map((city) => (
                                        <Option key={city.id} value={city.id}>
                                            {city.name}
                                        </Option>
                                    ))}
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item

                                name={"pincode"}
                                label="Pincode"
                                rules={[
                                    { required: true, message: "Please enter pincode" },
                                ]}
                            >
                                <Input size="large" placeholder="Enter pincode" />
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item

                                name={"addressType"}
                                label="Address Type"
                                initialValue="Work"
                                rules={[
                                    {
                                        required: true,
                                        message: "Please select address type",
                                    },
                                ]}
                            >
                                <Select
                                    size="large"
                                    options={[
                                        { value: "Work", label: "Work" },
                                        { value: "HeadOffice", label: "Head Office" },
                                        { value: "Branch", label: "Branch" },
                                        { value: "Factory", label: "Factory" },
                                        { value: "Other", label: "Other" },
                                    ]}
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>

            </CustomModal>
        </>
    );
}

export default AddressForm;
