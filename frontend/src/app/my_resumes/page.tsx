"use client";
import { useState, useEffect } from "react";
import Table from "./ResumeTable";
import apiService from "@/app/services/apiService";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Loader from "@/components/common/Loader";
import { useRouter } from "next/navigation";
import ScoreGraph from "./ScoreGraph";

const MyResumesPage = () => {
  const router = useRouter();
  const [resumeData, setResumeData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchResumes = async () => {
    try {
      const response = await apiService.get(`/api/ats/my-resumes/`);
      setResumeData(response);
    } catch (error) {
      console.error("Error fetching resumes:", error);
      router.push("/login");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchResumes();
  }, []);

  if (loading) {
    return (
      <DefaultLayout>
        <Loader />
      </DefaultLayout>
    );
  }

  return (
    <DefaultLayout>
      <Table resumeData={resumeData} onDelete={fetchResumes} />
      <br />
      <ScoreGraph resumeData={resumeData} />
    </DefaultLayout>
  );
};





export default MyResumesPage;