import Impact from "@/components/Factors/Impact/Impact";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { usePageData } from "@/hooks/usePageData";

const ImpactPage = async () => {
  const { resumeData } = await usePageData();
  
  return (
    <DefaultLayout>
      <Impact 
        resume_url={resumeData.get_pdf_url}
        impact_score={resumeData.impact_score}
        impact_feedback={resumeData.impact_feedback}
        quantify_impact_score={resumeData.quantify_impact_score}
        repetition_score={resumeData.repetition_score}
        weak_verbs_score={resumeData.weak_verbs_score}
        responsibilities_score={resumeData.responsibilities_score}
        verb_tenses_score={resumeData.verb_tenses_score}
        spelling_consistencies_score={resumeData.spelling_consistencies_score}
      />
    </DefaultLayout>
  );
};

export default ImpactPage;