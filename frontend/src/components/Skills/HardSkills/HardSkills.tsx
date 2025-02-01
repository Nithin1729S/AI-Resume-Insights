"use client";

import React from "react";
import PDFCanvas from "@/components/PDFCanvas/PDFCanvas";

interface HardSkillsProps {
  resume_url: string;
  skills: string[]; // Add skills as a prop
}

const HardSkills: React.FC<HardSkillsProps> = ({
  resume_url,
  skills, // Destructure skills from props
}) => {
  return (
    <div className="grid grid-cols-2 h-screen">
      {/* Left half */}
      <div>
        <h2 className="text-xl font-bold mb-4">Hard Skills</h2>
        <ul className="list-disc list-inside">
          {skills.map((skill, index) => (
            <li key={index} className="text-gray-700">
              {skill}
            </li>
          ))}
        </ul>
      </div>

      {/* Right half - PDFCanvas */}
      <div className="flex justify-end">
        <PDFCanvas resume_url={resume_url} />
      </div>
    </div>
  );
};

export default HardSkills;