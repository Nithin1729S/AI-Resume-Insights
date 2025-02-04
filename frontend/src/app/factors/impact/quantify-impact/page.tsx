import { usePageData } from "@/hooks/usePageData";
import QuantifyImpact from "@/components/Factors/Impact/QuanitfyImpact";
import DefaultLayout from "@/components/Layouts/DefaultLayout";

const QuantifyImpactPage = async () => {
  const { resumeData } = await usePageData();
  return (
    <DefaultLayout>
      <QuantifyImpact
        resume_url={resumeData.get_pdf_url}
        quantify_impact_score={resumeData.quantify_impact_score}
        quantify_impact_feedback={resumeData.quantify_impact_feedback}
      />
    </DefaultLayout>
  );
};

export default QuantifyImpactPage;
