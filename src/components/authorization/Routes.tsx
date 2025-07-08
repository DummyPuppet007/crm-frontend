import { useEffect, useState } from "react";
import { FetchData } from "../../services/FetchData";
import { routeColumns } from "../DataTable/columns/route-columns";
import { AdvancedDataTable } from "../DataTable/AdvanceDataTable";

function Routes() {
    const [routes, setRoutes] = useState<any[]>([]);
    const [error, setError] = useState<string>("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
            fetchRoutes();
        }, []);
    
        const fetchRoutes = async () => {
            try {
                setLoading(true);
                const response = await FetchData<any>({
                    url: "access/routes",
                    method: "GET",
                });
    
                if (!response || response.statusCode !== 200) {
                    setError("Error : Failed To Fetch Routes." + response.message);
                }
    
                setRoutes(response.data || []);
            } catch (error: any) {
                setError("Error : " + error.message);
            } finally {
                setLoading(false);
            }
        }

  return (
    <div>
        <div className="flex flex-col m-6">
            <AdvancedDataTable
                            columns={routeColumns}
                            data={routes}
                            loading={loading}
                            title="Route List"
                            searchableColumns={['routeName', 'description']}
                            showRefresh={true}
                            className="shadow-md"
                            onRefresh={fetchRoutes}
                            rowKey="id"
                        />
        </div>
    </div>
  )
}

export default Routes