import { usePageData } from "@/hooks/usePageData";
import Dates from "@/components/Factors/Style/Dates";
import DefaultLayout from "@/components/Layouts/DefaultLayout";

const DatesPage = async () => {
  const { resumeData } = await usePageData();
  return (
    <DefaultLayout>
      <Dates
        resume_url={resumeData.get_pdf_url}
        dates_score={resumeData.dates_score}
        dates_feedback={resumeData.dates_feedback}
      />
    </DefaultLayout>
  );
};

export default DatesPage;
