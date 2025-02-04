import { usePageData } from "@/hooks/usePageData";
import BulletLengths from "@/components/Factors/Brevity/BulletLengths";
import DefaultLayout from "@/components/Layouts/DefaultLayout";


const BulletLengthsPage = async () => {
  const { resumeData } = await usePageData();
  //console.log(resume)
  return (
    <DefaultLayout>
      <BulletLengths 
        resume_url={resumeData.get_pdf_url} 
        bullet_lengths_score={resumeData.bullet_lengths_score} 
        bullet_lengths_feedback={resumeData.bullet_lengths_feedback}/>
    </DefaultLayout>
  );
};

export default BulletLengthsPage;
