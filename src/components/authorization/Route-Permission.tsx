import CreateButton from "../common/CreateButton";
import { useEffect, useState } from "react";
import { FetchData } from "../../services/FetchData";
import type { RoutePermissionList } from "../../types/auth.types";
import RoutePermissionForm from "../Form/RoutePermissionForm";

const RoutePermission:React.FC = () => {
    const [modalOpen, setModalOpen] = useState(false);
    const [routePermissions, setRoutePermissions] = useState<RoutePermissionList[]>([]);
    const [error, setError] = useState<string>("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
            fetchRoutePermissions();
        }, []);
    
        const fetchRoutePermissions = async () => {
            try {
                setLoading(true);
                const response = await FetchData<any>({
                    url: "access/route-permissions",
                    method: "GET",
                });
    
                if (!response || response.statusCode !== 200) {
                    setError("Error : Failed To Fetch Route Permissions." + response.message);
                }
    
                // const formattedData = response.data.map((userPermission: any) => ({
                //     userPermissionId: userPermission.id,
                //     userId: userPermission.user?.userId || 0,
                //     username: userPermission.user?.username || '',
                //     permissionId: userPermission.permission?.permissionId || 0,
                //     permissionName: `${userPermission.permission?.module?.moduleName}-${userPermission.permission?.action?.actionName}` || '',
                //     createdAt: userPermission.createdAt,
                // }));
    
                // setRoutePermissions(formattedData || []);
            } catch (error: any) {
                setError("Error : " + error.message);
            } finally {
                setLoading(false);
            }
        }

    return (
        <div className="flex flex-col m-6">
            <div className="flex flex-col items-end mb-4">
                <CreateButton label="Route Permission" onClick={() => setModalOpen(true)} />
                <RoutePermissionForm open={modalOpen} onClose={() => setModalOpen(false)} refreshData={fetchRoutePermissions} />
            </div>
        </div>
    );
}

export default RoutePermission;