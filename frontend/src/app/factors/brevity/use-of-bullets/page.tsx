import { usePageData } from "@/hooks/usePageData";
import UseOfBullets from "@/components/Factors/Brevity/UseOfBullets";
import DefaultLayout from "@/components/Layouts/DefaultLayout";

const UseOfBulletsPage = async () => {
  const { resumeData } = await usePageData();
  return (
    <DefaultLayout>
      <UseOfBullets
        resume_url={resumeData.get_pdf_url}
        use_of_bullets_score={resumeData.use_of_bullets_score}
        use_of_bullets_feedback={resumeData.use_of_bullets_feedback}
      />
    </DefaultLayout>
  );
};

export default UseOfBulletsPage;
