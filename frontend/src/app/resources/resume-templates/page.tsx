import { usePageData } from "@/hooks/usePageData";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import ResumeTemplates from "@/components/Resources/ResumeTemplates/ResumeTemplates";


const ResumeTemplatesPage = async () => {
  const { resumeData } = await usePageData();
  return (
    <DefaultLayout>
      <ResumeTemplates resume_url={resumeData.get_pdf_url}/>
    </DefaultLayout>
  );
};

export default ResumeTemplatesPage;
