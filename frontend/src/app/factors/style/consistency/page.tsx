import { usePageData } from "@/hooks/usePageData";
import Consistency from "@/components/Factors/Style/Consistency";
import DefaultLayout from "@/components/Layouts/DefaultLayout";

const ConsistencyPage = async () => {
  const { resumeData } = await usePageData();
  return (
    <DefaultLayout>
      <Consistency
        resume_url={resumeData.get_pdf_url}
        consistency_score={resumeData.consistency_score}
        consistency_feedback={resumeData.consistency_feedback}
      />
    </DefaultLayout>
  );
};

export default ConsistencyPage;
