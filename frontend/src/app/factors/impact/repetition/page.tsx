import { usePageData } from "@/hooks/usePageData";
import Repetition from "@/components/Factors/Impact/Repetition";
import DefaultLayout from "@/components/Layouts/DefaultLayout";

const RepetitionPage = async () => {
  const { resumeData } = await usePageData();
  return (
    <DefaultLayout>
      <Repetition
        resume_url={resumeData.get_pdf_url}
        repetition_score={resumeData.repetition_score}
        repetition_feedback={resumeData.repetition_feedback}
      />
    </DefaultLayout>
  );
};

export default RepetitionPage;
