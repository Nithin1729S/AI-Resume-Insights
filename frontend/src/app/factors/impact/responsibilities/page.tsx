import { usePageData } from "@/hooks/usePageData";
import Responsibilities from "@/components/Factors/Impact/Responsibilities";
import DefaultLayout from "@/components/Layouts/DefaultLayout";

const ResponsibilitiesPage = async () => {
  const { resumeData } = await usePageData();
  return (
    <DefaultLayout>
      <Responsibilities
        resume_url={resumeData.get_pdf_url}
        responsibilities_score={resumeData.repetition_score}
        responsibilities_feedback={resumeData.responsibilities_feedback}
      />
    </DefaultLayout>
  );
};

export default ResponsibilitiesPage;
