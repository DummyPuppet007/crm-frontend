import CreateButton from "../common/CreateButton";
import { useEffect, useState } from "react";
import type { PermissionList } from "../../types/auth.types";
import { FetchData } from "../../services/FetchData";
import PermissionForm from "../Form/PermissionForm";
import { AdvancedDataTable } from "../DataTable/AdvanceDataTable";
import { permissionColumns } from "../DataTable/columns/permission-column";

const Permission: React.FC = () => {
    const [modalOpen, setModalOpen] = useState(false);
    const [permissions, setPermissions] = useState<PermissionList[]>([]);
    const [error, setError] = useState<string>("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchPermissions();
    }, []);

    const fetchPermissions = async () => {
        try {
            setLoading(true);
            const response = await FetchData<any>({
                url: "access/permissions",
                method: "GET",
            });

            if (!response || response.statusCode !== 200) {
                setError("Error : Failed To Fetch Permissions." + response.message);
            }

            const formattedData = response.data.map((permission: any) => ({
                permissionId: permission.permissionId,
                permissionName: `${permission.module?.moduleName} - ${permission.action?.actionName}`,
                moduleId: permission.module?.moduleId || 0,
                actionId: permission.action?.actionId || 0,
                moduleName: permission.module?.moduleName || '',
                actionName: permission.action?.actionName || '',
                createdAt: permission.createdAt,
            }));

            setPermissions(formattedData || []);

        } catch (error: any) {
            setError("Error : " + error.message);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="flex flex-col m-6">
            <div className="flex flex-col items-end mb-4">
                <CreateButton label="Permission" onClick={() => setModalOpen(true)} />
                <PermissionForm open={modalOpen} onClose={() => setModalOpen(false)} refreshData={fetchPermissions} />
            </div>
            <AdvancedDataTable
                columns={permissionColumns}
                data={permissions}
                loading={loading}
                title="Permission List"
                searchableColumns={['permissionName', 'moduleName', 'actionName']}
                showRefresh={true}
                className="shadow-md"
                onRefresh={fetchPermissions}
                rowKey="id"
            />
        </div>
    );
}

export default Permission;