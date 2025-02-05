
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import HardSkills from "@/components/Skills/HardSkills/HardSkills";
import { usePageData } from "@/hooks/usePageData";

const HardSkillsPage = async () => {
  const { resumeData } = await usePageData()

  return (
    <DefaultLayout>
      <HardSkills resume_url={resumeData.get_pdf_url} skills={resumeData.skills} />
    </DefaultLayout>
  );
};

export default HardSkillsPage;