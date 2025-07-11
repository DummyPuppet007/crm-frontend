import { Dropdown, Tag, Tooltip, type MenuProps } from 'antd';
import { ContactsOutlined, EyeOutlined, HomeOutlined, SmallDashOutlined, UserAddOutlined } from '@ant-design/icons';
import type { OrganizationList } from '../../../services/MasterService/organizationService';

export const getOrganizationColumns = (onAction: (org: OrganizationList, type: 'detail' | 'address' | 'contact' | 'person') => void) => {
    return [
        {
            title: 'Sr.No',
            key: 'srno',
            width: 60,
            render: (_: any, __: any, index: number) => (
                <Tag color="blue">{index + 1}</Tag>
            ),
            sorter: false,
        },
        {
            title: 'Organization Name',
            dataIndex: 'name',
            key: 'name',
            width: 200,
            sorter: (a: OrganizationList, b: OrganizationList) => a.name.localeCompare(b.name),
            sortDirections: ['ascend', 'descend'],
            ellipsis: {
                showTitle: false,
            },
            render: (name: string) => (
                <Tooltip placement="topLeft" title={name}>
                    <strong>{name}</strong>
                </Tooltip>
            ),
        },
        {
            title: 'Phone',
            dataIndex: 'phone',
            key: 'phone',
            width: 130,
            sorter: (a: OrganizationList, b: OrganizationList) => a.phone.localeCompare(b.phone),
            sortDirections: ['ascend', 'descend'],
            ellipsis: {
                showTitle: false,
            },
            render: (phone: string) => (
                <Tooltip placement="topLeft" title={phone}>
                    <strong>{phone}</strong>
                </Tooltip>
            ),
        },
        {
            title: 'Email Address',
            dataIndex: 'email',
            key: 'email',
            width: 220,
            sorter: (a: OrganizationList, b: OrganizationList) => a.email.localeCompare(b.email),
            sortDirections: ['ascend', 'descend'],
            ellipsis: {
                showTitle: false,
            },
            render: (email: string) => (
                <Tooltip placement="topLeft" title={email}>
                    <strong>{email}</strong>
                </Tooltip>
            ),
        },
        {
            title: 'Type',
            dataIndex: 'companyType',
            key: 'companyType',
            sorter: (a: OrganizationList, b: OrganizationList) => a.companyType.localeCompare(b.companyType),
            sortDirections: ['ascend', 'descend'],
            ellipsis: {
                showTitle: false,
            },
            render: (companyType: string) => (
                <Tooltip placement="topLeft" title={companyType}>
                    <strong>{companyType}</strong>
                </Tooltip>
            ),
        },
        {
            title: 'Industry',
            dataIndex: 'industry',
            key: 'industry',
            width: 120,
            sorter: (a: OrganizationList, b: OrganizationList) => a.industry.localeCompare(b.industry),
            sortDirections: ['ascend', 'descend'],
            ellipsis: {
                showTitle: false,
            },
            render: (industry: string) => (
                <Tooltip placement="topLeft" title={industry}>
                    <strong>{industry}</strong>
                </Tooltip>
            ),
        },
        {
            title: 'Source',
            dataIndex: 'source',
            key: 'source',
            width: 120,
            sorter: (a: OrganizationList, b: OrganizationList) => a.source.localeCompare(b.source),
            sortDirections: ['ascend', 'descend'],
            ellipsis: {
                showTitle: false,
            },
            render: (source: string) => (
                <Tooltip placement="topLeft" title={source}>
                    <strong>{source}</strong>
                </Tooltip>
            ),
        },
        {
            title: 'Address',
            dataIndex: 'address',
            key: 'address',
            render: (address: string) => (
                <Tooltip placement="topLeft" title={address}>
                    <strong>{address}</strong>
                </Tooltip>
            ),
        },
        {
            title: 'Country',
            dataIndex: 'country',
            key: 'country',
            width: 120,
            sorter: (a: OrganizationList, b: OrganizationList) => a.country.localeCompare(b.country),
            sortDirections: ['ascend', 'descend'],
            ellipsis: {
                showTitle: false,
            },
            render: (country: string) => (
                <Tooltip placement="topLeft" title={country}>
                    <strong>{country}</strong>
                </Tooltip>
            ),
        },
        {
            title: 'Actions',
            key: 'actions',
            width: 30,
            fixed: 'right',
            render: (_: any, record: OrganizationList) => {
                const handleMenuClick: MenuProps['onClick'] = (e) => {
                    const { key } = e;
                    switch (key) {
                        case 'detail':
                            // Handle detail view action
                            console.log('Detail view for:', record.organizationId);
                            // Add your detail view logic here
                            break;
                        case 'address':
                            onAction(record, 'address');
                            break;
                        case 'contact':
                            // Handle add contact person action
                            console.log('Add contact person for:', record.name);
                            // Add your add contact person logic here
                            break;
                        case 'person':
                            onAction(record, 'person');
                            break;
                        default:
                            break;
                    }
                };

                const menuItemsStyle = {
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px'
                }

                const items: MenuProps['items'] = [
                    {
                        key: 'detail',
                        label: (
                            <div style={menuItemsStyle}>
                                <EyeOutlined />
                                Detail View
                            </div>
                        ),
                    },
                    {
                        key: 'address',
                        label: (
                            <div style={menuItemsStyle}>
                                <HomeOutlined />
                                Add Address
                            </div>
                        ),
                    },
                    {
                        key: 'contact',
                        label: (
                            <div style={menuItemsStyle}>
                                <ContactsOutlined />
                                Add Email & Phone
                            </div>
                        ),
                    },
                    {
                        key: 'person',
                        label: (
                            <div style={menuItemsStyle}>
                                <UserAddOutlined />
                                Add Contact Person
                            </div>
                        ),
                    },
                ];

                return (
                    <Dropdown
                        menu={{ items, onClick: handleMenuClick }}
                        placement="bottom"
                        arrow={{ pointAtCenter: true }}
                        trigger={['hover']}
                    >
                        <SmallDashOutlined
                            style={{
                                fontSize: 20,
                                cursor: 'pointer',
                                padding: 4,
                                borderRadius: 4,
                            }}
                        />
                    </Dropdown>
                );
            },
        },
    ];
};
