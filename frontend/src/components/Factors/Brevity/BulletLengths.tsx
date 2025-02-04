"use client";

import React from "react";
import PDFCanvas from "@/components/PDFCanvas/PDFCanvas";
import CircleProgress from "@/components/ProgressTrackers/CircleProgress";
import FeedbackCard from "../../FeedbackCard";
import RecruiterInsightsCard from "../../RecruiterInsightsCard";
const faqs = [
  {
    id: 1,
    question: "What is the ideal length for resume bullet points?",
    answer: `
      The ideal length for resume bullet points is 1-2 lines. Here's why:
      <ul>
        <li><strong>Readability:</strong> Recruiters typically spend 6-7 seconds scanning a resume. Shorter bullets are easier to scan quickly.</li>
        <li><strong>Conciseness:</strong> Short bullets force you to focus on the most important information.</li>
        <li><strong>Impact:</strong> Shorter bullets often have more impact as they get straight to the point.</li>
      </ul>
    `,
  },
  {
    id: 2,
    question: "How can I make my bullet points more concise?",
    answer: `
      Here are some strategies to shorten your bullet points:
      <ul>
        <li><strong>Remove filler words:</strong> Words like "responsible for" or "duties included" add length without value.</li>
        <li><strong>Use strong action verbs:</strong> Start with impactful verbs like "Led", "Created", "Implemented" rather than passive phrases.</li>
        <li><strong>Focus on results:</strong> Cut background information and focus on your achievements and impact.</li>
      </ul>
      Remember: Each word should earn its place on your resume.
    `,
  },
  {
    id: 3,
    question: "Should I use paragraphs instead of bullet points?",
    answer: `
      No, avoid using paragraphs in your resume. Bullet points are preferred because:
      <ul>
        <li>They're easier to scan quickly</li>
        <li>They create clear visual breaks between different achievements</li>
        <li>They force you to be concise and focused</li>
      </ul>
      Paragraphs can make your resume look dense and difficult to read, which might cause recruiters to skip over important information.
    `,
  },
  {
    id: 4,
    question: "How many bullet points should I include per role?",
    answer: `
      The number of bullet points depends on the role's relevance and recency:
      <ul>
        <li><strong>Current/Recent roles:</strong> 4-6 bullet points</li>
        <li><strong>Older roles:</strong> 2-3 bullet points</li>
        <li><strong>Internships/Part-time work:</strong> 2-4 bullet points</li>
      </ul>
      Focus on quality over quantity. Each bullet point should highlight a significant achievement or responsibility.
    `,
  },
];

const explanation = `
  The length of your bullet points plays a crucial role in how effectively your resume communicates your experience. 
  Too long, and recruiters might skip over important details. Too short, and you might not provide enough context 
  about your achievements. The key is finding the right balance - keeping bullets concise while including necessary 
  details about your impact and responsibilities.
`;

const question = "Why is bullet point length important in resumes?";

interface BulletLengthsProps {
  resume_url: string;
  bullet_lengths_score: number;
  bullet_lengths_feedback: string;
}

const BulletLengths: React.FC<BulletLengthsProps> = ({
  resume_url,
  bullet_lengths_score,
  bullet_lengths_feedback,
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
          <CircleProgress score={bullet_lengths_score} />
        </div>
        <br />
        <hr />
        <br />

        {/* The rest of the content below */}
        {/* <p>Quantify Impact feedback: {quantify_impact_feedback}</p> */}
        <FeedbackCard
          explanation={explanation}
          question={question}
          feedback={bullet_lengths_feedback}
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

export default BulletLengths;
