import { usePageData } from "@/hooks/usePageData";
import Style from "@/components/Factors/Style/Style";
import DefaultLayout from "@/components/Layouts/DefaultLayout";

const StylePage = async () => {
  const { resumeData } = await usePageData();
  return (
    <DefaultLayout>
      <Style
        resume_url={resumeData.get_pdf_url}
        style_score={resumeData.style_score}
        style_feedback={resumeData.style_feedback}
        buzzwords_score={resumeData.buzzwords_score}
        dates_score={resumeData.dates_score}
        contact_personal_details_score={
          resumeData.contact_and_personal_details_score
        }
        readability_score={resumeData.readability_score}
        personal_pronouns_score={resumeData.personal_pronouns_score}
        spelling_consistencies_score={resumeData.consistency_score}
        active_voice_score={resumeData.active_voice_score}
      />
    </DefaultLayout>
  );
};

export default StylePage;
