"use client";

import React from "react";
import PDFCanvas from "@/components/PDFCanvas/PDFCanvas";
import ResumeTemplatesCollection from "@/components/ResumeTemplatesCollection";


interface ResumeTemplatesProps {
  resume_url: string;
}
const ResumeTemplates: React.FC<ResumeTemplatesProps> = ({
  resume_url
}) => {
  return (
    <div className="grid grid-cols-2 h-screen">
      {/* Left half */}
      <div className="overflow-y-auto p-4 [scrollbar-width:none] [-ms-overflow-style:none] hover:[-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
        <ResumeTemplatesCollection/>
      </div>

      {/* Right half - PDFCanvas */}
      <div  className="flex justify-end">
        <PDFCanvas resume_url={resume_url}/>
      </div>
    </div>
  );
};

export default ResumeTemplates;
