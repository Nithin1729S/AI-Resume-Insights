import { getUserId } from "@/app/lib/actions";
import apiService from "@/app/services/apiService";
import Sections from "@/components/Factors/Sections/Sections";
import DefaultLayout from "@/components/Layouts/DefaultLayout";


const SectionsPage = async () => {
  const userId=await getUserId();
  const resume=await apiService.get(`/api/ats/${userId}`)
  return (
    <DefaultLayout>
      <Sections resume_url={resume.get_pdf_url} sections_score={resume.sections_score} sections_feedback={resume.sections_feedback} education_score={resume.education_score} unnecessary_sections_score={resume.unnecessary_sections_score} skills_score={resume.skills_score} />
    </DefaultLayout>
  );
};

export default SectionsPage;
