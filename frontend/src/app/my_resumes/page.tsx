import Table from "./Table";
import { getUserId } from "@/app/lib/actions";
import apiService from "@/app/services/apiService";
import DefaultLayout from "@/components/Layouts/DefaultLayout";


const QuantifyImpactPage = async () => {
  const userId=await getUserId();
  const resume=await apiService.get(`/api/ats/${userId}`)
  return (
    <DefaultLayout>
        <Table/>
    </DefaultLayout>
  );
};

export default  QuantifyImpactPage;
