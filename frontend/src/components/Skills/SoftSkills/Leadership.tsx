"use client";

import React from "react";
import PDFCanvas from "@/components/PDFCanvas/PDFCanvas";
import CircleProgress from "@/components/ProgressTrackers/CircleProgress";
import FeedbackCard from "../../FeedbackCard";
import RecruiterInsightsCard from "../../RecruiterInsightsCard";

const faqs = [
  {
    id: 1,
    question: "How can I demonstrate leadership if I haven't had a management role?",
    answer: `
      Leadership isn't just about formal management positions. Here are ways to showcase leadership:
      <ul>
        <li><strong>Project Leadership:</strong> Highlight instances where you led projects or initiatives, even without formal authority</li>
        <li><strong>Team Collaboration:</strong> Describe situations where you guided team members or coordinated group efforts</li>
        <li><strong>Initiative Taking:</strong> Showcase times when you identified problems and led solutions</li>
        <li><strong>Mentoring:</strong> Include examples of helping or training others, even informally</li>
      </ul>
    `,
  },
  {
    id: 2,
    question: "What leadership skills should I emphasize on my resume?",
    answer: `
      Focus on demonstrating these key leadership qualities through your experiences:
      <ul>
        <li><strong>Decision Making:</strong> Show examples of making important decisions and their outcomes</li>
        <li><strong>Communication:</strong> Highlight how you've effectively communicated with different stakeholders</li>
        <li><strong>Problem Solving:</strong> Describe situations where you led problem-solving efforts</li>
        <li><strong>Team Building:</strong> Include examples of building or improving team dynamics</li>
        <li><strong>Change Management:</strong> Demonstrate how you've led or adapted to changes</li>
      </ul>
    `,
  },
  {
    id: 3,
    question: "How do I write leadership accomplishments effectively?",
    answer: `
      Use the STAR method to structure your leadership achievements:
      <ul>
        <li><strong>Situation:</strong> Briefly describe the context</li>
        <li><strong>Task:</strong> Explain what needed to be done</li>
        <li><strong>Action:</strong> Detail the leadership actions you took</li>
        <li><strong>Result:</strong> Quantify the impact where possible (e.g., "Led a team of 5 to increase productivity by 25%")</li>
      </ul>
    `,
  },
  {
    id: 4,
    question: "What common leadership mistakes should I avoid on my resume?",
    answer: `
      Avoid these common pitfalls when showcasing leadership:
      <ul>
        <li><strong>Being Vague:</strong> Use specific examples instead of generic statements</li>
        <li><strong>Overstating:</strong> Be honest about your role and contributions</li>
        <li><strong>Focusing Only on Titles:</strong> Emphasize actions and results over position names</li>
        <li><strong>Neglecting Soft Skills:</strong> Include examples of emotional intelligence and people skills</li>
      </ul>
    `,
  },
];

const explanation = `
    Leadership skills are crucial in today's workplace, regardless of your position. Strong leadership qualities show employers that you can take initiative, guide others, and drive results. Even without formal management experience, you can demonstrate leadership through project coordination, team collaboration, and problem-solving initiatives.
  `;

const question = "How do I effectively showcase leadership qualities in my resume?";

interface LeadershipProps {
  resume_url: string;
  leadership_score: number;
  leadership_feedback: string;
}
const Leadership: React.FC<LeadershipProps> = ({
  resume_url,
  leadership_score,
  leadership_feedback,
}) => {
  return (
    <div className="grid h-screen grid-cols-2">
      {/* Left half */}
      <div className="flex h-full flex-col justify-start overflow-y-auto p-4 [-ms-overflow-style:none] [scrollbar-width:none] hover:[-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
        {/* Row with heading on the left and circle at the far right */}
        <div className="flex w-full items-center justify-between">
          <p className="text-2xl font-semibold text-black dark:text-white">
            Leadership
            <p className="mb-4 mt-1 text-sm text-gray-600 dark:text-gray-400">
              Employers want to know if you can own a project, manage a team and
              take responsibility
            </p>
          </p>
          <CircleProgress score={leadership_score} />
        </div>
        <br />
        <hr />
        <br />

        {/* The rest of the content below */}
        {/* <p>Quantify Impact feedback: {quantify_impact_feedback}</p> */}
        <FeedbackCard
          explanation={explanation}
          question={question}
          feedback={leadership_feedback}
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

export default Leadership;
