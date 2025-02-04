"use client";

import React from "react";
import PDFCanvas from "@/components/PDFCanvas/PDFCanvas";
import CircleProgress from "@/components/ProgressTrackers/CircleProgress";
import FeedbackCard from "../../FeedbackCard";
import RecruiterInsightsCard from "../../RecruiterInsightsCard";

const faqs = [
  {
    id: 1,
    question: "Why is consistent spelling important in a resume?",
    answer: `
      Consistent spelling is crucial for several reasons:
      <ul>
        <li><strong>Professionalism:</strong> Inconsistent spelling makes your resume appear unprofessional and suggests lack of attention to detail.</li>
        <li><strong>ATS Compatibility:</strong> Applicant Tracking Systems may reject resumes with spelling variations of the same word.</li>
        <li><strong>First Impression:</strong> Recruiters spend an average of 6-7 seconds scanning your resume - spelling errors can lead to immediate rejection.</li>
      </ul>
    `,
  },
  {
    id: 2,
    question: "What are common spelling consistency issues in resumes?",
    answer: `
      Here are frequent spelling consistency issues to watch out for:
      <ul>
        <li><strong>Regional Variations:</strong> Mixing American and British spellings (e.g., 'color' vs 'colour', 'organize' vs 'organise').</li>
        <li><strong>Technical Terms:</strong> Inconsistent capitalization in tech terms (e.g., 'JavaScript' vs 'Javascript', 'PowerPoint' vs 'Powerpoint').</li>
        <li><strong>Company Names:</strong> Incorrect spelling of company names or product names (e.g., 'LinkedIn' vs 'Linkedin').</li>
      </ul>
      Pick one style and stick to it throughout your resume to maintain consistency.
    `,
  },
  {
    id: 3,
    question: "How can I ensure spelling consistency in my resume?",
    answer: `<p>
      Here are some practical tips:
      <br><br>
      1. Use spell-check tools but don't rely on them completely
      <br><br>
      2. Choose either US or UK English and stick to it
      <br><br>
      3. Create a style guide for your resume with correct spellings of:
      - Company names
      - Technical terms
      - Industry-specific terminology
      <br><br>
      4. Have someone else proofread your resume
    </p>`,
  },
  {
    id: 4,
    question: "What tools can help check spelling consistency?",
    answer: `<p>
      Several tools can help maintain spelling consistency:
      <br><br>
      1. Grammarly - Checks for spelling and consistency across documents
      <br><br>
      2. Microsoft Word's Editor - Helps maintain consistent spelling standards
      <br><br>
      3. Google Docs - Has built-in spell check and language settings
      <br><br>
      Remember: While these tools are helpful, they shouldn't replace human proofreading.
    </p>`,
  },
];

const explanation = `
    Spelling consistency is a crucial aspect of resume writing that many candidates overlook. It's not just about avoiding typos - it's about maintaining consistent spelling conventions throughout your document. This includes regional spelling variations, technical terms, and company names. Good spelling shows attention to detail and professionalism, two qualities that employers highly value.
  `;

const question = "Why should I care about spelling consistency in my resume?";

interface SpellingConsistencyProps {
  resume_url: string;
  spelling_consistency_score: number;
  spelling_consistency_feedback: string;
}
const SpellingConsistency: React.FC<SpellingConsistencyProps> = ({
  resume_url,
  spelling_consistency_score,
  spelling_consistency_feedback,
}) => {
  return (
    <div className="grid h-screen grid-cols-2">
      {/* Left half */}
      <div className="flex h-full flex-col justify-start overflow-y-auto p-4 [-ms-overflow-style:none] [scrollbar-width:none] hover:[-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
        {/* Row with heading on the left and circle at the far right */}
        <div className="flex w-full items-center justify-between">
          <p className="text-2xl font-semibold text-black dark:text-white">
            Spelling
            <p className="mb-4 mt-1 text-sm text-gray-600 dark:text-gray-400">
              Get rid of careless errors that can dramatically reduce your
              resume's impact
            </p>
          </p>
          <CircleProgress score={spelling_consistency_score} />
        </div>
        <br />
        <hr />
        <br />

        {/* The rest of the content below */}
        {/* <p>Quantify Impact feedback: {quantify_impact_feedback}</p> */}
        <FeedbackCard
          explanation={explanation}
          question={question}
          feedback={spelling_consistency_feedback}
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

export default SpellingConsistency;
