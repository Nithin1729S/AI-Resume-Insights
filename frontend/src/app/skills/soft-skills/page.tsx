import { getUserId } from "@/app/lib/actions";
import apiService from "@/app/services/apiService";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import SoftSkills from "@/components/Skills/SoftSkills/SoftSkills";
import { usePageData } from "@/hooks/usePageData";


const SoftSkillsPage = async () => {
  const { resumeData } = await usePageData();
  return (
    <DefaultLayout>
      <SoftSkills 
      resume_url={resumeData.get_pdf_url} 
      soft_skills_score={resumeData.soft_skills_score}
      soft_skills_feedback={resumeData.soft_skills_feedback} 
      communication_score={resumeData.communication_score} 
      leadership_score={resumeData.leadership_score} 
      analytical_score={resumeData.analytical_score} 
      teamwork_score={resumeData.teamwork_score} 
      drive_score={resumeData.drive_score}/>
    </DefaultLayout>
  );
};

export default SoftSkillsPage;
