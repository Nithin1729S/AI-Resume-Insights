"use client";

import React from "react";
import PDFCanvas from "@/components/PDFCanvas/PDFCanvas";
import CircleProgress from "@/components/ProgressTrackers/CircleProgress";
import FeedbackCard from "../../FeedbackCard";
import RecruiterInsightsCard from "../../RecruiterInsightsCard";

const faqs = [
  {
    id: 1,
    question: "How should I format my skills section?",
    answer: `
      Here are key tips for formatting your skills section effectively:
      <ul>
        <li><strong>Group related skills:</strong> Organize skills into categories like Technical Skills, Soft Skills, Languages, etc.</li>
        <li><strong>Prioritize relevant skills:</strong> List the most important skills for the job first</li>
        <li><strong>Be specific:</strong> Instead of just "Programming", list specific languages like "Python, JavaScript, Java"</li>
        <li><strong>Keep it concise:</strong> List 8-12 key skills that are most relevant to your target role</li>
      </ul>
    `,
  },
  {
    id: 2,
    question: "Which skills should I include on my resume?",
    answer: `
      Focus on including skills that are:
      <ul>
        <li><strong>Relevant to the job:</strong> Review job descriptions and include matching skills</li>
        <li><strong>Verifiable:</strong> Skills you can demonstrate through work experience or projects</li>
        <li><strong>In-demand:</strong> Current technical skills and tools used in your industry</li>
        <li><strong>Balanced:</strong> Mix of technical/hard skills and soft skills</li>
      </ul>
      Remember to tailor your skills section for each job application to match the specific requirements.
    `,
  },
  {
    id: 3,
    question: "Should I include skill levels or ratings?",
    answer: `
      The topic of skill ratings (like "Python - Expert" or "5/5 stars") is debated among recruiters. Here's what to consider:
      <ul>
        <li>Only rate skills if you can defend your rating in an interview</li>
        <li>Use clear descriptors like "Proficient", "Advanced", "Basic" rather than numbers</li>
        <li>Consider simply listing skills without ratings - this is often preferred by recruiters</li>
      </ul>
      Focus more on demonstrating skills through your work experience than arbitrary ratings.
    `,
  },
  {
    id: 4,
    question: "What are the most important soft skills to include?",
    answer: `
      Key soft skills valued by employers include:
      <ul>
        <li><strong>Communication:</strong> Written and verbal communication abilities</li>
        <li><strong>Leadership:</strong> Team management and project leadership</li>
        <li><strong>Problem-solving:</strong> Critical thinking and analytical skills</li>
        <li><strong>Collaboration:</strong> Team work and cross-functional cooperation</li>
        <li><strong>Time management:</strong> Organization and prioritization abilities</li>
      </ul>
      Remember to demonstrate these skills through specific examples in your work experience section.
    `,
  },
];

const explanation = `
  Your skills section is crucial for passing applicant tracking systems (ATS) and catching recruiters' attention. 
  A well-organized skills section shows employers at a glance what you can bring to their organization. 
  Focus on relevant, specific skills and ensure they align with your work experience.
`;

const question = "How can I make my skills section more effective?";

interface SkillsProps{
  resume_url:string;
  skills_score: number;
  skills_feedback: string;
}
const Skills: React.FC<SkillsProps> = ({
  resume_url,
  skills_score,
  skills_feedback,
}) => {
  return (
    <div className="grid h-screen grid-cols-2">
      {/* Left half */}
      <div className="flex h-full flex-col justify-start overflow-y-auto p-4 [-ms-overflow-style:none] [scrollbar-width:none] hover:[-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
        {/* Row with heading on the left and circle at the far right */}
        <div className="flex w-full items-center justify-between">
          <p className="text-2xl font-semibold text-black dark:text-white">
            Skills
            <p className="mb-4 mt-1 text-sm text-gray-600 dark:text-gray-400">
            Here's how to make sure your skills section is effective
            </p>
          </p>
          <CircleProgress score={skills_score} />
        </div>
        <br />
        <hr />
        <br />

        {/* The rest of the content below */}
        {/* <p>Quantify Impact feedback: {quantify_impact_feedback}</p> */}
        <FeedbackCard
          explanation={explanation}
          question={question}
          feedback={skills_feedback}
        />
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

export default Skills;
