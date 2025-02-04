"use client";

import React from "react";
import PDFCanvas from "@/components/PDFCanvas/PDFCanvas";
import CircleProgress from "@/components/ProgressTrackers/CircleProgress";
import FeedbackCard from "../../FeedbackCard";
import RecruiterInsightsCard from "../../RecruiterInsightsCard";

const faqs = [
  {
    id: 1,
    question: "How can I demonstrate communication skills on my resume?",
    answer: `
      Here are effective ways to showcase your communication abilities:
      <ul>
        <li><strong>Action verbs:</strong> Use words like 'presented', 'negotiated', 'collaborated', 'influenced', and 'facilitated' to demonstrate communication skills</li>
        <li><strong>Project examples:</strong> Highlight instances where you led meetings, gave presentations, or wrote important documentation</li>
        <li><strong>Results:</strong> Quantify your communication wins, e.g., "Presented to audiences of 50+ people" or "Wrote documentation that reduced support tickets by 30%"</li>
      </ul>
    `,
  },
  {
    id: 2,
    question: "What communication skills are employers looking for?",
    answer: `
      Key communication skills valued by employers include:
      <ul>
        <li><strong>Written communication:</strong> Clear emails, reports, and documentation</li>
        <li><strong>Verbal communication:</strong> Presentation skills, meeting facilitation, team discussions</li>
        <li><strong>Active listening:</strong> Understanding and responding to others' needs</li>
        <li><strong>Cross-functional collaboration:</strong> Working effectively with different departments</li>
      </ul>
      Remember to provide specific examples of how you've demonstrated these skills in your previous roles.
    `,
  },
  {
    id: 3,
    question: "I work in a technical role. How do I show communication skills?",
    answer: `<p>
      Technical roles require strong communication skills too. Here's how to showcase them:
      <ul>
        <li>Highlight how you explained complex technical concepts to non-technical stakeholders</li>
        <li>Describe documentation you've written for systems or processes</li>
        <li>Mention cross-team collaborations and technical presentations</li>
        <li>Include examples of mentoring or training others</li>
      </ul>
    </p>`,
  },
  {
    id: 4,
    question: "How can I improve the communication section of my resume?",
    answer: `<p>
      To strengthen your communication skills on your resume:
      <ul>
        <li>Use specific examples instead of generic statements</li>
        <li>Quantify your achievements where possible (e.g., "Led weekly meetings with 15+ team members")</li>
        <li>Include both internal and external communication examples</li>
        <li>Highlight different communication channels you're proficient in (written, verbal, digital)</li>
      </ul>
      Remember to tailor your examples to the job you're applying for.</p>`,
  },
];

const explanation = `
    Strong communication skills are consistently ranked as one of the most important qualities employers seek. Whether you're dealing with clients, collaborating with team members, or presenting to stakeholders, your ability to communicate effectively can make or break your professional success. Let's analyze your resume to see how well you're showcasing these crucial skills.
  `;

const question = "How effectively does your resume demonstrate your communication skills?";

interface CommunicationProps {
  resume_url: string;
  communication_score: number;
  communication_feedback: string;
}

const Communication: React.FC<CommunicationProps> = ({
  resume_url,
  communication_score,
  communication_feedback,
}) => {
  return (
    <div className="grid h-screen grid-cols-2">
      {/* Left half */}
      <div className="flex h-full flex-col justify-start overflow-y-auto p-4 [-ms-overflow-style:none] [scrollbar-width:none] hover:[-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
        {/* Row with heading on the left and circle at the far right */}
        <div className="flex w-full items-center justify-between">
          <p className="text-2xl font-semibold text-black dark:text-white">
            Communication
            <p className="mb-4 mt-1 text-sm text-gray-600 dark:text-gray-400">
              Employers want someone that can clearly communicate with anyone
              the job requires them to - whether that is a key stakeholder, team
              member or client.
            </p>
          </p>
          <CircleProgress score={communication_score} />
        </div>
        <br />
        <hr />
        <br />

        {/* The rest of the content below */}
        {/* <p>Quantify Impact feedback: {quantify_impact_feedback}</p> */}
        <FeedbackCard
          explanation={explanation}
          question={question}
          feedback={communication_feedback}
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

export default Communication;
