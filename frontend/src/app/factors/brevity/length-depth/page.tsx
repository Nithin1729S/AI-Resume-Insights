import { usePageData } from "@/hooks/usePageData";
import LengthDepth from "@/components/Factors/Brevity/LengthDepth";
import DefaultLayout from "@/components/Layouts/DefaultLayout";


const LengthDepthWords = async () => {
  const { resumeData } = await usePageData();
  return (
    <DefaultLayout>
      <LengthDepth 
        resume_url={resumeData.get_pdf_url} 
        length_depth_score={resumeData.length_score} 
        length_depth_feedback={resumeData.length_feedback}/>
    </DefaultLayout>
  );
};

export default LengthDepthWords;
