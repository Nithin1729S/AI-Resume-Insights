import { getUserId } from "@/app/lib/actions";
import apiService from "@/app/services/apiService";
import UseOfBullets from "@/components/Factors/Brevity/UseOfBullets";
import DefaultLayout from "@/components/Layouts/DefaultLayout";


const UseOfBulletsPage = async () => {
  const userId=await getUserId();
  const resume=await apiService.get(`/api/ats/${userId}`)
  return (
    <DefaultLayout>
      <UseOfBullets resume_url={resume.get_pdf_url} use_of_bullets_score={resume.use_of_bullets_score} use_of_bullets_feedback={resume.use_of_bullets_feedback}/>
    </DefaultLayout>
  );
};

export default UseOfBulletsPage;
