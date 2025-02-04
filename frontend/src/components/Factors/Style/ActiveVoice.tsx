"use client";

import React from "react";
import PDFCanvas from "@/components/PDFCanvas/PDFCanvas";
import CircleProgress from "@/components/ProgressTrackers/CircleProgress";
import FeedbackCard from "../../FeedbackCard";
import RecruiterInsightsCard from "../../RecruiterInsightsCard";

const faqs = [
  {
    id: 1,
    question: "What is active voice and why is it important in resumes?",
    answer: `
      Active voice makes your resume more impactful by:
      <ul>
        <li><strong>Showing ownership:</strong> You take direct responsibility for your achievements</li>
        <li><strong>Being concise:</strong> Active voice typically uses fewer words to convey the same meaning</li>
        <li><strong>Creating stronger impact:</strong> It makes your accomplishments sound more direct and powerful</li>
      </ul>
    `,
  },
  {
    id: 2,
    question: "How do I identify passive voice in my resume?",
    answer: `
      Look for these common signs of passive voice:
      <ul>
        <li><strong>Forms of "to be" (was, were) + past participle:</strong> "Reports were generated" vs "Generated reports"</li>
        <li><strong>"By" phrases:</strong> "Project was completed by me" vs "Completed project"</li>
        <li><strong>Unclear actor:</strong> When it's not clear who performed the action, it's likely passive</li>
      </ul>
      A quick test: If you can add "by zombies" after the verb and it makes grammatical sense, it's probably passive voice!
    `,
  },
  {
    id: 3,
    question: "Can you show examples of converting passive to active voice?",
    answer: `
      Here are some common resume passive-to-active conversions:
      <ul>
        <li>Passive: "Sales targets were exceeded by 50%"<br>Active: "Exceeded sales targets by 50%"</li>
        <li>Passive: "The project was completed under budget"<br>Active: "Completed project under budget"</li>
        <li>Passive: "Training was provided to new employees"<br>Active: "Trained new employees"</li>
      </ul>
    `,
  },
  {
    id: 4,
    question: "Are there any exceptions where passive voice is okay?",
    answer: `
      While active voice is generally preferred, passive voice might be appropriate when:
      <ul>
        <li>The doer of the action is unknown or irrelevant</li>
        <li>You want to emphasize the recipient of the action</li>
        <li>Describing company-wide achievements where individual attribution isn't appropriate</li>
      </ul>
      However, these situations are rare in resumes. When in doubt, use active voice.
    `,
  },
];

const explanation = `
  Active voice is crucial in resume writing because it shows direct responsibility and ownership of your achievements. 
  When you use active voice, your accomplishments sound more powerful and your writing becomes more concise. 
  Instead of saying "Reports were generated monthly," say "Generated monthly reports." 
  This simple change makes your resume more dynamic and engaging to recruiters.
`;

const question = "Why should I use active voice in my resume?";


interface ActiveVoiceProps{
  resume_url:string;
  active_voice_score:number;
  active_voice_feedback:string;
}
const ActiveVoice: React.FC<ActiveVoiceProps> = ({
  resume_url,
  active_voice_score,
  active_voice_feedback
}) => {
  return (
    <div className="grid h-screen grid-cols-2">
      {/* Left half */}
      <div className="flex h-full flex-col justify-start overflow-y-auto p-4 [-ms-overflow-style:none] [scrollbar-width:none] hover:[-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
        {/* Row with heading on the left and circle at the far right */}
        <div className="flex w-full items-center justify-between">
          <p className="text-2xl font-semibold text-black dark:text-white">
          Active Voice
            <p className="mb-4 mt-1 text-sm text-gray-600 dark:text-gray-400">
            Make sure you avoid the passive voice in your bullet points
            </p>
          </p>
          <CircleProgress score={active_voice_score} />
        </div>
        <br />
        <hr />
        <br />

        {/* The rest of the content below */}
        {/* <p>Quantify Impact feedback: {quantify_impact_feedback}</p> */}
        <FeedbackCard
          explanation={explanation}
          question={question}
          feedback={active_voice_feedback}
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

export default ActiveVoice;
