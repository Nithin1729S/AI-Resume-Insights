import { getUserId } from "@/app/lib/actions";
import apiService from "@/app/services/apiService";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import HardSkills from "@/components/Skills/HardSkills/HardSkills";

const HardSkillsPage = async () => {
  const userId = await getUserId();
  const resume = await apiService.get(`/api/ats/${userId}`);

  return (
    <DefaultLayout>
      <HardSkills resume_url={resume.get_pdf_url} skills={resume.skills} />
    </DefaultLayout>
  );
};

export default HardSkillsPage;