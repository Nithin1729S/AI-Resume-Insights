import { usePageData } from "@/hooks/usePageData";
import UnnecessarySections from "@/components/Factors/Sections/UnnecessarySections";
import DefaultLayout from "@/components/Layouts/DefaultLayout";

const UnnecessarySectionPage = async () => {
  const { resumeData } = await usePageData();
  return (
    <DefaultLayout>
      <UnnecessarySections
        resume_url={resumeData.get_pdf_url}
        unnecessary_sections_score={resumeData.unnecessary_sections_score}
        unnecessary_sections_feedback={resumeData.unnecessary_sections_feedback}
      />
    </DefaultLayout>
  );
};

export default UnnecessarySectionPage;
