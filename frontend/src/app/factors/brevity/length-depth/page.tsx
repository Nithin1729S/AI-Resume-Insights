import { getUserId } from "@/app/lib/actions";
import apiService from "@/app/services/apiService";
import LengthDepth from "@/components/Factors/Brevity/LengthDepth";
import DefaultLayout from "@/components/Layouts/DefaultLayout";


const LengthDepthWords = async () => {
  const userId=await getUserId();
  const resume=await apiService.get(`/api/ats/${userId}`)
  return (
    <DefaultLayout>
      <LengthDepth resume_url={resume.get_pdf_url} length_depth_score={resume.length_score} length_depth_feedback={resume.length_feedback}/>
    </DefaultLayout>
  );
};

export default LengthDepthWords;
