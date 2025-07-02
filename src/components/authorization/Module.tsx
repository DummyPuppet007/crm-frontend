import CreateButton from "../common/CreateButton";
import { useEffect, useState } from "react";
import ModuleForm from "../Form/ModuleForm";
import { FetchData } from "../../services/FetchData";
import type { ModuleList } from "../../types/auth.types";
import { AdvancedDataTable } from "../DataTable/AdvanceDataTable";
import { moduleColumns } from "../DataTable/columns/module-columns";

const Module: React.FC = () => {
    const [modalOpen, setModalOpen] = useState(false);
    const [modules, setModules] = useState<ModuleList[]>([]);
    const [error, setError] = useState<string>("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchModules();
    }, []);

    const fetchModules = async () => {
        try {
            setLoading(true);
            const response = await FetchData<any>({
                url: "access/modules",
                method: "GET",
            });

            if (!response || response.statusCode !== 200) {
                setError("Error : Failed To Fetch Modules." + response.message);
            }

            setModules(response.data || []);
        } catch (error: any) {
            setError("Error : " + error.message);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="flex flex-col m-6">
            <div className="flex flex-col items-end mb-4">
                <CreateButton label="Module" onClick={() => setModalOpen(true)} />
                <ModuleForm open={modalOpen} onClose={() => setModalOpen(false)} refreshData={fetchModules} />
            </div>
            <AdvancedDataTable
                columns={moduleColumns}
                data={modules}
                loading={loading}
                title="Module List"
                searchableColumns={['moduleName', 'description']}
                showRefresh={true}
                className="shadow-md"
                onRefresh={fetchModules}
                rowKey="id"
            />
        </div>
    );
}

export default Module;