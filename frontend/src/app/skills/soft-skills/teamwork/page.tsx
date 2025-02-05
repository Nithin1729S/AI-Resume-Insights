import DefaultLayout from "@/components/Layouts/DefaultLayout";
import TeamWork from "@/components/Skills/SoftSkills/Teamwork";
import { usePageData } from "@/hooks/usePageData";

const TeamWorkPage = async () => {
  const { resumeData } = await usePageData();
  return (
    <DefaultLayout>
      <TeamWork 
      resume_url={resumeData.get_pdf_url} 
      teamwork_score={resumeData.teamwork_score} 
      teamwork_feedback={resumeData.teamwork_feedback}/>
    </DefaultLayout>
  );
};

export default  TeamWorkPage;
