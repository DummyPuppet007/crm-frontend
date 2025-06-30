import { Button } from "antd";
import { useEffect, useState } from "react";
import UserPermissionForm from "../Form/UserPermissionForm";
import type { UserPermissionList } from "../../types/auth.types";
import { FetchData } from "../../services/FetchData";
import { AdvancedDataTable } from "../DataTable/AdvanceDataTable";
import { userpermissionColumns } from "../DataTable/columns/userpermission-columns";

const UserPermission: React.FC = () => {
    const [modalOpen, setModalOpen] = useState(false);
    const [userPermissions, setUserPermissions] = useState<UserPermissionList[]>([]);
    const [error, setError] = useState<string>("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchUserPermissions();
    }, []);

    const fetchUserPermissions = async () => {
        try {
            setLoading(true);
            const response = await FetchData<any>({
                url: "access/user-permissions",
                method: "GET",
            });

            if (!response || response.statusCode !== 200) {
                setError("Error : Failed To Fetch User Permissions." + response.message);
            }

            const formattedData = response.data.map((userPermission: any) => ({
                userPermissionId: userPermission.id,
                userId: userPermission.user?.userId || 0,
                username: userPermission.user?.username || '',
                permissionId: userPermission.permission?.permissionId || 0,
                permissionName: `${userPermission.permission?.module?.moduleName}-${userPermission.permission?.action?.actionName}` || '',
                createdAt: userPermission.createdAt,
            }));

            setUserPermissions(formattedData || []);
        } catch (error: any) {
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
                >Create User Permission</Button>
                <UserPermissionForm open={modalOpen} onClose={() => setModalOpen(false)} refreshData={fetchUserPermissions} />
            </div>
            <AdvancedDataTable
                columns={userpermissionColumns}
                data={userPermissions}
                loading={loading}
                title="User Permission List"
                searchableColumns={['permissionName', 'username',]}
                showRefresh={true}
                onRefresh={fetchUserPermissions}
                rowKey="id"
            />
        </div>
    );
}

export default UserPermission;