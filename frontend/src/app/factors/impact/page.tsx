import { getUserId } from "@/app/lib/actions";
import apiService from "@/app/services/apiService";
import Impact from "@/components/Factors/Impact/Impact";
import DefaultLayout from "@/components/Layouts/DefaultLayout";


const ImpactPage = async () => {
  const userId=await getUserId();
  const resume=await apiService.get(`/api/ats/${userId}`)
  return (
    <DefaultLayout>
      <Impact resume_url={resume.get_pdf_url} impact_score={resume.impact_score} impact_feedback={resume.impact_feedback} quantify_impact_score={resume.quantify_impact_score} repetition_score={resume.repetition_score} weak_verbs_score={resume.weak_verbs_score} responsibilities_score={resume.responsibilities_score} verb_tenses_score={resume.verb_tenses_score} spelling_consistencies_score={resume.spelling_consistencies_score}/>
    </DefaultLayout>
  );
};

export default ImpactPage;
