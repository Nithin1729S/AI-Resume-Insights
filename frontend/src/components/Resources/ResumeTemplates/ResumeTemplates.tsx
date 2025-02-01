"use client";

import React from "react";
import PDFCanvas from "@/components/PDFCanvas/PDFCanvas";


interface ResumeTemplatesProps {
  resume_url: string;
}
const ResumeTemplates: React.FC<ResumeTemplatesProps> = ({
  resume_url
}) => {
  return (
    <div className="grid grid-cols-2 h-screen">
      {/* Left half */}
      <div>
        Resume Templates
      </div>

      {/* Right half - PDFCanvas */}
      <div  className="flex justify-end">
        <PDFCanvas resume_url={resume_url}/>
      </div>
    </div>
  );
};

export default ResumeTemplates;
