"use client";

import React from "react";
import PDFCanvas from "@/components/PDFCanvas/PDFCanvas";
import CircleProgress from "@/components/ProgressTrackers/CircleProgress";
import FeedbackCard from "../../FeedbackCard";
import RecruiterInsightsCard from "../../RecruiterInsightsCard";

const faqs = [
  {
    id: 1,
    question: "What are weak verbs and why should I avoid them?",
    answer: `
      Weak verbs are generic, passive, or vague action words that don't effectively communicate your achievements. Common examples include:
      <ul>
        <li><strong>Helped:</strong> Instead use "facilitated," "guided," "mentored," or "spearheaded"</li>
        <li><strong>Worked:</strong> Replace with "implemented," "developed," "executed," or "orchestrated"</li>
        <li><strong>Responsible for:</strong> Use active verbs like "managed," "led," "directed," or "coordinated"</li>
      </ul>
      Strong action verbs make your achievements more impactful and demonstrate leadership and initiative.
    `,
  },
  {
    id: 2,
    question: "How do I choose the right action verbs for my resume?",
    answer: `
      Select action verbs that:
      <ul>
        <li><strong>Match your industry:</strong> Use technical verbs for technical roles, creative verbs for creative positions</li>
        <li><strong>Show leadership:</strong> Words like "directed," "managed," "led," "initiated" demonstrate authority</li>
        <li><strong>Demonstrate results:</strong> Use verbs like "increased," "reduced," "improved," "accelerated" to show impact</li>
        <li><strong>Are specific:</strong> Instead of "did research," use "analyzed," "investigated," or "evaluated"</li>
      </ul>
      Always choose verbs that accurately represent your level of involvement and the scope of your responsibilities.
    `,
  },
  {
    id: 3,
    question: "What are some strong action verbs for different roles?",
    answer: `
      Here are some powerful verbs by category:
      <ul>
        <li><strong>Management:</strong> Directed, Orchestrated, Spearheaded, Streamlined</li>
        <li><strong>Technical:</strong> Engineered, Programmed, Automated, Optimized</li>
        <li><strong>Creative:</strong> Designed, Conceptualized, Pioneered, Transformed</li>
        <li><strong>Analysis:</strong> Analyzed, Evaluated, Researched, Investigated</li>
        <li><strong>Communication:</strong> Negotiated, Presented, Influenced, Advocated</li>
      </ul>
    `,
  },
  {
    id: 4,
    question: "How can I make my resume bullets more dynamic?",
    answer: `
      To create more impactful resume bullets:
      <ul>
        <li><strong>Start with strong verbs:</strong> Begin each bullet with a powerful action verb</li>
        <li><strong>Be specific:</strong> Include details about how you accomplished something</li>
        <li><strong>Show results:</strong> Combine strong verbs with measurable outcomes</li>
        <li><strong>Avoid passive voice:</strong> Use active voice to show direct responsibility</li>
      </ul>
      Example transformation:
      Weak: "Was responsible for helping with project management"
      Strong: "Spearheaded 3 cross-functional projects, reducing delivery time by 25%"
    `,
  },
];

const explanation = `
  Strong action verbs are crucial for making your resume stand out. They demonstrate leadership, initiative, and concrete results. 
  Weak verbs like "helped," "worked," or "was responsible for" can make your achievements sound passive and unimpressive. 
  By using powerful action verbs, you can better convey your impact and capabilities to potential employers.
`;

const question = "Why are strong action verbs important in resumes?";

interface WeakVerbsProps {
  resume_url: string;
  weak_verbs_score: number;
  weak_verbs_feedback: string;
}

const WeakVerbs: React.FC<WeakVerbsProps> = ({
  resume_url,
  weak_verbs_score,
  weak_verbs_feedback,
}) => {
  return (
    <div className="grid h-screen grid-cols-2">
      {/* Left half */}
      <div className="flex h-full flex-col justify-start overflow-y-auto p-4 [-ms-overflow-style:none] [scrollbar-width:none] hover:[-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
        {/* Row with heading on the left and circle at the far right */}
        <div className="flex w-full items-center justify-between">
          <p className="text-2xl font-semibold text-black dark:text-white">
          Weak Action Verbs
            <p className="mb-4 mt-1 text-sm text-gray-600 dark:text-gray-400">
            Swap weak language with strong, compelling action verbs
            </p>
          </p>
          <CircleProgress score={weak_verbs_score} />
        </div>
        <br />
        <hr />
        <br />

        {/* The rest of the content below */}
        {/* <p>Quantify Impact feedback: {quantify_impact_feedback}</p> */}
        <FeedbackCard
          explanation={explanation}
          question={question}
          feedback={weak_verbs_feedback}
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

export default WeakVerbs;
