import Table from "./ResumeTable";
import { getUserId } from "@/app/lib/actions";
import apiService from "@/app/services/apiService";
import DefaultLayout from "@/components/Layouts/DefaultLayout";

const RESUMEData = [
  {
    picture: "/images/RESUME/RESUME1.png",
    impact: 4.5,
    brevity: 4.5,
    style: 4.5,
    sections: 4.5,
    total_score: 18,
  },
  {
    picture: "/images/RESUME/RESUME2.png",
    impact: 4.5,
    brevity: 4.5,
    style: 4.5,
    sections: 4.5,
    total_score: 18,
  },
  {
    picture: "/images/RESUME/RESUME3.png",
    impact: 4.5,
    brevity: 4.5,
    style: 4.5,
    sections: 4.5,
    total_score: 18,
  },
  {
    picture: "/images/RESUME/RESUME4.png",
    impact: 4.5,
    brevity: 4.5,
    style: 4.5,
    sections: 4.5,
    total_score: 18,
  },
];
const MyResumesPage = async () => {
  const userId=await getUserId();
  const resume=await apiService.get(`/api/ats/${userId}`)
  return (
    <DefaultLayout>
        <Table resumeData={RESUMEData}/>
    </DefaultLayout>
  );
};

export default  MyResumesPage;
