import React, { useEffect, useState } from "react";
import {
  Form,
  Input,
  Select,
  Button,
  Switch,
  Card,
  Divider,
  Steps,
  Row,
  Col,
  Typography,
  Spin,
  message,
} from "antd";
import {
  createOrganization,
  getCompanyTypes,
  getIndustries,
  getSources,
  searchCities,
  searchCountries,
  searchOrganizations,
  searchStates,
  type CityType,
  type CompanyType,
  type CountryType,
  type IndustryType,
  type SourceType,
  type StateType,
} from "../../services/MasterService/organizationService";
import ErrorMessage from "../Misc/ErrorMessage";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import type { OrganizationType } from "../../types/organization.type";

type Organization = {
  id: number;
  name: string;
};

const { Option } = Select;
const { Step } = Steps;
const { Title, Text } = Typography;

const CreateOrganization: React.FC = () => {
  const [form] = Form.useForm();
  const [current, setCurrent] = useState(0);
  const [companyTypes, setCompanyTypes] = useState<CompanyType[]>([]);
  const [industries, setIndustries] = useState<IndustryType[]>([]);
  const [sources, setSources] = useState<SourceType[]>([]);
  const [organizations, setOrganizations] = useState<Organization[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [countries, setCountries] = useState<CountryType[]>([]);
  const [states, setStates] = useState<StateType[]>([]);
  const [cities, setCities] = useState<CityType[]>([]);
  const [selectedCountryId, setSelectedCountryId] = useState<number | null>(
    null
  );
  const [selectedStateId, setSelectedStateId] = useState<number | null>(null);
  const [soleProprietor, setSoleProprietor] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();


  const stepFieldNames: Record<number, string[]> = {
    0: ["name", "description", "companyTypeId", "parentOrganizationId", "industryId", "sourceId", "gstinNumber"],
    1: ["contactPerson"],
    2: ["phoneNumbers", "emailAddresses"],
    3: ["addresses"],
  };

  const handleSearch = async (value: string) => {
    if (!value.trim()) {
      setOrganizations([]);
      return;
    }
    try {
      const result = await searchOrganizations(value);
      if (result.success && result.data) {
        setOrganizations(result.data);
      }
    } catch (error) {
      console.error("Error searching organizations:", error);
      setOrganizations([]);
    }
  };

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

  const debouncedSearchForOrganization = debounce(handleSearch, 300);
  const debouncedSearchForCountry = debounce(handleSearchForCountry, 300);
  const debouncedSearchForState = debounce(handleSearchForState, 300);
  const debouncedSearchForCity = debounce(handleSearchForCity, 300);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [sources, companyTypes, industries] = await Promise.all([
          getSources(),
          getCompanyTypes(),
          getIndustries(),
        ]);

        // Set data if the API call was successful
        if (sources.success) {
          if (sources.data) setSources(sources.data);
        } else {
          setError(sources.message || "Failed to load sources");
          return;
        }

        if (companyTypes.success) {
          if (companyTypes.data) setCompanyTypes(companyTypes.data);
        } else {
          setError(companyTypes.message || "Failed to load company types");
          return;
        }

        if (industries.success) {
          if (industries.data) setIndustries(industries.data);
        } else {
          setError(industries.message || "Failed to load industries");
          return;
        }
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const onFinish = async (values: OrganizationType) => {
    try {
      setIsSubmitting(true);
      const result = await createOrganization(values);
      if (result.success) {
        messageApi.success(result.message);

        form.resetFields();
        setCurrent(0);
        setError(null);
      }else{
        setError(result.message);
      }
    } catch (error: any) {
      setError(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const steps = [
    {
      title: "Basic Information",
      content: (
        <div className="mt-6">
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                name="name"
                label="Organization Name"
                rules={[
                  { required: true, message: "Please enter organization name" },
                ]}
              >
                <Input size="large" placeholder="Enter organization name" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={24}>
            <Col span={24}>
              <Form.Item name="description" label="Description">
                <Input.TextArea
                  rows={4}
                  placeholder="Enter organization description"
                />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={24}>
            <Col span={12}>
              <Form.Item
                name="companyTypeId"
                label="Company Type"
                rules={[
                  { required: true, message: "Please select company type" },
                ]}
              >
                <Select
                  size="large"
                  placeholder="Select company type"
                  showSearch
                  optionFilterProp="children"
                  onChange={(value) => {
                    const selectedType = companyTypes.find(
                      (type) => type.id === value
                    );
                    const isSole =
                      selectedType?.companyType.toLowerCase() ===
                      "sole proprietorship";

                    setSoleProprietor(isSole);

                    if (isSole) {
                      const organizationName = form.getFieldValue("name");
                      if (organizationName) {
                        form.setFieldValue("contactPerson", [
                          {
                            name: organizationName,
                            isPrimary: true,
                          },
                        ]);
                      }
                    }
                  }}
                  filterOption={(input: string, option: any) =>
                    option?.children
                      ?.toLowerCase()
                      .indexOf(input.toLowerCase()) >= 0
                  }
                >
                  {companyTypes.map((type) => (
                    <Option key={type.id} value={type.id}>
                      {type.companyType}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="parentOrganizationId"
                label="Parent Organization"
              >
                <Select
                  size="large"
                  placeholder="Search for parent organization"
                  showSearch
                  allowClear
                  onSearch={debouncedSearchForOrganization}
                  notFoundContent={null}
                  filterOption={false}
                >
                  {organizations.map((org) => (
                    <Option key={org.id} value={org.id}>
                      {org.name}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={24}>
            <Col span={12}>
              <Form.Item
                name="industryId"
                label="Industry"
                rules={[{ required: true, message: "Please select industry" }]}
              >
                <Select
                  size="large"
                  placeholder="Select industry"
                  showSearch
                  optionFilterProp="children"
                  filterOption={(input: string, option: any) =>
                    option?.children
                      ?.toLowerCase()
                      .indexOf(input.toLowerCase()) >= 0
                  }
                >
                  {industries.map((industry) => (
                    <Option
                      key={industry.industryId}
                      value={industry.industryId}
                    >
                      {industry.name}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="sourceId"
                label="Source"
                rules={[{ required: true, message: "Please select source" }]}
              >
                <Select
                  size="large"
                  placeholder="Select source"
                  showSearch
                  optionFilterProp="children"
                  filterOption={(input: string, option: any) =>
                    option?.children
                      ?.toLowerCase()
                      .indexOf(input.toLowerCase()) >= 0
                  }
                >
                  {sources.map((source) => (
                    <Option key={source.sourceId} value={source.sourceId}>
                      {source.name}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={24}>
            <Col span={12}>
              <Form.Item name="gstinNumber" label="GSTIN Number">
                <Input size="large" placeholder="Enter GSTIN number" />
              </Form.Item>
            </Col>
          </Row>
        </div>
      ),
    },
    {
      title: "Contact Persons",
      content: (
        <div className="space-y-6 my-4 mx-2">
          <Form.List name="contactPerson">
            {(fields, { add, remove }) => (
              <div className="space-y-6 mb-8">
                {fields.map(({ key, name, ...restField }) => (
                  <Card
                    key={key}
                    className="shadow-md"
                    style={{ marginBottom: "2rem" }}
                    title={
                      <div className="flex justify-between items-center">
                        <Title level={5}>Contact Person {name + 1}</Title>
                        <Button
                          type="text"
                          danger
                          icon={<MinusCircleOutlined />}
                          onClick={() => remove(name)}
                          disabled={soleProprietor}
                        >
                          Remove
                        </Button>
                      </div>
                    }
                  >
                    <Row gutter={24}>
                      <Col span={16}>
                        <Form.Item
                          {...restField}
                          name={[name, "name"]}
                          label="Name"
                          rules={[
                            { required: true, message: "Please enter name" },
                          ]}
                        >
                          <Input
                            size="large"
                            placeholder="Enter contact person name"
                            disabled={soleProprietor}
                          />
                        </Form.Item>
                      </Col>
                      <Col span={8}>
                        <Form.Item
                          {...restField}
                          name={[name, "isPrimary"]}
                          label="Primary Contact Person"
                          valuePropName="checked"
                        >
                          <Switch disabled={soleProprietor} />
                        </Form.Item>
                      </Col>
                    </Row>

                    <Divider orientation="left" plain>
                      <Text type="secondary">Email Addresses</Text>
                    </Divider>
                    <Form.List name={[name, "emailAddresses"]}>
                      {(
                        emailFields,
                        { add: addEmail, remove: removeEmail }
                      ) => (
                        <div className="space-y-3">
                          {emailFields.map(
                            ({ key, name: emailName, ...rest }) => (
                              <Row key={key} gutter={16} align="middle">
                                <Col span={10}>
                                  <Form.Item
                                    {...rest}
                                    name={[emailName, "email"]}
                                    rules={[
                                      {
                                        required: true,
                                        type: "email",
                                        message: "Please enter valid email",
                                      },
                                    ]}
                                  >
                                    <Input
                                      placeholder="Enter email address"
                                      disabled={soleProprietor}
                                    />
                                  </Form.Item>
                                </Col>
                                <Col span={6}>
                                  <Form.Item
                                    {...rest}
                                    name={[emailName, "emailType"]}
                                    initialValue="Work"
                                  >
                                    <Select
                                      defaultValue={"Work"}
                                      disabled={soleProprietor}
                                      options={[
                                        { value: "Work", label: "Work" },
                                        { value: "Personal", label: "Personal" },
                                        { value: "Other", label: "Other" },
                                      ]}
                                    />
                                  </Form.Item>
                                </Col>
                                <Col span={4}>
                                  <Form.Item
                                    {...rest}
                                    name={[emailName, "isPrimary"]}
                                    valuePropName="checked"
                                    className="mb-0"
                                  >
                                    <Switch
                                      checkedChildren="Primary"
                                      unCheckedChildren="Secondary"
                                      defaultChecked={false}
                                      disabled={soleProprietor}
                                    />
                                  </Form.Item>
                                </Col>
                                <Col
                                  span={4}
                                  className="flex items-center h-full"
                                >
                                  <Button
                                    type="text"
                                    danger
                                    icon={<MinusCircleOutlined />}
                                    onClick={() => removeEmail(emailName)}
                                  />
                                </Col>
                              </Row>
                            )
                          )}
                          <Button
                            type="dashed"
                            onClick={() => addEmail()}
                            icon={<PlusOutlined />}
                            className="w-full"
                            disabled={soleProprietor}
                          >
                            Add Email
                          </Button>
                        </div>
                      )}
                    </Form.List>

                    <Divider orientation="left" plain>
                      <Text type="secondary">Phone Numbers</Text>
                    </Divider>
                    <Form.List name={[name, "phoneNumbers"]}>
                      {(
                        phoneFields,
                        { add: addPhone, remove: removePhone }
                      ) => (
                        <div className="space-y-3">
                          {phoneFields.map(
                            ({ key, name: phoneName, ...rest }) => (
                              <Row key={key} gutter={16} align="middle">
                                <Col span={10}>
                                  <Form.Item
                                    {...rest}
                                    name={[phoneName, "number"]}
                                    rules={[
                                      {
                                        required: true,
                                        message: "Please enter phone number",
                                      },
                                    ]}
                                  >
                                    <Input
                                      disabled={soleProprietor}
                                      placeholder="Enter phone number"
                                    />
                                  </Form.Item>
                                </Col>
                                <Col span={6}>
                                  <Form.Item
                                    {...rest}
                                    name={[phoneName, "phoneType"]}
                                    initialValue="Mobile"
                                  >
                                    <Select
                                      defaultValue={"Mobile"}
                                      disabled={soleProprietor}
                                      options={[
                                        { value: "Mobile", label: "Mobile" },
                                        { value: "Whatsapp", label: "Whatsapp" },
                                        { value: "Other", label: "Other" },
                                      ]}
                                    />
                                  </Form.Item>
                                </Col>
                                <Col span={4}>
                                  <Form.Item
                                    {...rest}
                                    name={[phoneName, "isPrimary"]}
                                    valuePropName="checked"
                                  >
                                    <Switch
                                      checkedChildren="Primary"
                                      unCheckedChildren="Secondary"
                                      defaultChecked={false}
                                      disabled={soleProprietor}
                                    />
                                  </Form.Item>
                                </Col>
                                <Col span={4}>
                                  <Button
                                    type="text"
                                    danger
                                    icon={<MinusCircleOutlined />}
                                    onClick={() => removePhone(phoneName)}
                                  />
                                </Col>
                              </Row>
                            )
                          )}
                          <Button
                            type="dashed"
                            onClick={() => addPhone()}
                            icon={<PlusOutlined />}
                            className="w-full"
                            disabled={soleProprietor}
                          >
                            Add Phone
                          </Button>
                        </div>
                      )}
                    </Form.List>
                  </Card>
                ))}
                <Button
                  type="dashed"
                  onClick={() => add()}
                  icon={<PlusOutlined />}
                  size="large"
                  className="w-full h-12 mt-10"
                  disabled={soleProprietor}
                >
                  Add Contact Person
                </Button>
              </div>
            )}
          </Form.List>
        </div>
      ),
    },
    {
      title: "Organization Contact",
      content: (
        <div className="space-y-8">
          <Card
            title="Phone Numbers"
            className="shadow-md"
            style={{ margin: "20px 0px" }}
          >
            <Form.List name="phoneNumbers">
              {(fields, { add, remove }) => (
                <div className="space-y-4">
                  {fields.map(({ key, name, ...restField }) => (
                    <Row key={key} gutter={16} align="middle">
                      <Col span={10}>
                        <Form.Item
                          {...restField}
                          name={[name, "number"]}
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
                        <Form.Item {...restField} name={[name, "phoneType"]} initialValue="Landline" rules={[
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
                          {...restField}
                          name={[name, "isPrimary"]}
                          valuePropName="checked"
                        >
                          <Switch />
                        </Form.Item>
                      </Col>
                      <Col span={4}>
                        <Button
                          type="text"
                          danger
                          icon={<MinusCircleOutlined />}
                          onClick={() => remove(name)}
                        />
                      </Col>
                    </Row>
                  ))}
                  <Button
                    type="dashed"
                    onClick={() => add()}
                    icon={<PlusOutlined />}
                    className="w-full"
                  >
                    Add Phone Number
                  </Button>
                </div>
              )}
            </Form.List>
          </Card>

          <Card
            title="Email Addresses"
            className="shadow-md"
            style={{ marginBottom: "40px" }}
          >
            <Form.List name="emailAddresses">
              {(fields, { add, remove }) => (
                <div className="space-y-4">
                  {fields.map(({ key, name, ...restField }) => (
                    <Row key={key} gutter={16} align="middle">
                      <Col span={10}>
                        <Form.Item
                          {...restField}
                          name={[name, "email"]}
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
                        <Form.Item {...restField} name={[name, "emailType"]} initialValue="Work" rules={[
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
                          {...restField}
                          name={[name, "isPrimary"]}
                          valuePropName="checked"
                        >
                          <Switch />
                        </Form.Item>
                      </Col>
                      <Col span={4}>
                        <Button
                          type="text"
                          danger
                          icon={<MinusCircleOutlined />}
                          onClick={() => remove(name)}
                        />
                      </Col>
                    </Row>
                  ))}
                  <Button
                    type="dashed"
                    onClick={() => add()}
                    icon={<PlusOutlined />}
                    className="w-full"
                  >
                    Add Email Address
                  </Button>
                </div>
              )}
            </Form.List>
          </Card>
        </div>
      ),
    },
    {
      title: "Addresses",
      content: (
        <div>
          <Form.List name="addresses">
            {(fields, { add, remove }) => (
              <div className="space-y-6">
                {fields.map(({ key, name, ...restField }) => (
                  <Card
                    key={key}
                    style={{ margin: "20px 0px" }}
                    className="shadow-md"
                    title={
                      <div className="flex justify-between items-center">
                        <Title level={5}>Address {name + 1}</Title>
                        <Button
                          type="text"
                          danger
                          icon={<MinusCircleOutlined />}
                          onClick={() => remove(name)}
                        >
                          Remove
                        </Button>
                      </div>
                    }
                  >
                    <Row gutter={24}>
                      <Col span={24}>
                        <Form.Item
                          {...restField}
                          name={[name, "streetAddress"]}
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
                          {...restField}
                          name={[name, "countryId"]}
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
                          {...restField}
                          name={[name, "stateId"]}
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
                          {...restField}
                          name={[name, "cityId"]}
                          label="City"
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
                          {...restField}
                          name={[name, "pincode"]}
                          label="Pincode"
                        >
                          <Input size="large" placeholder="Enter pincode" />
                        </Form.Item>
                      </Col>
                      <Col span={8}>
                        <Form.Item
                          {...restField}
                          name={[name, "addressType"]}
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
                            defaultValue={"Work"}
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

                    <Row gutter={24}>
                      <Col span={12}>
                        <Form.Item
                          {...restField}
                          name={[name, "isPrimary"]}
                          label="Primary Address"
                          valuePropName="checked"
                        >
                          <Switch />
                        </Form.Item>
                      </Col>
                    </Row>
                  </Card>
                ))}
                <Button
                  type="dashed"
                  onClick={() => add()}
                  icon={<PlusOutlined />}
                  size="large"
                  className="w-full h-12"
                  style={{ marginTop: "20px" }}
                >
                  Add Address
                </Button>
              </div>
            )}
          </Form.List>
        </div>
      ),
    },
  ];

  return (
    <div className="">
      {error && (
        <div style={{ marginBottom: 16 }}>
          <ErrorMessage
            message="Error"
            description={error}
            onClose={() => setError(null)}
          />
        </div>
      )}
      {contextHolder}
      <div className="max-w-6xl mx-auto px-4">
        <Spin spinning={loading} tip="Loading..." size="large">
          <Card className="shadow-lg border-0">
            <div style={{ maxWidth: 1000, margin: "0 auto" }}>
              <Title level={2}>Create New Organization</Title>

              <Text type="secondary" className="block">
                Fill in the details to create a new organization
              </Text>
            </div>

            <Divider />

            <Steps current={current}>
              {steps.map((step, index) => (
                <Step key={index} title={step.title} />
              ))}
            </Steps>

            <Form
              form={form}
              layout="vertical"
              onFinish={onFinish}
              initialValues={{
                contactPerson: [{}],
                phoneNumbers: [{}],
                emailAddresses: [{}],
                addresses: [{}],
              }}
              autoComplete="off"
            >
              <div className="min-h-[400px] mb-4">
                {steps.map((step, index) => (
                  <div
                    key={index}
                    style={{ display: index === current ? "block" : "none" }}
                  >
                    {step.content}
                  </div>
                ))}
              </div>

              <div className="flex justify-between pt-6 border-t border-gray-200">
                <div>
                  {current > 0 && (
                    <Button
                      size="large"
                      onClick={() => setCurrent(current - 1)}
                    >
                      Previous
                    </Button>
                  )}
                </div>
                <div>
                  {current < steps.length - 1 && (
                    <Button
                      type="primary"
                      size="large"
                      onClick={async () => {
                        await form.validateFields(stepFieldNames[current]);
                        setCurrent(current + 1);
                      }}
                    >
                      Next
                    </Button>
                  )}
                  {current === steps.length - 1 && (
                    <Button type="primary" size="large" htmlType="submit" loading={isSubmitting}>
                      Create Organization
                    </Button>
                  )}
                </div>
              </div>
            </Form>
          </Card>
        </Spin>
      </div>
    </div>
  );
};

export default CreateOrganization;
