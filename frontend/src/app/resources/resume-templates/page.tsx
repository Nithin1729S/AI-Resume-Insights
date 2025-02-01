import { getUserId } from "@/app/lib/actions";
import apiService from "@/app/services/apiService";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import ResumeTemplates from "@/components/Resources/ResumeTemplates/ResumeTemplates";


const ResumeTemplatesPage = async () => {
  const userId=await getUserId();
  const resume=await apiService.get(`/api/ats/${userId}`)
  return (
    <DefaultLayout>
      <ResumeTemplates resume_url={resume.get_pdf_url}/>
    </DefaultLayout>
  );
};

export default ResumeTemplatesPage;
