"use client";

import React from "react";
import PDFCanvas from "@/components/PDFCanvas/PDFCanvas";
import RecruiterInsightsCard from "../../RecruiterInsightsCard";
import { AlertCircle, Check, ChevronRight, Lock } from "lucide-react";
import { useRouter } from "next/navigation";

const THRESHOLD: number = 5.9;

const faqs = [
  {
    id: 1,
    question: "What sections should I include in my resume?",
    answer: `
      Here are the essential sections every resume should have:
      <ul>
        <li><strong>Contact Information:</strong> Your name, email, phone, and location at the top</li>
        <li><strong>Work Experience:</strong> Your relevant work history in reverse chronological order</li>
        <li><strong>Education:</strong> Your academic credentials, certifications, and relevant coursework</li>
        <li><strong>Skills:</strong> Technical, soft, and industry-specific skills that match the job requirements</li>
      </ul>
    `,
  },
  {
    id: 2,
    question: "What sections should I avoid in my resume?",
    answer: `
      Some sections that you should generally avoid include:
      <ul>
        <li><strong>Objective Statements:</strong> These are outdated and take up valuable space</li>
        <li><strong>References:</strong> Don't include "References available upon request" - this is assumed</li>
        <li><strong>Personal Information:</strong> Avoid including age, marital status, or other personal details</li>
        <li><strong>Irrelevant Hobbies:</strong> Only include hobbies if they're relevant to the job</li>
      </ul>
      Focus on sections that directly demonstrate your qualifications and value to employers.
    `,
  },
  {
    id: 3,
    question: "How should I organize my Education section?",
    answer: `<p>
Your Education section should be organized effectively:
<br><br>
- List education in reverse chronological order
<br><br>
- Include: Degree, Institution, Graduation Date, GPA (if above 3.0)
<br><br>
- Add relevant coursework, academic projects, and honors
<br><br>
For recent graduates, place Education near the top. For experienced professionals, it can go after Work Experience.
</p>`,
  },
  {
    id: 4,
    question: "How do I structure my Skills section effectively?",
    answer: `<p>
To create an impactful Skills section:
<br><br>
1) Group similar skills together (e.g., Programming Languages, Tools, Soft Skills)
<br><br>
2) Prioritize skills mentioned in the job description
<br><br>
3) Use industry-standard terminology
<br><br>
4) Keep it concise - list only relevant and current skills
<br><br>
5) Consider using proficiency levels for technical skills
<br><br>
Remember to update your Skills section for each application to match the specific job requirements.</p>`,
  },
];

interface SectionsProps {
  resume_url: string;
  sections_score: number;
  sections_feedback: string;
  education_score: number;
  unnecessary_sections_score: number;
  skills_score: number;
}

interface ScoreItem {
  id: string;
  title: string;
  description: string;
  path: string;
  status: "success" | "error" | "locked";
  action: "FIX" | "MORE";
}

const scoreItems = (
  education_score: number,
  unnecessary_sections_score: number,
  skills_score: number,
): ScoreItem[] => [
  {
    id: "1",
    title: "Education",
    description:
      education_score > THRESHOLD
        ? "Your education section is well-detailed with impressive metrics."
        : "Your education section lacks detailed metrics.",
    status: education_score > THRESHOLD ? "success" : "error",
    action: education_score > THRESHOLD ? "MORE" : "FIX",
    path: "/factors/sections/education",
  },
  {
    id: "2",
    title: "Unnecessary Sections",
    description:
      unnecessary_sections_score > THRESHOLD
        ? "Your resume is free from unnecessary sections."
        : "Your resume contains unnecessary sections that should be removed.",
    status: unnecessary_sections_score > THRESHOLD ? "success" : "error",
    action: unnecessary_sections_score > THRESHOLD ? "MORE" : "FIX",
    path: "/factors/sections/unnecessary-sections",
  },
  {
    id: "3",
    title: "Skills",
    description:
      skills_score > THRESHOLD
        ? "Your skills section effectively highlights your strengths."
        : "Your skills section needs stronger verbs to showcase your abilities.",
    status: skills_score > THRESHOLD ? "success" : "error",
    action: skills_score > THRESHOLD ? "MORE" : "FIX",
    path: "/factors/sections/skills",
  },
];

const Sections: React.FC<SectionsProps> = ({
  resume_url,
  sections_score,
  sections_feedback,
  education_score,
  unnecessary_sections_score,
  skills_score,
}) => {
  const router = useRouter();
  return (
    <div className="grid h-screen grid-cols-2">
      {/* Left half */}
      <div className="flex h-full flex-col justify-start overflow-y-auto p-4 [-ms-overflow-style:none] [scrollbar-width:none] hover:[-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
        <div className="rounded-xl border border-gray-100 bg-white p-8 shadow-sm">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-2xl font-semibold text-purple-900">Sections</h2>
            <div
              className={`rounded-full px-4 py-2 ${sections_score >= 10 ? "bg-green-100 text-green-700" : ""} ${sections_score >= 7 && sections_score < 10 ? "bg-green-50 text-green-600" : ""} ${sections_score >= 5 && sections_score < 7 ? "bg-orange-50 text-orange-600" : ""} ${sections_score < 5 ? "bg-red-50 text-red-600" : ""} `}
            >
              <span className="font-semibold">{sections_score}</span>
              <span className="text-sm opacity-70">/10</span>
            </div>
          </div>

          <p className="mb-8 text-gray-600">{sections_feedback}</p>

          {scoreItems(
            education_score,
            unnecessary_sections_score,
            skills_score,
          ).map((item: ScoreItem) => (
            <div
              key={item.id}
              className="flex items-center justify-between rounded-lg border border-gray-100 p-4 transition-colors hover:border-gray-200"
            >
              <div className="flex items-start gap-3">
                {item.status === "success" && (
                  <div className="mt-1">
                    <Check className="h-5 w-5 text-green-500" />
                  </div>
                )}
                {item.status === "error" && (
                  <div className="mt-1">
                    <AlertCircle className="h-5 w-5 text-red-500" />
                  </div>
                )}
                {item.status === "locked" && (
                  <div className="mt-1">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                )}
                <div>
                  <h3 className="mb-1 font-medium text-gray-900">
                    {item.title}
                  </h3>
                  <p className="text-sm text-gray-500">{item.description}</p>
                </div>
              </div>
              <button
                className={`flex items-center rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
                  item.action === "FIX"
                    ? "text-purple-600 hover:bg-purple-50"
                    : "text-purple-600 hover:bg-purple-50"
                }`}
                onClick={() => {
                  router.push(item.path);
                }}
              >
                {item.action}
                <ChevronRight className="ml-1 h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
        <br />
        <RecruiterInsightsCard faqs={faqs} />
      </div>

      {/* Right half - PDFCanvas */}
      <div className="flex h-full w-full justify-end overflow-hidden">
        <PDFCanvas resume_url={resume_url} />
      </div>
    </div>
  );
};

export default Sections;
