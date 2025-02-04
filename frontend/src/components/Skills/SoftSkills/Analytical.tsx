"use client";

import React from "react";
import PDFCanvas from "@/components/PDFCanvas/PDFCanvas";
import CircleProgress from "@/components/ProgressTrackers/CircleProgress";
import FeedbackCard from "../../FeedbackCard";
import RecruiterInsightsCard from "../../RecruiterInsightsCard";

const faqs = [
  {
    id: 1,
    question: "How can I demonstrate analytical skills on my resume?",
    answer: `
      Here are effective ways to showcase your analytical abilities:
      <ul>
        <li><strong>Problem-Solution Format:</strong> Structure achievements as "Identified [problem], analyzed [data/situation], implemented [solution], resulting in [outcome]"</li>
        <li><strong>Data Analysis:</strong> Highlight any experience with data analysis, research, or complex problem-solving</li>
        <li><strong>Technical Tools:</strong> Mention specific analytical tools you've used (Excel, SQL, Python, PowerBI, etc.)</li>
        <li><strong>Decision Making:</strong> Include examples where your analysis led to important decisions or improvements</li>
      </ul>
    `,
  },
  {
    id: 2,
    question: "What analytical skills should I emphasize in my resume?",
    answer: `
      Key analytical skills valued by employers include:
      <ul>
        <li><strong>Data Analysis:</strong> Ability to collect, interpret and visualize data</li>
        <li><strong>Critical Thinking:</strong> Evaluating situations objectively and making logical decisions</li>
        <li><strong>Research:</strong> Finding and validating information from multiple sources</li>
        <li><strong>Problem Solving:</strong> Identifying issues and developing effective solutions</li>
        <li><strong>Process Improvement:</strong> Analyzing workflows and suggesting optimizations</li>
      </ul>
    `,
  },
  {
    id: 3,
    question: "I'm not in a technical role. How do I show analytical skills?",
    answer: `
      Analytical skills aren't just for technical roles. Here's how to highlight them:
      <ul>
        <li><strong>Process Improvements:</strong> Describe how you analyzed and improved workflows</li>
        <li><strong>Decision Making:</strong> Highlight situations where you evaluated options and made informed choices</li>
        <li><strong>Project Planning:</strong> Show how you break down complex tasks and organize resources</li>
        <li><strong>Problem Resolution:</strong> Describe how you tackle challenges systematically</li>
      </ul>
    `,
  },
  {
    id: 4,
    question: "What action verbs showcase analytical abilities?",
    answer: `
      Use these powerful action verbs to demonstrate analytical skills:
      <ul>
        <li><strong>Analysis verbs:</strong> Analyzed, Evaluated, Assessed, Researched, Investigated</li>
        <li><strong>Problem-solving verbs:</strong> Solved, Improved, Optimized, Streamlined, Enhanced</li>
        <li><strong>Data-focused verbs:</strong> Calculated, Quantified, Measured, Tracked, Monitored</li>
        <li><strong>Decision verbs:</strong> Determined, Identified, Recommended, Strategized, Implemented</li>
      </ul>
    `,
  },
];

const explanation = `
  Analytical skills are crucial in today's data-driven workplace. They show employers that you can think critically, solve complex problems, and make informed decisions. Your resume should demonstrate these abilities through specific examples and achievements that showcase how you've used analytical thinking to drive results.
`;

const question = "How important are analytical skills in a resume?";

interface AnalyticalProps {
  resume_url: string;
  analytical_score: number;
  analytical_feedback: string;
}
const Analytical: React.FC<AnalyticalProps> = ({
  resume_url,
  analytical_score,
  analytical_feedback,
}) => {
  return (
    <div className="grid h-screen grid-cols-2">
      {/* Left half */}
      <div className="flex h-full flex-col justify-start overflow-y-auto p-4 [-ms-overflow-style:none] [scrollbar-width:none] hover:[-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
        {/* Row with heading on the left and circle at the far right */}
        <div className="flex w-full items-center justify-between">
          <p className="text-2xl font-semibold text-black dark:text-white">
            Analytical and Problem-solving
            <p className="mb-4 mt-1 text-sm text-gray-600 dark:text-gray-400">
              Analytical skills refer to your ability to break down complex
              problems, evaluate them effectively, and come up with appropriate
              solutions.
            </p>
          </p>
          <CircleProgress score={analytical_score} />
        </div>
        <br />
        <hr />
        <br />

        {/* The rest of the content below */}
        {/* <p>Quantify Impact feedback: {quantify_impact_feedback}</p> */}
        <FeedbackCard
          explanation={explanation}
          question={question}
          feedback={analytical_feedback}
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

export default Analytical;
