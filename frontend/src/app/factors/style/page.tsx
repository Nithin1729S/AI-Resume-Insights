import { getUserId } from "@/app/lib/actions";
import apiService from "@/app/services/apiService";
import Style from "@/components/Factors/Style/Style";
import DefaultLayout from "@/components/Layouts/DefaultLayout";


const StylePage = async () => {
  const userId=await getUserId();
  const resume=await apiService.get(`/api/ats/${userId}`)
  return (
    <DefaultLayout>
      <Style resume_url={resume.get_pdf_url} style_score={resume.style_score} style_feedback={resume.style_feedback} buzzwords_score={resume.buzzwords_score} dates_score={0} contact_personal_details_score={resume.contact_and_personal_details_score} readability_score={resume.readability_score} personal_pronouns_score={resume.personal_pronouns_score} spelling_consistencies_score={resume.consistency_score} active_voice_score={resume.active_voice_score}/>
    </DefaultLayout>
  );
};

export default StylePage;
