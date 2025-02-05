import { usePageData } from "@/hooks/usePageData";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Quiz from "@/components/Skills/HardSkills/Quiz";


const QuizPage = async () => {
  const { resumeData } = await usePageData();
  return (
    <DefaultLayout>
      <Quiz resume_url={resumeData.get_pdf_url}/>
    </DefaultLayout>
  );
};

export default QuizPage;
