import CreateButton from "../common/CreateButton";
import { useEffect, useState } from "react";
import RolePermissionForm from "../Form/RolePermissionForm";
import { FetchData } from "../../services/FetchData";
import type { RolePermissionList } from "../../types/auth.types";
import { AdvancedDataTable } from "../DataTable/AdvanceDataTable";
import { rolepermissionColumns } from "../DataTable/columns/rolepermission-columns";

const RolePermission: React.FC = () => {
    const [modalOpen, setModalOpen] = useState(false);
    const [rolepermissions, setRolePermissions] = useState<RolePermissionList[]>([]);
    const [error, setError] = useState<string>("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchRolePermissions();
    }, []);

    const fetchRolePermissions = async () => {
        try {
            setLoading(true);
            const response = await FetchData<any>({
                url: "access/role-permissions",
                method: "GET",
            });

            if (!response || response.statusCode !== 200) {
                setError("Error : Failed To Fetch Role Permissions." + response.message);
            }

            const formattedData = response.data.map((rolePermission: any) => ({
                rolePermissionId: rolePermission.rolePermissionId,
                roleId: rolePermission.role?.roleId || 0,
                roleName: rolePermission.role?.roleName || '',
                permissionId: rolePermission.permission?.permissionId || 0,
                permissionName: `${rolePermission.permission?.module?.moduleName} - ${rolePermission.permission?.action?.actionName}` || '',
                createdAt: rolePermission.createdAt,
            }));

            setRolePermissions(formattedData || []);
        } catch (error: any) {
            setError("Error : " + error.message);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="flex flex-col m-6">
            <div className="flex flex-col items-end mb-4">
                <CreateButton label="Role Permission" onClick={() => setModalOpen(true)} />
                <RolePermissionForm open={modalOpen} onClose={() => setModalOpen(false)} refreshData={fetchRolePermissions} />
            </div>
            <AdvancedDataTable
                columns={rolepermissionColumns}
                data={rolepermissions}
                loading={loading}
                title="Role Permission List"
                searchableColumns={['permissionName', 'roleName',]}
                showRefresh={true}
                className="shadow-md"
                onRefresh={fetchRolePermissions}
                rowKey="id"
            />
        </div>
    );
}

export default RolePermission;