import { usePageData } from "@/hooks/usePageData";
import ActiveVoice from "@/components/Factors/Style/ActiveVoice";
import DefaultLayout from "@/components/Layouts/DefaultLayout";

const ActiveVoicePage = async () => {
  const { resumeData } = await usePageData();
  return (
    <DefaultLayout>
      <ActiveVoice
        resume_url={resumeData.get_pdf_url}
        active_voice_score={resumeData.active_voice_score}
        active_voice_feedback={resumeData.active_voice_feedback}
      />
    </DefaultLayout>
  );
};

export default ActiveVoicePage;
