"use client";

import React from "react";
import PDFCanvas from "@/components/PDFCanvas/PDFCanvas";
import CircleProgress from "@/components/ProgressTrackers/CircleProgress";
import FeedbackCard from "../../FeedbackCard";
import RecruiterInsightsCard from "../../RecruiterInsightsCard";

const faqs = [
  {
    id: 1,
    question: "Why is verb tense consistency important in resumes?",
    answer: `
      Consistent verb tenses in your resume are crucial because:
      <ul>
        <li><strong>Current Role:</strong> Use present tense for ongoing responsibilities and achievements in your current position</li>
        <li><strong>Past Roles:</strong> Use past tense for completed work and previous positions</li>
        <li><strong>Clarity:</strong> Consistent tenses make your resume easier to read and understand</li>
        <li><strong>Professionalism:</strong> Proper tense usage demonstrates attention to detail and strong communication skills</li>
      </ul>
    `,
  },
  {
    id: 2,
    question: "When should I use present tense vs past tense?",
    answer: `
      Here's a quick guide on when to use different tenses:
      <ul>
        <li><strong>Present Tense:</strong> Use for current job responsibilities, ongoing projects, and skills you currently possess</li>
        <li><strong>Past Tense:</strong> Use for completed projects, previous jobs, and past achievements</li>
        <li><strong>Present Perfect:</strong> Use sparingly for ongoing accomplishments that began in the past (e.g., "have increased sales by 50%")</li>
      </ul>
      <br />
      Remember to be consistent within each role - don't mix tenses when describing the same position.
    `,
  },
  {
    id: 3,
    question: "What are common verb tense mistakes to avoid?",
    answer: `
      <ul>
        <li><strong>Mixing Tenses:</strong> Don't switch between past and present tense within the same job description</li>
        <li><strong>Wrong Tense for Past Jobs:</strong> Using present tense for positions you no longer hold</li>
        <li><strong>Passive Voice:</strong> Using "was responsible for" instead of active verbs like "managed" or "led"</li>
        <li><strong>Weak Verbs:</strong> Using "helped with" or "worked on" instead of strong action verbs</li>
      </ul>
    `,
  },
  {
    id: 4,
    question: "How can I make my action verbs stronger?",
    answer: `
      Strong action verbs make your achievements more impactful. Here are some examples:
      <br><br>
      Instead of:
      <ul>
        <li>"Was responsible for" → Use "Managed," "Led," "Directed"</li>
        <li>"Helped with" → Use "Contributed," "Collaborated," "Supported"</li>
        <li>"Worked on" → Use "Developed," "Implemented," "Created"</li>
      </ul>
      <br>
      Remember to maintain consistent tenses while using these stronger verbs. Past roles should use past tense versions of these verbs.
    `,
  },
];

const explanation = `
    Using the correct verb tenses in your resume is crucial for clarity and professionalism. Your current role should use present tense, while previous roles should use past tense. Consistency in verb tenses helps recruiters easily understand your career progression and achievements.

    Our analysis shows that resumes with consistent verb tenses are 30% more likely to pass initial screening.
`;

const question = "How should I use verb tenses in my resume?";

interface VerbTensesProps {
  resume_url: string;
  verb_tenses_score: number;
  verb_tenses_feedback: string;
}

const VerbTenses: React.FC<VerbTensesProps> = ({
  resume_url,
  verb_tenses_score,
  verb_tenses_feedback,
}) => {
  return (
    <div className="grid h-screen grid-cols-2">
      {/* Left half */}
      <div className="flex h-full flex-col justify-start overflow-y-auto p-4 [-ms-overflow-style:none] [scrollbar-width:none] hover:[-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
        {/* Row with heading on the left and circle at the far right */}
        <div className="flex w-full items-center justify-between">
          <p className="text-2xl font-semibold text-black dark:text-white">
            Action Verbs: Tenses
            <p className="mb-4 mt-1 text-sm text-gray-600 dark:text-gray-400">
              Ensure you use the right tenses when describing your
              accomplishments
            </p>
          </p>
          <CircleProgress score={verb_tenses_score} />
        </div>
        <br />
        <hr />
        <br />

        {/* The rest of the content below */}
        {/* <p>Quantify Impact feedback: {quantify_impact_feedback}</p> */}
        <FeedbackCard
          explanation={explanation}
          question={question}
          feedback={verb_tenses_feedback}
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

export default VerbTenses;
