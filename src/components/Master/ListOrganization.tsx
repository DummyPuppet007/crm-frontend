import { useEffect, useState } from "react";
import { FetchData } from "../../services/FetchData";
import { AdvancedDataTable } from "../DataTable/AdvanceDataTable";
import { getOrganizationColumns } from "../DataTable/columns/organization-columns";
import type { OrganizationList } from "../../services/MasterService/organizationService";
import ContactPersonForm from "../Form/ContactPersonForm";
import AddressForm from "../Form/AddressForm";
import ContactForm from "../Form/ContactForm";

const ListOrganization: React.FC = () => {
  const [modalType, setModalType] = useState<null | 'detail' | 'address' | 'contact' | 'person'>(null);
  const [organizations, setOrganizations] = useState<any>([]);
  const [selectedOrg, setSelectedOrg] = useState<OrganizationList | undefined>();
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchOrganizations();
  }, []);

  const fetchOrganizations = async () => {
    try {
      setLoading(true);
      const response = await FetchData<any>({
        url: "master/organizations",
        method: "GET",
      });

      if (!response || response.statusCode !== 200) {
        setError("Error: Failed to fetch organizations. " + response.message);
        return;
      }

      const formattedData = response.data.map((organization: any) => {
        const address = organization.addresses[0];
        const city = address?.city;
        const state = city?.state;
        const country = state?.country;

        return {
          organizationId: organization.organizationId || '',
          name: organization.name || '',
          industry: organization.industry?.name || '',
          companyType: organization.companyType?.companyType || '',
          source: organization.source?.name || '',
          phone: organization.phoneNumbers[0]?.number || '',
          email: organization.emailAddresses[0]?.email || '',
          address: `${address?.streetAddress}, ${city?.name}, ${state?.name} - ${address?.pincode}` || '',
          country: country?.name || '',
        };
      });

      setOrganizations(formattedData);
    } catch (error: any) {
      setError("Error : " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleAction = (org: OrganizationList, type: 'detail' | 'address' | 'contact' | 'person') => {
    setSelectedOrg(org);
    setModalType(type);
  };

  const closeModal = () => {
    setModalType(null);
    //setSelectedOrg(null);
  };

  const columns = getOrganizationColumns(handleAction);

  return (
    <>
      <div className="m-6">
        <AdvancedDataTable
          columns={columns}
          data={organizations}
          loading={loading}
          title="Organization List"
          searchableColumns={["name", "phone", "email"]}
          showRefresh={true}
          className="shadow-md"
          rowKey="organizationId"
          enableScroll={true}
          scrollXWidth="max-content"
          defaultVisibleColumns={["srno", "name", "phone", "email", "companyType","address","actions"]}
        />
      </div>
      <ContactPersonForm open={modalType === 'person'} onClose={closeModal} org={selectedOrg} />
      <AddressForm open={modalType === 'address'} onClose={closeModal} org={selectedOrg} />
      <ContactForm open={modalType === 'contact'} onClose={closeModal} org={selectedOrg} />
    </>
  )
}
export default ListOrganization;