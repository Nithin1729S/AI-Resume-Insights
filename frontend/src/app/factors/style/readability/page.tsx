import { usePageData } from "@/hooks/usePageData";
import Readability from "@/components/Factors/Style/Readability";
import DefaultLayout from "@/components/Layouts/DefaultLayout";

const ReadabilityPage = async () => {
  const { resumeData } = await usePageData();
  return (
    <DefaultLayout>
      <Readability
        resume_url={resumeData.get_pdf_url}
        readability_score={resumeData.readability_score}
        readability_feedback={resumeData.readability_feedback}
      />
    </DefaultLayout>
  );
};

export default ReadabilityPage;
