"use client";

import React from "react";
import PDFCanvas from "@/components/PDFCanvas/PDFCanvas";
import CircleProgress from "@/components/ProgressTrackers/CircleProgress";
import FeedbackCard from "../../FeedbackCard";
import RecruiterInsightsCard from "../../RecruiterInsightsCard";

const faqs = [
  {
    id: 1,
    question: "What are filler words and why should I avoid them?",
    answer: `
      Filler words are unnecessary words that add length but not value to your resume. Common examples include:
      <ul>
        <li><strong>Vague terms:</strong> "various," "several," "etc.," "things"</li>
        <li><strong>Redundant phrases:</strong> "in order to," "due to the fact that," "for the purpose of"</li>
        <li><strong>Weak qualifiers:</strong> "very," "really," "quite," "basically"</li>
      </ul>
      These words make your resume longer without adding meaningful information.
    `,
  },
  {
    id: 2,
    question: "How can I identify filler words in my resume?",
    answer: `
      Here are some tips to spot filler words:
      <ul>
        <li><strong>Read aloud:</strong> If you can remove a word without changing the meaning, it's probably filler</li>
        <li><strong>Look for redundancies:</strong> Phrases like "past experience" (all experience is past) or "collaborate together" (collaborate already means together)</li>
        <li><strong>Check for weak descriptors:</strong> Words like "very" or "really" can usually be replaced with stronger, specific terms</li>
      </ul>
      Remember: every word should serve a purpose in communicating your value to employers.
    `,
  },
  {
    id: 3,
    question: "What are better alternatives to common filler words?",
    answer: `
      Replace weak or vague language with specific, impactful words:
      <ul>
        <li>"Helped with" → "Led," "Managed," "Executed"</li>
        <li>"Responsible for" → Use active verbs like "Directed," "Coordinated"</li>
        <li>"Various projects" → Name specific projects or give exact numbers</li>
        <li>"Worked on" → "Developed," "Implemented," "Designed"</li>
      </ul>
      Being precise and direct makes your resume more powerful and professional.
    `,
  },
];

const explanation = `
  Filler words dilute the impact of your resume and waste valuable space. Each word should contribute meaningfully to showcasing your achievements and capabilities. Removing filler words makes your resume more concise and powerful, allowing recruiters to quickly understand your value proposition.
`;

const question = "How do filler words impact your resume's effectiveness?";

interface FillerWordsProps {
  resume_url: string;
  filler_words_score: number;
  filler_words_feedback: string;
}

const FillerWords: React.FC<FillerWordsProps> = ({
  resume_url,
  filler_words_score,
  filler_words_feedback,
}) => {
  return (
    <div className="grid h-screen grid-cols-2">
      {/* Left half */}
      <div className="flex h-full flex-col justify-start overflow-y-auto p-4 [-ms-overflow-style:none] [scrollbar-width:none] hover:[-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
        {/* Row with heading on the left and circle at the far right */}
        <div className="flex w-full items-center justify-between">
          <p className="text-2xl font-semibold text-black dark:text-white">
            Filler Words
            <p className="mb-4 mt-1 text-sm text-gray-600 dark:text-gray-400">
              Remove superfluous words that take up space and add little value
            </p>
          </p>
          <CircleProgress score={filler_words_score} />
        </div>
        <br />
        <hr />
        <br />

        {/* The rest of the content below */}
        {/* <p>Quantify Impact feedback: {quantify_impact_feedback}</p> */}
        <FeedbackCard
          explanation={explanation}
          question={question}
          feedback={filler_words_feedback}
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

export default FillerWords;
