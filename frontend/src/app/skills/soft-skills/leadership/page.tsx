import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Leadership from "@/components/Skills/SoftSkills/Leadership";
import { usePageData } from "@/hooks/usePageData";

const LeadershipPage = async () => {
  const { resumeData } = await usePageData();
  return (
    <DefaultLayout>
      <Leadership 
      resume_url={resumeData.get_pdf_url} 
      leadership_score={resumeData.leadership_score} 
      leadership_feedback={resumeData.leadership_feedback}/>
    </DefaultLayout>
  );
};

export default  LeadershipPage;
