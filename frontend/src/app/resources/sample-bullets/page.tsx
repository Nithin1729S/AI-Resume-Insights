import { usePageData } from "@/hooks/usePageData";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import SampleBullets from "@/components/Resources/SampleBullets/SampleBullets";


const SampleBulletsPage = async () => {
  const { resumeData } = await usePageData();
  return (
    <DefaultLayout>
      <SampleBullets resume_url={resumeData.get_pdf_url}/>
    </DefaultLayout>
  );
};

export default  SampleBulletsPage;
