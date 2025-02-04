import { usePageData } from "@/hooks/usePageData";
import Brevity from "@/components/Factors/Brevity/Brevity";
import DefaultLayout from "@/components/Layouts/DefaultLayout";

const BrevityPage = async () => {
  const { resumeData } = await usePageData();
  return (
    <DefaultLayout>
      <Brevity
        resume_url={resumeData.get_pdf_url}
        brevity_score={resumeData.brevity_score}
        brevity_feedback={resumeData.brevity_feedback}
        length_depth_score={resumeData.length_score}
        use_of_bullets_score={resumeData.use_of_bullets_score}
        bullet_lengths_score={resumeData.bullet_lengths_score}
        filler_words_score={resumeData.filler_words_score}
        page_density_score={resumeData.page_density_score}
        spelling_consistencies_score={resumeData.spelling_consistencies_score}
      />
    </DefaultLayout>
  );
};

export default BrevityPage;
