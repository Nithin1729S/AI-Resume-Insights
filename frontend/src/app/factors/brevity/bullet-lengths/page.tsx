import { getUserId } from "@/app/lib/actions";
import apiService from "@/app/services/apiService";
import BulletLengths from "@/components/Factors/Brevity/BulletLengths";
import DefaultLayout from "@/components/Layouts/DefaultLayout";


const BulletLengthsPage = async () => {
  const userId=await getUserId();
  const resume=await apiService.get(`/api/ats/${userId}`)
  //console.log(resume)
  return (
    <DefaultLayout>
      <BulletLengths resume_url={resume.get_pdf_url} bullet_lengths_score={resume.bullet_lengths_score} bullet_lengths_feedback={resume.bullet_lengths_feedback}/>
    </DefaultLayout>
  );
};

export default BulletLengthsPage;
