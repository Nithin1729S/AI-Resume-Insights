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
      <div>
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
