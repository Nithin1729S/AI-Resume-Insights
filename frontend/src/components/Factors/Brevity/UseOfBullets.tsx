"use client";

import React from "react";
import PDFCanvas from "@/components/PDFCanvas/PDFCanvas";
import CircleProgress from "@/components/ProgressTrackers/CircleProgress";
import FeedbackCard from "../../FeedbackCard";
import RecruiterInsightsCard from "../../RecruiterInsightsCard";

const faqs = [
  {
    id: 1,
    question: "Why should I use bullet points in my resume?",
    answer: `
      Bullet points are essential in resumes for several reasons:
      <ul>
        <li><strong>Readability:</strong> They make your resume easier to scan quickly</li>
        <li><strong>Organization:</strong> They help structure information in a clear, logical way</li>
        <li><strong>Impact:</strong> They allow you to highlight key achievements more effectively</li>
        <li><strong>Space efficiency:</strong> They help you convey more information in less space</li>
      </ul>
    `,
  },
  {
    id: 2,
    question: "How many bullet points should I use per job/experience?",
    answer: `
      The ideal number of bullet points varies depending on your experience level and the role's importance:
      <ul>
        <li><strong>Recent/Current Role:</strong> 4-6 bullet points</li>
        <li><strong>Previous Roles:</strong> 2-4 bullet points</li>
        <li><strong>Internships/Part-time:</strong> 2-3 bullet points</li>
      </ul>
      Remember: Quality over quantity. Each bullet point should highlight a significant achievement or responsibility.
    `,
  },
  {
    id: 3,
    question: "How should I format my bullet points?",
    answer: `<p>
      Best practices for formatting bullet points include:
      <ul>
        <li>Start with strong action verbs (e.g., "Developed," "Led," "Implemented")</li>
        <li>Keep each point to 1-2 lines maximum</li>
        <li>Focus on achievements rather than just duties</li>
        <li>Use consistent punctuation</li>
        <li>Maintain parallel structure across all points</li>
      </ul>
      Avoid using complete sentences or paragraphs - bullet points should be concise and impactful.</p>`,
  },
  {
    id: 4,
    question: "What common mistakes should I avoid with bullet points?",
    answer: `<p>
      Common mistakes to avoid:
      <ul>
        <li>Using full paragraphs instead of bullet points</li>
        <li>Making bullets too long or detailed</li>
        <li>Starting with weak or passive language</li>
        <li>Including irrelevant information</li>
        <li>Being too vague or general</li>
        <li>Using inconsistent formatting</li>
      </ul>
      Remember that bullet points should be clear, concise, and focused on your achievements.</p>`,
  },
];

const explanation = `
    Bullet points are crucial for making your resume readable and impactful. Recruiters typically spend only 6-7 seconds scanning a resume initially, and well-structured bullet points help them quickly identify key information. Using paragraphs instead of bullets can make your resume appear dense and difficult to read, potentially causing recruiters to miss important details about your experience.
  `;

const question = "Why are bullet points important in a resume?";


interface UseOfBulletsProps{
  resume_url:string;
  use_of_bullets_score:number;
  use_of_bullets_feedback:string;
}

const UseOfBullets: React.FC<UseOfBulletsProps> = ({
  resume_url,
  use_of_bullets_score,
  use_of_bullets_feedback,
}) => {
  return (
    <div className="grid h-screen grid-cols-2">
      {/* Left half */}
      <div className="flex h-full flex-col justify-start overflow-y-auto p-4 [-ms-overflow-style:none] [scrollbar-width:none] hover:[-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
        {/* Row with heading on the left and circle at the far right */}
        <div className="flex w-full items-center justify-between">
          <p className="text-2xl font-semibold text-black dark:text-white">
          Use of bullet points
            <p className="mb-4 mt-1 text-sm text-gray-600 dark:text-gray-400">
            Avoid using paragraphs. Use bullet points instead.
            </p>
          </p>
          <CircleProgress score={use_of_bullets_score} />
        </div>
        <br />
        <hr />
        <br />

        {/* The rest of the content below */}
        {/* <p>Quantify Impact feedback: {quantify_impact_feedback}</p> */}
        <FeedbackCard
          explanation={explanation}
          question={question}
          feedback={use_of_bullets_feedback}
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

export default UseOfBullets;
