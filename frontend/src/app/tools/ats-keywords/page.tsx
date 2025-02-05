import { usePageData } from "@/hooks/usePageData";
import apiService from "@/app/services/apiService";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import ATSKeywords from "@/components/Tools/ATSKeywords/ATSKeywords";


const ATSKeywordsPage = async () => {
  const { resumeData } = await usePageData();

  let jobMatches = resumeData.job_matches;
  if (!jobMatches) {
    const jobMatchesGenResponse = await apiService.get(`/api/ats/job-matches`);
    jobMatches = jobMatchesGenResponse?.job_matches; 
  }
  return (
    <DefaultLayout>
      <ATSKeywords resume_url={resumeData.get_pdf_url} job_matches={jobMatches}/>
    </DefaultLayout>
  );
};

export default  ATSKeywordsPage;
