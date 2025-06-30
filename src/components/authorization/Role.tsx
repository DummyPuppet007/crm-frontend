import {  Button } from 'antd';
import RoleForm from '../Form/RoleForm';
import { useEffect, useState } from 'react';
import { FetchData } from '../../services/FetchData';
import { roleColumns } from '../DataTable/columns/role-columns';
import { AdvancedDataTable } from '../DataTable/AdvanceDataTable';
import type { RoleList } from '../../types/auth.types';

const Role: React.FC = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [roles, setRoles] = useState<RoleList[]>([]);
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchRoles(); 
  }, []);

  const fetchRoles = async () => {
    try {
      setLoading(true);
      const response = await FetchData<any>({
        url: "access/roles",
        method: "GET",
      });
    
      if (!response || response.statusCode !== 200) {
        setError("Error : Failed to fetch Roles." + response.message);
      }

      setRoles(response.data || []);
    }catch (error : any) {
      setError("Error : " + error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col m-6">
      <div className="flex flex-col items-end mb-4">
                <Button
          color='default' variant='solid'
          style={{ fontSize: '1rem', padding: '0.5rem 1rem' }}
          onClick={() => setModalOpen(true)}
        >Create Role</Button>
        <RoleForm open={modalOpen} onClose={() => setModalOpen(false)} refreshData={fetchRoles}/>
      </div>

      {/* <DataTable
        columns={roleColumns}
        data={roles}
        // loading={loading}
        title="Roles"
        searchKey="roleName"
        searchPlaceholder="Search by role name..."
        showSearch={true}
        showRefresh={true}
        onRefresh={fetchRoles}
        rowKey="id"
        style={{ marginBottom: '32px' }}
      /> */}

      <AdvancedDataTable
        columns={roleColumns}
        data={roles}
        loading={loading}
        title="Role List"
        searchableColumns={['roleName', 'description']}
        showRefresh={true}
        onRefresh={fetchRoles}
        rowKey="id"
      />
    </div>
  );
}

export default Role;