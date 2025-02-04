import { getUserId } from "@/app/lib/actions";
import apiService from "@/app/services/apiService";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import SoftSkills from "@/components/Skills/SoftSkills/SoftSkills";


const SoftSkillsPage = async () => {
  const userId=await getUserId();
  const resume=await apiService.get(`/api/ats/${userId}`)
  return (
    <DefaultLayout>
      <SoftSkills resume_url={resume.get_pdf_url} soft_skills_score={resume.soft_skills_score} soft_skills_feedback={resume.soft_skills_feedback} communication_score={resume.communication_score} leadership_score={resume.leadership_score} analytical_score={resume.analytical_score} teamwork_score={resume.teamwork_score} drive_score={resume.drive_score}/>
    </DefaultLayout>
  );
};

export default SoftSkillsPage;
