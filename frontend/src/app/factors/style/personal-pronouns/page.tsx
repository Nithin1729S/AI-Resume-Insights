import { usePageData } from "@/hooks/usePageData";
import PersonalPronouns from "@/components/Factors/Style/PersonalPronouns";
import DefaultLayout from "@/components/Layouts/DefaultLayout";

const PersonalPronounsPage = async () => {
  const { resumeData } = await usePageData();
  return (
    <DefaultLayout>
      <PersonalPronouns
        resume_url={resumeData.get_pdf_url}
        personal_pronouns_score={resumeData.personal_pronouns_score}
        personal_pronouns_feedback={resumeData.personal_pronouns_feedback}
      />
    </DefaultLayout>
  );
};

export default PersonalPronounsPage;
