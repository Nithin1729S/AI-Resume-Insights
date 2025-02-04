"use client";

import React from "react";
import PDFCanvas from "@/components/PDFCanvas/PDFCanvas";
import CircleProgress from "@/components/ProgressTrackers/CircleProgress";
import FeedbackCard from "../../FeedbackCard";
import RecruiterInsightsCard from "../../RecruiterInsightsCard";

const faqs = [
  {
    id: 1,
    question: "What sections should I remove from my resume?",
    answer: `
      Here are common sections that are generally considered unnecessary:
      <ul>
        <li><strong>Objective Statements:</strong> These are outdated and take up valuable space. Your career goals should be covered in your cover letter.</li>
        <li><strong>References Available Upon Request:</strong> This is assumed and doesn't need to be stated.</li>
        <li><strong>Hobbies/Interests:</strong> Unless directly relevant to the job, these usually don't add value to your application.</li>
        <li><strong>High School Information:</strong> Once you have college experience, remove high school details.</li>
      </ul>
    `,
  },
  {
    id: 2,
    question: "When should I include personal interests on my resume?",
    answer: `
      Personal interests should only be included if they:
      <ul>
        <li><strong>Demonstrate relevant skills:</strong> For example, running a gaming blog could be relevant for a content writing position.</li>
        <li><strong>Show leadership:</strong> Like organizing community events or leading a sports team.</li>
        <li><strong>Align with company culture:</strong> If applying to a fitness company, mentioning your marathon running could be beneficial.</li>
      </ul>
      Otherwise, this space is better used for professional experiences and skills.
    `,
  },
  {
    id: 3,
    question: "How do I know if a section is unnecessary?",
    answer: `
      Ask yourself these questions:
      <ul>
        <li>Does this information help demonstrate my qualifications for this specific role?</li>
        <li>Is this information recent and relevant to my career goals?</li>
        <li>Could this space be better used for more important information?</li>
        <li>Would a recruiter care about this information?</li>
      </ul>
      If you answer "no" to any of these, consider removing the section.
    `,
  },
  {
    id: 4,
    question: "What should I focus on instead of unnecessary sections?",
    answer: `
      Focus on these key sections:
      <ul>
        <li><strong>Professional Experience:</strong> Relevant work history with quantifiable achievements</li>
        <li><strong>Skills:</strong> Technical and soft skills pertinent to the role</li>
        <li><strong>Education:</strong> Relevant degrees and certifications</li>
        <li><strong>Projects:</strong> Significant work that demonstrates your capabilities</li>
      </ul>
      Remember: Every section should directly support your candidacy for the specific role you're applying to.
    `,
  },
];

const explanation = `
  Modern resumes should be concise and focused, typically fitting on one page for most professionals. Unnecessary sections can dilute the impact of your important qualifications and achievements. By removing outdated or irrelevant sections, you create space for more meaningful content that directly addresses what employers are looking for.
`;

const question = "Which sections should I remove from my resume?";

interface UnnecessarySectionsProps {
  resume_url: string;
  unnecessary_sections_score: number;
  unnecessary_sections_feedback: string;
}
const UnnecessarySections: React.FC<UnnecessarySectionsProps> = ({
  resume_url,
  unnecessary_sections_score,
  unnecessary_sections_feedback,
}) => {
  return (
    <div className="grid h-screen grid-cols-2">
      {/* Left half */}
      <div className="flex h-full flex-col justify-start overflow-y-auto p-4 [-ms-overflow-style:none] [scrollbar-width:none] hover:[-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
        {/* Row with heading on the left and circle at the far right */}
        <div className="flex w-full items-center justify-between">
          <p className="text-2xl font-semibold text-black dark:text-white">
            Unnecessary sections
            <p className="mb-4 mt-1 text-sm text-gray-600 dark:text-gray-400">
              These sections are outdated and should be removed from your resume
            </p>
          </p>
          <CircleProgress score={unnecessary_sections_score} />
        </div>
        <br />
        <hr />
        <br />

        {/* The rest of the content below */}
        {/* <p>Quantify Impact feedback: {quantify_impact_feedback}</p> */}
        <FeedbackCard
          explanation={explanation}
          question={question}
          feedback={unnecessary_sections_feedback}
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

export default UnnecessarySections;
