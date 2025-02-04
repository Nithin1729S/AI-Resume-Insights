import { getUserId } from "@/app/lib/actions";
import apiService from "@/app/services/apiService";
import Brevity from "@/components/Factors/Brevity/Brevity";
import DefaultLayout from "@/components/Layouts/DefaultLayout";


const BrevityPage = async () => {
  const userId=await getUserId();
  const resume=await apiService.get(`/api/ats/${userId}`)
  return (
    <DefaultLayout>
      <Brevity resume_url={resume.get_pdf_url} brevity_score={resume.brevity_score} brevity_feedback={resume.brevity_feedback} length_depth_score={resume.length_score} use_of_bullets_score={resume.use_of_bullets_score} bullet_lengths_score={resume.bullet_lengths_score} filler_words_score={resume.filler_words_score} page_density_score={resume.page_density_score} spelling_consistencies_score={resume.spelling_consistencies_score}/>
    </DefaultLayout>
  );
};

export default BrevityPage;
