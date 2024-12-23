import { getUserId } from "@/app/lib/actions";
import apiService from "@/app/services/apiService";
import UnnecessarySections from "@/components/Factors/Sections/UnnecessarySections";
import DefaultLayout from "@/components/Layouts/DefaultLayout";


const UnnecessarySectionPage = async () => {
  const userId=await getUserId();
  const resume=await apiService.get(`/api/ats/${userId}`)
  return (
    <DefaultLayout>
      <UnnecessarySections resume_url={resume.get_pdf_url} unnecessary_sections_score={resume.unnecessary_sections_score} unnecessary_sections_feedback={resume.unnecessary_sections_feedback}/>
    </DefaultLayout>
  );
};

export default  UnnecessarySectionPage;
