"use client";

import React from "react";
import PDFCanvas from "@/components/PDFCanvas/PDFCanvas";
import CircleProgress from "@/components/ProgressTrackers/CircleProgress";
import FeedbackCard from "../../FeedbackCard";
import RecruiterInsightsCard from "../../RecruiterInsightsCard";

const faqs = [
  {
    id: 1,
    question: "What are buzzwords and why should I avoid them?",
    answer: `
      Buzzwords are overused, vague terms that don't add specific value to your resume. Common examples include:
      <ul>
        <li><strong>"Team player":</strong> Instead, describe specific instances of collaboration</li>
        <li><strong>"Detail-oriented":</strong> Rather than stating this, show it through specific examples</li>
        <li><strong>"Results-driven":</strong> Replace with actual results and metrics</li>
      </ul>
      These words are often seen as filler content and can make your resume appear generic.
    `,
  },
  {
    id: 2,
    question: "How do I replace buzzwords with stronger content?",
    answer: `
      Instead of using buzzwords, focus on specific actions and achievements:
      <ul>
        <li><strong>Bad:</strong> "Excellent communication skills"</li>
        <li><strong>Good:</strong> "Presented monthly reports to 20+ stakeholders and reduced misunderstandings by 40%"</li>
        <br/>
        <li><strong>Bad:</strong> "Innovative problem-solver"</li>
        <li><strong>Good:</strong> "Developed new inventory tracking system that reduced errors by 25%"</li>
      </ul>
      Always aim to provide concrete examples that demonstrate your capabilities rather than just claiming them.
    `,
  },
  {
    id: 3,
    question: "What are some common buzzwords to avoid?",
    answer: `
      Here are some frequently overused terms to avoid:
      <ul>
        <li>Synergy/Synergistic</li>
        <li>Think outside the box</li>
        <li>Go-getter</li>
        <li>Self-motivated</li>
        <li>Dynamic</li>
        <li>Proactive</li>
        <li>Strategic thinker</li>
        <li>Best of breed</li>
        <li>Results-oriented</li>
      </ul>
      Instead, focus on specific achievements and actions that demonstrate these qualities.
    `,
  },
  {
    id: 4,
    question: "How can I make my resume more impactful without buzzwords?",
    answer: `
      Focus on these alternatives:
      <ul>
        <li><strong>Use action verbs:</strong> "Implemented," "Developed," "Created," "Led" instead of generic terms</li>
        <li><strong>Include metrics:</strong> Quantify your achievements with numbers and percentages</li>
        <li><strong>Be specific:</strong> Describe exact tools, technologies, or methodologies you used</li>
        <li><strong>Show outcomes:</strong> Focus on results rather than responsibilities</li>
      </ul>
      The key is to be concrete and specific rather than vague and general.
    `,
  },
];

const explanation = `
    Buzzwords are vague, overused terms that don't effectively communicate your value to employers. While terms like "detail-oriented" or "team player" might seem impressive, they've become so common that they've lost their impact. Instead, your resume should focus on specific achievements and concrete examples that demonstrate your skills and experience.

    Our analysis shows that resumes with fewer buzzwords and more specific, actionable content are 55% more likely to result in interview calls.
  `;

const question = "Why should I avoid buzzwords in my resume?";

interface BuzzwordsProps{
  resume_url:string;
  buzzwords_score:number;
  buzzwords_feedback:string;
}
const Buzzwords: React.FC<BuzzwordsProps> = ({
  resume_url,
  buzzwords_score,
  buzzwords_feedback,
}) => {
  return (
    <div className="grid h-screen grid-cols-2">
      {/* Left half */}
      <div className="flex h-full flex-col justify-start overflow-y-auto p-4 [-ms-overflow-style:none] [scrollbar-width:none] hover:[-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
        {/* Row with heading on the left and circle at the far right */}
        <div className="flex w-full items-center justify-between">
          <p className="text-2xl font-semibold text-black dark:text-white">
            Buzzwords
            <p className="mb-4 mt-1 text-sm text-gray-600 dark:text-gray-400">
            emove vague buzzwords which add little value
            </p>
          </p>
          <CircleProgress score={buzzwords_score} />
        </div>
        <br />
        <hr />
        <br />

        {/* The rest of the content below */}
        {/* <p>Quantify Impact feedback: {quantify_impact_feedback}</p> */}
        <FeedbackCard
          explanation={explanation}
          question={question}
          feedback={buzzwords_feedback}
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

export default Buzzwords;
