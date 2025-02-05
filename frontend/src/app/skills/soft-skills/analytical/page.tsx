import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Analytical from "@/components/Skills/SoftSkills/Analytical";
import { usePageData } from "@/hooks/usePageData";


const AnalyticalPage = async () => {
   const { resumeData } = await usePageData();
  return (
    <DefaultLayout>
      <Analytical resume_url={resumeData.get_pdf_url} analytical_score={resumeData.analytical_score} analytical_feedback={resumeData.analytical_feedback}/>
    </DefaultLayout>
  );
};

export default  AnalyticalPage;
