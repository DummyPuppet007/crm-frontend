import { Button } from "antd";
import { useEffect, useState } from "react";
import type { ActionList } from "../../types/auth.types";
import ActionForm from "../Form/ActionForm";
import { FetchData } from "../../services/FetchData";
import { AdvancedDataTable } from "../DataTable/AdvanceDataTable";
import { actionColumns } from "../DataTable/columns/action-columns";

const Action : React.FC = () => {
    const [modalOpen, setModalOpen] = useState(false);
    const [actions, setActions] = useState<ActionList[]>([]);
    const [error, setError] = useState<string>("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
            fetchActions();
        }, []);
    
        const fetchActions = async () => {
            try {
                setLoading(true);
                const response = await FetchData<any>({
                    url: "access/actions",
                    method: "GET",
                });
    
                if (!response || response.statusCode !== 200) {
                    setError("Error : Failed To Fetch Actions." + response.message);
                }
    
                setActions(response.data || []);
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
                >Create Action</Button>
                <ActionForm open={modalOpen} onClose={() => setModalOpen(false)} refreshData={fetchActions}/>
            </div>
            <AdvancedDataTable
                            columns={actionColumns}
                            data={actions}
                            loading={loading}
                            title="Action List"
                            searchableColumns={['actionName', 'description']}
                            showRefresh={true}
                            onRefresh={fetchActions}
                            rowKey="id"
                        />
        </div>
    );
}

export default Action;