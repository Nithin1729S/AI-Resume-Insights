import { getUserId } from "@/app/lib/actions";
import apiService from "@/app/services/apiService";
import Dates from "@/components/Factors/Style/Dates";
import DefaultLayout from "@/components/Layouts/DefaultLayout";


const DatesPage = async () => {
  const userId=await getUserId();
  const resume=await apiService.get(`/api/ats/${userId}`)
  return (
    <DefaultLayout>
      <Dates resume_url={resume.get_pdf_url} dates_score={resume.dates_score} dates_feedback={resume.dates_feedback}/>
    </DefaultLayout>
  );
};

export default  DatesPage;
