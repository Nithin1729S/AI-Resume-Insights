
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import LineAnalysis from "@/components/Tools/LineAnalysis/LineAnalysis";
import { usePageData } from "@/hooks/usePageData";


const LineAnalysisPage = async () => {
  const { resumeData } = await usePageData();
  return (
    <DefaultLayout>
      <LineAnalysis resume_url={resumeData.get_pdf_url}/>
    </DefaultLayout>
  );
};

export default  LineAnalysisPage;
