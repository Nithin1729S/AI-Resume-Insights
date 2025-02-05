import { getUserId } from "@/app/lib/actions";
import apiService from "@/app/services/apiService";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Communication from "@/components/Skills/SoftSkills/Communication";
import { usePageData } from "@/hooks/usePageData";


const CommunicationPage = async () => {
  const { resumeData } = await usePageData();
  return (
    <DefaultLayout>
      <Communication 
      resume_url={resumeData.get_pdf_url} 
      communication_score={resumeData.communication_score}
       communication_feedback={resumeData.communication_feedback}/>
    </DefaultLayout>
  );
};

export default CommunicationPage;
