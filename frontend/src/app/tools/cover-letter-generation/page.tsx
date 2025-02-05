import { getUserId } from "@/app/lib/actions";
import { usePageData } from "@/hooks/usePageData";
import apiService from "@/app/services/apiService";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import CoverLetterGeneration from "@/components/Tools/CoverLetterGeneration/CoverLetterGeneration";


const CoverLetterGenerationPage = async () => {
  const { resumeData } = await usePageData();

  // Check if the cover letter is empty before calling the API
  let coverLetter = resumeData.cover_letter;
  if (!coverLetter) {
    const coverLetterGenResponse = await apiService.get(`/api/ats/cover-letter-gen`);
    coverLetter = coverLetterGenResponse?.cover_letter; 
  }

  return (
    <DefaultLayout>
      <CoverLetterGeneration resume_url={resumeData.get_pdf_url} cover_letter={coverLetter} />
    </DefaultLayout>
  );
};

export default CoverLetterGenerationPage;
