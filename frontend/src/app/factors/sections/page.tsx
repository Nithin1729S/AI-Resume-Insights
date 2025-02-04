import { usePageData } from "@/hooks/usePageData";
import Sections from "@/components/Factors/Sections/Sections";
import DefaultLayout from "@/components/Layouts/DefaultLayout";

const SectionsPage = async () => {
  const { resumeData } = await usePageData();
  return (
    <DefaultLayout>
      <Sections
        resume_url={resumeData.get_pdf_url}
        sections_score={resumeData.sections_score}
        sections_feedback={resumeData.sections_feedback}
        education_score={resumeData.education_score}
        unnecessary_sections_score={resumeData.unnecessary_sections_score}
        skills_score={resumeData.skills_score}
      />
    </DefaultLayout>
  );
};

export default SectionsPage;
