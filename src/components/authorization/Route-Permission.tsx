import CreateButton from "../common/CreateButton";
import { useEffect, useState } from "react";
import { FetchData } from "../../services/FetchData";
import type { RoutePermissionList } from "../../types/auth.types";
import RoutePermissionForm from "../Form/RoutePermissionForm";
import { routePermissionColumns } from "../DataTable/columns/routepermission-columns";
import { AdvancedDataTable } from "../DataTable/AdvanceDataTable";

const RoutePermission: React.FC = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [routePermissions, setRoutePermissions] = useState<
    RoutePermissionList[]
  >([]);
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
        setError(
          "Error : Failed To Fetch Route Permissions." + response.message
        );
      }

      const formattedData = response.data.map((routePermission: any) => ({
          routePermissionId: routePermission.id,
          routeId: routePermission.route?.routeId || 0,
          routeName: routePermission.route?.routeName || '',
          permissionId: routePermission.permission?.permissionId || 0,
          permissionName: `${routePermission.permission?.module?.moduleName}-${routePermission.permission?.action?.actionName}` || '',
          createdAt: routePermission.createdAt,
      }));

      setRoutePermissions(formattedData || []);
    } catch (error: any) {
      setError("Error : " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col m-6">
      <div className="flex flex-col items-end mb-4">
        <CreateButton
          label="Route Permission"
          onClick={() => setModalOpen(true)}
        />
        <RoutePermissionForm
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          refreshData={fetchRoutePermissions}
        />
      </div>
      <AdvancedDataTable
        columns={routePermissionColumns}
        data={routePermissions}
        loading={loading}
        title="Route Permission List"
        searchableColumns={["routeName", "permissionName"]}
        showRefresh={true}
        className="shadow-md"
        onRefresh={fetchRoutePermissions}
        rowKey="id"
      />
    </div>
  );
};

export default RoutePermission;
