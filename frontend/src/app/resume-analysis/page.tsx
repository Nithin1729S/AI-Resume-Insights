import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Main from "@/components/Dashboard/Main";
import { getUserId } from "@/app/lib/actions";
import apiService from "@/app/services/apiService";
import { redirect } from "next/navigation"; // Import redirect from next/navigation
import { usePageData } from "@/hooks/usePageData";

export const metadata = {
  title: "AI Resume Insights",
  description: "Elevate Your Resume, Unlock Your Career Potential",
  icons: {
    icon: "./favicon1.ico",
  },
};

const HomePage = async () => {
  const { userId, resumeData } = await usePageData();

  // If userId is not found, handle the error
  if (!userId) {
    redirect("/resume-upload");
  }

  // Fetch the resume

  // If resume URL is not found, redirect to /resume-upload
  if (!resumeData?.get_pdf_url) {
    redirect("/resume-upload");
  }

  return (
    <DefaultLayout>
      <Main
        userName={
          resumeData.user.name
            ? resumeData.user.name
            : resumeData.user.email.split("@")[0]
        }
        previousScore={null}
        resume_url={resumeData.get_pdf_url}
        overall_score={resumeData.overall_score}
        overall_feedback={resumeData.overall_feedback}
        impact_score={resumeData.impact_score}
        brevity_score={resumeData.brevity_score}
        style_score={resumeData.style_score}
        sections_score={resumeData.sections_score}
        soft_skills_score={resumeData.soft_skills_score}
      />
    </DefaultLayout>
  );
};

export default HomePage;
