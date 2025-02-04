import { usePageData } from "@/hooks/usePageData";
import Skills from "@/components/Factors/Sections/Skills";
import DefaultLayout from "@/components/Layouts/DefaultLayout";

const SkillsPage = async () => {
  const { resumeData } = await usePageData();
  return (
    <DefaultLayout>
      <Skills
        resume_url={resumeData.get_pdf_url}
        skills_score={resumeData.skills_score}
        skills_feedback={resumeData.skills_feedback}
      />
    </DefaultLayout>
  );
};

export default SkillsPage;
