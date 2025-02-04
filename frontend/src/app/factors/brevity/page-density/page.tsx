import { usePageData } from "@/hooks/usePageData";

import PageDensity from "@/components/Factors/Brevity/PageDensity";
import DefaultLayout from "@/components/Layouts/DefaultLayout";

const PageDensityPage = async () => {
  const { resumeData } = await usePageData();
  return (
    <DefaultLayout>
      <PageDensity
        resume_url={resumeData.get_pdf_url}
        page_density_score={resumeData.page_density_score}
        page_density_feedback={resumeData.page_density_feedback}
      />
    </DefaultLayout>
  );
};

export default PageDensityPage;
