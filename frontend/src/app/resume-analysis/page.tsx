import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Main from "@/components/Dashboard/Main";
import { getUserId } from "@/app/lib/actions";
import apiService from "@/app/services/apiService";
import { redirect } from "next/navigation"; // Import redirect from next/navigation

export const metadata = {
  title: "AI Resume Insights",
  description: "Elevate Your Resume, Unlock Your Career Potential",
  icons: {
    icon: "./favicon1.ico",
  },
};

const HomePage = async () => {
  const userId = await getUserId();

  // If userId is not found, handle the error
  if (!userId) {
    redirect("/resume-upload");
  }

  // Fetch the resume
  const resume = await apiService.get(`/api/ats/${userId}`);

  // If resume URL is not found, redirect to /resume-upload
  if (!resume?.get_pdf_url) {
    redirect("/resume-upload");
  }

  return (
    <DefaultLayout>
      {/* <Main resume_url={resume.get_pdf_url} overall_score={resume.overall_score} overall_feedback={resume.overall_feedback}/> */}
      <Main userName={resume.user.name ? resume.user.name : resume.user.email.split('@')[0]} score={resume.overall_score} previousScore={null} resume_url={resume.get_pdf_url} overall_score={resume.overall_score} overall_feedback={resume.overall_feedback}/>
    </DefaultLayout>
  );
};

export default HomePage;
