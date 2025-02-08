"use client";

import React from "react";
import PDFCanvas from "@/components/PDFCanvas/PDFCanvas";
import ResumePoints from "@/components/ResumePoints";


interface SampleBulletsProps {
  resume_url: string;
}
const SampleBullets: React.FC<SampleBulletsProps> = ({
  resume_url
}) => {
  return (
    <div className="grid grid-cols-2 h-screen">
      {/* Left half */}
      <div className="overflow-y-auto p-4 [scrollbar-width:none] [-ms-overflow-style:none] hover:[-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
        <ResumePoints/>
      </div>

      {/* Right half - PDFCanvas */}
      <div  className="flex justify-end">
        <PDFCanvas resume_url={resume_url}/>
      </div>
    </div>
  );
};

export default SampleBullets;
