"use client";

import React from "react";
import PDFCanvas from "@/components/PDFCanvas/PDFCanvas";
import CircleProgress from "@/components/ProgressTrackers/CircleProgress";
import FeedbackCard from "../../FeedbackCard";
import RecruiterInsightsCard from "../../RecruiterInsightsCard";
const faqs = [
  {
    id: 1,
    question: "How long should my resume be?",
    answer: `
      The ideal resume length depends on your experience level:
      <ul>
        <li><strong>Entry level/Recent graduates:</strong> 1 page is ideal</li>
        <li><strong>Mid-level professionals (3-10 years):</strong> 1-2 pages</li>
        <li><strong>Senior professionals (10+ years):</strong> 2-3 pages maximum</li>
      </ul>
      Remember, quality is more important than quantity. Each bullet point should add value to your story.
    `,
  },
  {
    id: 2,
    question: "How detailed should my bullet points be?",
    answer: `
      Your bullet points should strike a balance between being detailed and concise:
      <ul>
        <li><strong>Length:</strong> Aim for 1-2 lines per bullet point</li>
        <li><strong>Structure:</strong> Use the Action-Impact format (What you did + Result/Impact)</li>
        <li><strong>Specificity:</strong> Include specific technologies, methodologies, or tools you used</li>
      </ul>
      Avoid vague statements and focus on concrete accomplishments and responsibilities.
    `,
  },
  {
    id: 3,
    question: "What if I don't have enough experience to fill a page?",
    answer: `Consider including these sections to add meaningful content:
      <ul>
        <li><strong>Projects:</strong> Personal or academic projects that demonstrate your skills</li>
        <li><strong>Volunteer work:</strong> Relevant community involvement</li>
        <li><strong>Certifications:</strong> Industry-relevant certifications or courses</li>
        <li><strong>Technical skills:</strong> List of relevant tools and technologies</li>
      </ul>
      Focus on quality over quantity and ensure all content is relevant to your target role.`,
  },
  {
    id: 4,
    question: "How do I know if my resume is too detailed or not detailed enough?",
    answer: `Here are key indicators to assess your resume's detail level:
      <ul>
        <li><strong>Too detailed:</strong> Walls of text, repetitive information, irrelevant details</li>
        <li><strong>Not detailed enough:</strong> Vague statements, missing context, one-word bullet points</li>
      </ul>
      Each bullet point should tell a clear story about what you did and the impact it had. Ask yourself if each detail helps demonstrate your qualifications for the target role.`,
  },
];

const explanation = `
  The length and depth of your resume are crucial factors in effectively communicating your experience to recruiters. A well-balanced resume should be long enough to showcase your relevant experience but concise enough to keep the reader's attention. Each bullet point should provide meaningful detail about your responsibilities and achievements.

  Our analysis shows that resumes that maintain an optimal length and appropriate level of detail are 60% more likely to pass initial screenings.
`;

const question = "Why are resume length and detail level important?";

interface LengthDepthProps {
  resume_url: string;
  length_depth_score: number;
  length_depth_feedback: string;
}

const LengthDepth: React.FC<LengthDepthProps> = ({
  resume_url,
  length_depth_score,
  length_depth_feedback,
}) => {
  return (
    <div className="grid h-screen grid-cols-2">
      {/* Left half */}
      <div className="flex h-full flex-col justify-start overflow-y-auto p-4 [-ms-overflow-style:none] [scrollbar-width:none] hover:[-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
        {/* Row with heading on the left and circle at the far right */}
        <div className="flex w-full items-center justify-between">
          <p className="text-2xl font-semibold text-black dark:text-white">
            Resume Length & Depth
            <p className="mb-4 mt-1 text-sm text-gray-600 dark:text-gray-400">
              Is your resume long enough? Does it go into enough detail?
            </p>
          </p>
          <CircleProgress score={length_depth_score} />
        </div>
        <br />
        <hr />
        <br />

        {/* The rest of the content below */}
        {/* <p>Quantify Impact feedback: {quantify_impact_feedback}</p> */}
        <FeedbackCard
          explanation={explanation}
          question={question}
          feedback={length_depth_feedback}
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

export default LengthDepth;
