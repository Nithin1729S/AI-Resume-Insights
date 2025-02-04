"use client";

import React from "react";
import PDFCanvas from "@/components/PDFCanvas/PDFCanvas";
import CircleProgress from "@/components/ProgressTrackers/CircleProgress";
import FeedbackCard from "../../FeedbackCard";
import RecruiterInsightsCard from "../../RecruiterInsightsCard";

const faqs = [
  {
    id: 1,
    question: "Why is consistency important in a resume?",
    answer: `
      Consistency in your resume is crucial for several reasons:
      <ul>
        <li><strong>Professionalism:</strong> A consistent format shows attention to detail and professionalism</li>
        <li><strong>Readability:</strong> Consistent formatting makes it easier for recruiters to scan your resume quickly</li>
        <li><strong>ATS Optimization:</strong> Consistent formatting helps Applicant Tracking Systems parse your resume more accurately</li>
      </ul>
    `,
  },
  {
    id: 2,
    question: "What elements should be consistent in my resume?",
    answer: `
      Several key elements need to maintain consistency throughout your resume:
      <ul>
        <li><strong>Bullet Points:</strong> Use the same punctuation style and format</li>
        <li><strong>Verb Tense:</strong> Use past tense for past roles and present tense for current roles</li>
        <li><strong>Date Format:</strong> Stick to one format (MM/YYYY or Month Year)</li>
        <li><strong>Font Style and Size:</strong> Use the same font and sizing hierarchy throughout</li>
      </ul>
    `,
  },
  {
    id: 3,
    question: "How do I maintain consistency in bullet point formatting?",
    answer: `
      To maintain consistent bullet points:
      <ul>
        <li>Start each bullet with an action verb</li>
        <li>Use the same punctuation style (period or no period)</li>
        <li>Keep similar length and structure</li>
        <li>Maintain parallel grammar structure</li>
      </ul>
      For example, if you use periods at the end of one bullet point, use them for all bullet points.
    `,
  },
  {
    id: 4,
    question: "What are common consistency mistakes to avoid?",
    answer: `
      Watch out for these common consistency errors:
      <ul>
        <li><strong>Mixed Tenses:</strong> Switching between past and present tense inconsistently</li>
        <li><strong>Varying Formats:</strong> Different date formats or spacing throughout the resume</li>
        <li><strong>Inconsistent Capitalization:</strong> Mixing title case and sentence case</li>
        <li><strong>Different Bullet Styles:</strong> Using different symbols or punctuation for bullet points</li>
      </ul>
    `,
  },
];

const explanation = `
  Consistency in your resume is a key indicator of attention to detail and professionalism. 
  When formatting elements like bullet points, dates, and spacing remain consistent throughout your resume, 
  it becomes easier for recruiters to read and understand your experience. Inconsistencies can distract 
  from your achievements and may give the impression of carelessness.
`;

const question = "Why does consistency matter in my resume?";

interface ConsistencyProps {
  resume_url: string;
  consistency_score: number;
  consistency_feedback: string;
}

const Consistency: React.FC<ConsistencyProps> = ({
  resume_url,
  consistency_score,
  consistency_feedback,
}) => {
  return (
    <div className="grid h-screen grid-cols-2">
      {/* Left half */}
      <div className="flex h-full flex-col justify-start overflow-y-auto p-4 [-ms-overflow-style:none] [scrollbar-width:none] hover:[-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
        {/* Row with heading on the left and circle at the far right */}
        <div className="flex w-full items-center justify-between">
          <p className="text-2xl font-semibold text-black dark:text-white">
            Consistency
            <p className="mb-4 mt-1 text-sm text-gray-600 dark:text-gray-400">
              Ensure your bullet points are consistent in punctuation and
              formatting
            </p>
          </p>
          <CircleProgress score={consistency_score} />
        </div>
        <br />
        <hr />
        <br />

        {/* The rest of the content below */}
        {/* <p>Quantify Impact feedback: {quantify_impact_feedback}</p> */}
        <FeedbackCard
          explanation={explanation}
          question={question}
          feedback={consistency_feedback}
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

export default Consistency;
