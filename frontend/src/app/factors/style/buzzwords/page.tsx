import { usePageData } from "@/hooks/usePageData";
import Buzzwords from "@/components/Factors/Style/Buzzwords";
import DefaultLayout from "@/components/Layouts/DefaultLayout";

const BuzzwordsPage = async () => {
  const { resumeData } = await usePageData();
  return (
    <DefaultLayout>
      <Buzzwords
        resume_url={resumeData.get_pdf_url}
        buzzwords_score={resumeData.buzzwords_score}
        buzzwords_feedback={resumeData.buzzwords_feedback}
      />
    </DefaultLayout>
  );
};

export default BuzzwordsPage;
