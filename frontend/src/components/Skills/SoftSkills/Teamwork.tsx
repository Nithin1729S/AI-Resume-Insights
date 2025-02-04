"use client";

import React from "react";
import PDFCanvas from "@/components/PDFCanvas/PDFCanvas";
import CircleProgress from "@/components/ProgressTrackers/CircleProgress";
import FeedbackCard from "../../FeedbackCard";
import RecruiterInsightsCard from "../../RecruiterInsightsCard";
const faqs = [
  {
    id: 1,
    question: "How can I demonstrate teamwork on my resume?",
    answer: `
      Here are effective ways to showcase your teamwork abilities:
      <ul>
        <li><strong>Use collaboration keywords:</strong> Words like "collaborated," "partnered," "coordinated," and "cross-functional" demonstrate team involvement</li>
        <li><strong>Highlight team achievements:</strong> Show results achieved as part of a team, e.g., "Led 5-person team to complete project 2 weeks ahead of schedule"</li>
        <li><strong>Show leadership in team settings:</strong> Mention instances where you took initiative or led team efforts</li>
      </ul>
    `,
  },
  {
    id: 2,
    question: "What if I have limited team experience?",
    answer: `
      Don't worry! You can highlight teamwork skills from various experiences:
      <ul>
        <li><strong>Academic projects:</strong> Group assignments, research collaborations, study groups</li>
        <li><strong>Volunteer work:</strong> Community service projects, organizing events with others</li>
        <li><strong>Extra-curricular activities:</strong> Sports teams, clubs, student organizations</li>
        <li><strong>Online collaboration:</strong> Remote team projects, virtual group work</li>
      </ul>
    `,
  },
  {
    id: 3,
    question: "What teamwork skills are employers looking for?",
    answer: `
      Key teamwork skills valued by employers include:
      <ul>
        <li><strong>Communication:</strong> Clear and effective interaction with team members</li>
        <li><strong>Conflict resolution:</strong> Ability to handle disagreements professionally</li>
        <li><strong>Reliability:</strong> Being dependable and meeting team commitments</li>
        <li><strong>Adaptability:</strong> Flexibility in working with different personalities and work styles</li>
        <li><strong>Active listening:</strong> Understanding and responding to team members' input</li>
      </ul>
    `,
  },
  {
    id: 4,
    question: "How can I quantify my teamwork achievements?",
    answer: `
      Here are ways to add measurable impact to your team experiences:
      <ul>
        <li><strong>Team size:</strong> "Coordinated with a team of 8 members..."</li>
        <li><strong>Project outcomes:</strong> "Collaborated to increase efficiency by 25%..."</li>
        <li><strong>Timeline achievements:</strong> "Led team to complete project 2 weeks early..."</li>
        <li><strong>Cross-functional scope:</strong> "Worked across 3 departments with 15+ team members..."</li>
      </ul>
    `,
  },
];

const explanation = `
  Effective teamwork is a crucial skill that employers seek in candidates. Your resume should demonstrate your ability to work collaboratively, 
  communicate effectively, and contribute to team success. Strong teamwork examples show how you interact with others to achieve common goals 
  and drive results.
`;

const question = "How well does your resume demonstrate teamwork skills?";

interface TeamWorkProps {
  resume_url: string;
  teamwork_score: number;
  teamwork_feedback: string;
}
const TeamWork: React.FC<TeamWorkProps> = ({
  resume_url,
  teamwork_score,
  teamwork_feedback,
}) => {
  return (
    <div className="grid h-screen grid-cols-2">
      {/* Left half */}
      <div className="flex h-full flex-col justify-start overflow-y-auto p-4 [-ms-overflow-style:none] [scrollbar-width:none] hover:[-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
        {/* Row with heading on the left and circle at the far right */}
        <div className="flex w-full items-center justify-between">
          <p className="text-2xl font-semibold text-black dark:text-white">
            Teamwork
            <p className="mb-4 mt-1 text-sm text-gray-600 dark:text-gray-400">
              Employers want to know if you can work effectively with others to
              achieve common goals
            </p>
          </p>
          <CircleProgress score={teamwork_score} />
        </div>
        <br />
        <hr />
        <br />

        {/* The rest of the content below */}
        {/* <p>Quantify Impact feedback: {quantify_impact_feedback}</p> */}
        <FeedbackCard
          explanation={explanation}
          question={question}
          feedback={teamwork_feedback}
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

export default TeamWork;
