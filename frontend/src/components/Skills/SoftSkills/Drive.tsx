"use client";

import React from "react";
import PDFCanvas from "@/components/PDFCanvas/PDFCanvas";
import CircleProgress from "@/components/ProgressTrackers/CircleProgress";
import FeedbackCard from "../../FeedbackCard";
import RecruiterInsightsCard from "../../RecruiterInsightsCard";

const faqs = [
  {
    id: 1,
    question: "How can I demonstrate drive and initiative on my resume?",
    answer: `
      Here are effective ways to showcase drive and initiative:
      <ul>
        <li><strong>Leadership roles:</strong> Highlight situations where you took charge without being asked</li>
        <li><strong>Self-started projects:</strong> Describe projects you initiated on your own</li>
        <li><strong>Learning initiatives:</strong> Showcase self-learning, certifications, or skills you acquired independently</li>
        <li><strong>Problem-solving examples:</strong> Include instances where you identified and solved problems proactively</li>
      </ul>
    `,
  },
  {
    id: 2,
    question: "What keywords show drive and initiative?",
    answer: `
      Using the right action words can effectively communicate your drive. Consider using:
      <ul>
        <li><strong>Initiated:</strong> Shows you start things independently</li>
        <li><strong>Spearheaded:</strong> Demonstrates leadership and initiative</li>
        <li><strong>Pioneered:</strong> Shows you're first to try new approaches</li>
        <li><strong>Launched:</strong> Indicates you bring ideas to life</li>
        <li><strong>Established:</strong> Shows you create new processes/systems</li>
      </ul>
    `,
  },
  {
    id: 3,
    question: "How can I show persistence in my resume?",
    answer: `
      Persistence is a key component of drive. Here's how to demonstrate it:
      <ul>
        <li>Highlight long-term projects you saw through to completion</li>
        <li>Describe obstacles you overcame to achieve goals</li>
        <li>Include examples of gradual improvements you made over time</li>
        <li>Showcase consistent performance improvements</li>
      </ul>
    `,
  },
  {
    id: 4,
    question: "What if I don't have obvious examples of initiative?",
    answer: `
      Everyone has examples of initiative, you just need to identify them:
      <ul>
        <li>Think about times you volunteered for extra responsibilities</li>
        <li>Consider situations where you identified and fixed inefficiencies</li>
        <li>Include examples of self-directed learning or skill development</li>
        <li>Highlight instances where you helped others without being asked</li>
      </ul>
    `,
  },
];

const explanation = `
  Drive and initiative are crucial qualities that employers look for in candidates. They indicate that you're self-motivated, 
  take ownership of your work, and can identify and solve problems independently. Your resume should demonstrate these qualities 
  through specific examples and achievements that show you're proactive rather than reactive in your approach to work.
`;

const question = "How do I demonstrate drive and initiative in my resume?";

interface DriveProps {
  resume_url: string;
  drive_score: number;
  drive_feedback: string;
}
const Drive: React.FC<DriveProps> = ({
  resume_url,
  drive_score,
  drive_feedback,
}) => {
  return (
    <div className="grid h-screen grid-cols-2">
      {/* Left half */}
      <div className="flex h-full flex-col justify-start overflow-y-auto p-4 [-ms-overflow-style:none] [scrollbar-width:none] hover:[-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
        {/* Row with heading on the left and circle at the far right */}
        <div className="flex w-full items-center justify-between">
          <p className="text-2xl font-semibold text-black dark:text-white">
            Drive and Initiative
            <p className="mb-4 mt-1 text-sm text-gray-600 dark:text-gray-400">
            Employees who show strong initiative are characterized by their proactivity, self-starting nature and persistence in solving difficult problems.
            </p>
          </p>
          <CircleProgress score={drive_score} />
        </div>
        <br />
        <hr />
        <br />

        {/* The rest of the content below */}
        {/* <p>Quantify Impact feedback: {quantify_impact_feedback}</p> */}
        <FeedbackCard
          explanation={explanation}
          question={question}
          feedback={drive_feedback}
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

export default Drive;
