import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Drive from "@/components/Skills/SoftSkills/Drive";
import { usePageData } from "@/hooks/usePageData";

const DrivePage = async () => {
  const { resumeData } = await usePageData();
  return (
    <DefaultLayout>
      <Drive 
      resume_url={resumeData.get_pdf_url} 
      drive_score={resumeData.drive_score} 
      drive_feedback={resumeData.drive_feedback}/>
    </DefaultLayout>
  );
};

export default  DrivePage;