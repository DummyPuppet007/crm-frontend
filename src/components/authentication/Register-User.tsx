import { Button, Form, Input, Select } from "antd";
import type { FormProps } from "antd";
import { useEffect, useState } from "react";
import type { RoleList } from "../../types/auth.types";
import { FetchData } from "../../services/FetchData";
import UserForm from "../Form/UserForm";
import { AdvancedDataTable } from "../DataTable/AdvanceDataTable";
import { userColumns } from "../DataTable/columns/user-columns";
import CreateButton from "../common/CreateButton";

const Register: React.FC = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [users, setUsers] = useState<any>([]);
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await FetchData<any>({
        url: "auth/users",
        method: "GET",
      });
   
      if (!response || response.statusCode !== 200) {
        setError("Error: Failed to fetch roles. " + response.message);
        return;
      }
      setUsers(response.data);
    } catch (error: any) {
      setError("Error : " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="flex flex-col m-6">
        <div className="flex flex-col items-end mb-4">
          <CreateButton label="User" onClick={() => setModalOpen(true)} />
          <UserForm
            open={modalOpen}
            onClose={() => setModalOpen(false)}
            refreshData={fetchUsers}
          />
        </div>
        <AdvancedDataTable
          columns={userColumns}
          data={users}
          loading={loading}
          title="User List"
          searchableColumns={["username", "firstName", "lastName"]}
          showRefresh={true}
          className="shadow-md"
          onRefresh={fetchUsers}
          rowKey="id"
        />
      </div>
    </>
  );
};

export default Register;
