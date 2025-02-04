import { usePageData } from "@/hooks/usePageData";
import VerbTenses from "@/components/Factors/Impact/VerbTenses";
import DefaultLayout from "@/components/Layouts/DefaultLayout";

const VerbTensesPage = async () => {
  const { resumeData } = await usePageData();
  return (
    <DefaultLayout>
      <VerbTenses
        resume_url={resumeData.get_pdf_url}
        verb_tenses_score={resumeData.verb_tenses_score}
        verb_tenses_feedback={resumeData.verb_tenses_feedback}
      />
    </DefaultLayout>
  );
};

export default VerbTensesPage;
