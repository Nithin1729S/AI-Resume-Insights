import Table from "./ResumeTable";
import { getUserId } from "@/app/lib/actions";
import apiService from "@/app/services/apiService";
import DefaultLayout from "@/components/Layouts/DefaultLayout";

const MyResumesPage = async () => {
  const userId = await getUserId();
  const response = await apiService.get(`/api/ats/my-resumes/`);
  return (
    <DefaultLayout>
        <Table resumeData={response} />
    </DefaultLayout>
  );
};

export default MyResumesPage;
