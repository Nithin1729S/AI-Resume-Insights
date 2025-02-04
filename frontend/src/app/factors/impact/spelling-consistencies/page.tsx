import { usePageData } from "@/hooks/usePageData";
import SpellingConsistency from "@/components/Factors/Impact/SpellingConsistency";
import DefaultLayout from "@/components/Layouts/DefaultLayout";

const SpellingConsistencyPage = async () => {
  const { resumeData } = await usePageData();
  return (
    <DefaultLayout>
      <SpellingConsistency
        resume_url={resumeData.get_pdf_url}
        spelling_consistency_score={resumeData.spelling_and_consistency_score}
        spelling_consistency_feedback={
          resumeData.spelling_and_consistency_feedback
        }
      />
    </DefaultLayout>
  );
};

export default SpellingConsistencyPage;
