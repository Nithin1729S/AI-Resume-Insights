"use client";

import React from "react";
import PDFCanvas from "@/components/PDFCanvas/PDFCanvas";
import CircleProgress from "@/components/ProgressTrackers/CircleProgress";
import FeedbackCard from "../../FeedbackCard";
import RecruiterInsightsCard from "../../RecruiterInsightsCard";

const faqs = [
  {
    id: 1,
    question: "Why should I avoid personal pronouns in my resume?",
    answer: `
      Personal pronouns (I, me, my, we, our) should be avoided in resumes for several reasons:
      <ul>
        <li><strong>Professionalism:</strong> Resumes are formal documents, and avoiding personal pronouns maintains a professional tone</li>
        <li><strong>Conciseness:</strong> Removing pronouns helps keep bullet points shorter and more impactful</li>
        <li><strong>Focus:</strong> It keeps the focus on your achievements and skills rather than on yourself as a narrator</li>
      </ul>
    `,
  },
  {
    id: 2,
    question: "How do I write resume bullets without using personal pronouns?",
    answer: `
      There are several effective ways to write strong resume bullets without personal pronouns:
      <ul>
        <li><strong>Start with action verbs:</strong> Begin each bullet with a strong action verb (e.g., "Developed," "Led," "Managed")</li>
        <li><strong>Focus on achievements:</strong> Instead of "I increased sales," write "Increased sales by 50%"</li>
        <li><strong>Use implied subjects:</strong> The subject (you) is implied in resume bullets, making pronouns unnecessary</li>
      </ul>
      <br />
      For example:
      Instead of "I managed a team of 5 people"
      Write "Managed a team of 5 people"
    `,
  },
  {
    id: 3,
    question: "What are common mistakes when removing personal pronouns?",
    answer: `
      When removing personal pronouns, watch out for these common mistakes:
      <ul>
        <li><strong>Awkward phrasing:</strong> Simply deleting pronouns without restructuring the sentence</li>
        <li><strong>Passive voice:</strong> Falling into passive voice when trying to avoid pronouns</li>
        <li><strong>Inconsistency:</strong> Mixing styles by removing some pronouns but keeping others</li>
      </ul>
      Always ensure the sentence remains clear and natural after removing pronouns.
    `,
  },
  {
    id: 4,
    question: "Are there any exceptions where personal pronouns are acceptable?",
    answer: `
      While generally avoided in resume bullet points, there are a few specific situations where personal pronouns might be acceptable:
      <br /><br />
      1) In your resume summary or objective statement (though still better avoided)
      <br /><br />
      2) In cover letters, where a more personal tone is appropriate
      <br /><br />
      3) In personal websites or LinkedIn profiles, where the style can be more conversational
      <br /><br />
      However, for the main content of your resume, especially in experience and achievement sections, personal pronouns should always be avoided.
    `,
  },
];

const explanation = `
    Personal pronouns like "I," "me," "my," "we," and "our" should be avoided in resumes as they can make your writing less concise and professional. Instead, start sentences with action verbs and focus on your achievements directly. This creates a more powerful and professional impression with recruiters.
  `;

const question = "Why should personal pronouns be removed from resumes?";

interface PersonalPronounsProps {
  resume_url: string;
  personal_pronouns_score: number;
  personal_pronouns_feedback: string;
}
const PersonalPronouns: React.FC<PersonalPronounsProps> = ({
  resume_url,
  personal_pronouns_score,
  personal_pronouns_feedback,
}) => {
  return (
    <div className="grid h-screen grid-cols-2">
      {/* Left half */}
      <div className="flex h-full flex-col justify-start overflow-y-auto p-4 [-ms-overflow-style:none] [scrollbar-width:none] hover:[-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
        {/* Row with heading on the left and circle at the far right */}
        <div className="flex w-full items-center justify-between">
          <p className="text-2xl font-semibold text-black dark:text-white">
            Personal Pronouns
            <p className="mb-4 mt-1 text-sm text-gray-600 dark:text-gray-400">
              Remove any personal pronouns from your resume
            </p>
          </p>
          <CircleProgress score={personal_pronouns_score} />
        </div>
        <br />
        <hr />
        <br />

        {/* The rest of the content below */}
        {/* <p>Quantify Impact feedback: {quantify_impact_feedback}</p> */}
        <FeedbackCard
          explanation={explanation}
          question={question}
          feedback={personal_pronouns_feedback}
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

export default PersonalPronouns;
