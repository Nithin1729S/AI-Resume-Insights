import { usePageData } from "@/hooks/usePageData";
import WeakVerbs from "@/components/Factors/Impact/WeakVerbs";
import DefaultLayout from "@/components/Layouts/DefaultLayout";

const WeakVerbsPage = async () => {
  const { resumeData } = await usePageData();
  return (
    <DefaultLayout>
      <WeakVerbs
        resume_url={resumeData.get_pdf_url}
        weak_verbs_score={resumeData.weak_verbs_score}
        weak_verbs_feedback={resumeData.weak_verbs_feedback}
      />
    </DefaultLayout>
  );
};

export default WeakVerbsPage;
