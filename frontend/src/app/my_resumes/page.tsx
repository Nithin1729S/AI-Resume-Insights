"use client";
import { useState, useEffect } from "react";
import Table from "./ResumeTable";
import apiService from "@/app/services/apiService";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Loader from "@/components/common/Loader";
import { useRouter } from "next/navigation";
import ScoreGraph from "./ScoreGraph";


// Sample resume data with multiple resumes
const sampleResumeData = [
  {
    id: "1",
    picture: "https://example.com/picture1.jpg",
    pdf: "https://example.com/resume1.pdf",
    impact: 85,
    brevity: 92,
    style: 78,
    sections: 88,
    total_score: 86
  },
  {
    id: "2",
    picture: "https://example.com/picture2.jpg",
    pdf: "https://example.com/resume2.pdf",
    impact: 90,
    brevity: 85,
    style: 88,
    sections: 95,
    total_score: 92
  },
  {
    id: "3",
    picture: "https://example.com/picture3.jpg",
    pdf: "https://example.com/resume3.pdf",
    impact: 75,
    brevity: 80,
    style: 85,
    sections: 82,
    total_score: 78
  },
  {
    id: "4",
    picture: "https://example.com/picture4.jpg",
    pdf: "https://example.com/resume4.pdf",
    impact: 95,
    brevity: 88,
    style: 92,
    sections: 90,
    total_score: 94
  }
];

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
      <ScoreGraph resumeData={sampleResumeData} />
    </DefaultLayout>
  );
};





export default MyResumesPage;