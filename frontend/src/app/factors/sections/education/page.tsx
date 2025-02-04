import { usePageData } from "@/hooks/usePageData";
import Education from "@/components/Factors/Sections/Education";
import DefaultLayout from "@/components/Layouts/DefaultLayout";

const EducationPage = async () => {
  const { resumeData } = await usePageData();
  return (
    <DefaultLayout>
      <Education
        resume_url={resumeData.get_pdf_url}
        education_score={resumeData.education_score}
        education_feedback={resumeData.education_feedback}
      />
    </DefaultLayout>
  );
};

export default EducationPage;
