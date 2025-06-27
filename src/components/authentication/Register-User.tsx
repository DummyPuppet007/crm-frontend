import { Button, Form, Input, Select } from "antd";
import type { FormProps } from "antd";
import { useEffect, useState } from "react";
import type { RoleList } from "../../types/auth.types";
import { FetchData } from "../../services/FetchData";
import UserForm from "../Form/UserForm";
import { AdvancedDataTable } from "../DataTable/AdvanceDataTable";
import { userColumns } from "../DataTable/columns/user-columns";



const Register: React.FC = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [users, setUsers] = useState<any>([]);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    fetchUsers();
  }, [])

  const fetchUsers = async () => {
      try {
        const response = await FetchData<any>({
          url: "auth/users",
          method: "GET",
        });
        console.log(response);
        if (!response || response.statusCode !== 200) {
          setError("Error: Failed to fetch roles. " + response.message);
          return;
        }
        setUsers(response.data);
      }
      catch (error: any) {
        setError("Error : " + error.message);
      }
    }

  return (
    <>
      <div className="flex flex-col m-6">
        <div className="flex flex-col items-end mb-4">
                <Button
          color='default' variant='solid'
          style={{ fontSize: '1rem', padding: '0.5rem 1rem' }}
          onClick={() => setModalOpen(true)}
        >Create User</Button>
        <UserForm open={modalOpen} onClose={() => setModalOpen(false)}/>
      </div>
        <AdvancedDataTable
                columns={userColumns}
                data={users}
                // loading={loading}
                title="User List"
                searchableColumns={['firstName', 'username']}
                showRefresh={true}
                onRefresh={fetchUsers}
                rowKey="id"
              />
      </div>
    </>
  );
}

export default Register;