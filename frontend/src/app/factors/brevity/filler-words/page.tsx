import { usePageData } from "@/hooks/usePageData";
import FillerWords from "@/components/Factors/Brevity/FillerWords";
import DefaultLayout from "@/components/Layouts/DefaultLayout";

const FillerWordsPage = async () => {
  const { resumeData } = await usePageData();
  return (
    <DefaultLayout>
      <FillerWords
        resume_url={resumeData.get_pdf_url}
        filler_words_score={resumeData.filler_words_score}
        filler_words_feedback={resumeData.filler_words_feedback}
      />
    </DefaultLayout>
  );
};

export default FillerWordsPage;
