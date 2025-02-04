"use client";

import React from "react";
import PDFCanvas from "@/components/PDFCanvas/PDFCanvas";
import CircleProgress from "@/components/ProgressTrackers/CircleProgress";
import FeedbackCard from "../../FeedbackCard";
import RecruiterInsightsCard from "../../RecruiterInsightsCard";
const faqs = [
  {
    id: 1,
    question: "Why are dates important on a resume?",
    answer: `
      Dates on your resume are crucial for several reasons:
      <ul>
        <li><strong>Career progression:</strong> They show your career progression and growth over time</li>
        <li><strong>Relevance:</strong> Recent experience is typically more relevant to employers</li>
        <li><strong>Employment gaps:</strong> Clear dates help explain any gaps in your work history transparently</li>
      </ul>
    `,
  },
  {
    id: 2,
    question: "How should I format dates on my resume?",
    answer: `
      Consistency is key when formatting dates on your resume. Here are best practices:
      <ul>
        <li><strong>Format:</strong> Use either Month/Year (e.g., June 2020) or just years for older positions</li>
        <li><strong>Order:</strong> List experiences in reverse chronological order (most recent first)</li>
        <li><strong>Current positions:</strong> Use "Present" or "Current" for ongoing roles (e.g., June 2020 - Present)</li>
      </ul>
    `,
  },
  {
    id: 3,
    question: "How far back should my resume dates go?",
    answer: `
      Generally, keep your resume focused on recent and relevant experience:
      <ul>
        <li>10-15 years of experience is typically sufficient for senior roles</li>
        <li>Recent graduates should include relevant internships and academic projects</li>
        <li>Only include older experience if highly relevant to the position</li>
      </ul>
    `,
  },
  {
    id: 4,
    question: "How do I handle employment gaps in my dates?",
    answer: `
      Employment gaps should be handled professionally:
      <ul>
        <li>Be honest about gaps - they're more common than you think</li>
        <li>Consider using years only if gaps are small</li>
        <li>If gaps were used for education, freelancing, or skill development, include these activities</li>
      </ul>
    `,
  },
];

const explanation = `
  Dates play a crucial role in your resume as they help recruiters understand your career timeline and progression. 
  Properly formatted dates show your experience level, job stability, and career growth. They also help validate 
  your skills and achievements within specific timeframes.
`;

const question = "How important are dates on your resume?";

interface DatesProps {
  resume_url: string;
  dates_score: number;
  dates_feedback: string;
}
const Dates: React.FC<DatesProps> = ({
  resume_url,
  dates_score,
  dates_feedback,
}) => {
  return (
    <div className="grid h-screen grid-cols-2">
      {/* Left half */}
      <div className="flex h-full flex-col justify-start overflow-y-auto p-4 [-ms-overflow-style:none] [scrollbar-width:none] hover:[-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
        {/* Row with heading on the left and circle at the far right */}
        <div className="flex w-full items-center justify-between">
          <p className="text-2xl font-semibold text-black dark:text-white">
            Quantify Impact
            <p className="mb-4 mt-1 text-sm text-gray-600 dark:text-gray-400">
              Increase your impact by using numbers and metrics in your bullet
              points
            </p>
          </p>
          <CircleProgress score={dates_score} />
        </div>
        <br />
        <hr />
        <br />

        {/* The rest of the content below */}
        {/* <p>Quantify Impact feedback: {quantify_impact_feedback}</p> */}
        <FeedbackCard
          explanation={explanation}
          question={question}
          feedback={dates_feedback}
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

export default Dates;
