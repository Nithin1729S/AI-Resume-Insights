"use client";

import React from "react";
import PDFCanvas from "@/components/PDFCanvas/PDFCanvas";
import CircleProgress from "@/components/ProgressTrackers/CircleProgress";
import FeedbackCard from "../../FeedbackCard";
import RecruiterInsightsCard from "../../RecruiterInsightsCard";

const faqs = [
  {
    id: 1,
    question: "How do I avoid using responsibility-focused language?",
    answer: `
      Instead of using passive responsibility statements, focus on action and achievement. Here's how:
      <ul>
        <li><strong>Replace "Responsible for":</strong> Start with action verbs like "Led," "Managed," "Delivered," "Implemented"</li>
        <li><strong>Focus on outcomes:</strong> Don't just list what you were supposed to do, show what you actually achieved</li>
        <li><strong>Use active voice:</strong> Instead of "Was responsible for managing..." write "Managed..."</li>
      </ul>
    `,
  },
  {
    id: 2,
    question: "What are examples of good action verbs to use?",
    answer: `
      Strong action verbs make your resume more impactful. Here are some examples by category:
      <ul>
        <li><strong>Leadership:</strong> Led, Directed, Coordinated, Managed, Supervised</li>
        <li><strong>Achievement:</strong> Achieved, Improved, Increased, Reduced, Delivered</li>
        <li><strong>Development:</strong> Created, Developed, Designed, Implemented, Built</li>
        <li><strong>Analysis:</strong> Analyzed, Evaluated, Researched, Identified, Solved</li>
      </ul>
    `,
  },
  {
    id: 3,
    question: "How do I transform responsibility statements into achievement statements?",
    answer: `
      Follow this simple formula: Action Verb + Task + Result/Impact. For example:
      <br/><br/>
      Instead of: "Responsible for customer service"
      <br/>
      Write: "Resolved 50+ customer inquiries daily, improving satisfaction rates by 25%"
      <br/><br/>
      Instead of: "In charge of team training"
      <br/>
      Write: "Developed and delivered training program for 30 team members, reducing onboarding time by 40%"
    `,
  },
  {
    id: 4,
    question: "What words should I avoid in my resume?",
    answer: `
      Avoid these passive responsibility-focused words and phrases:
      <ul>
        <li><strong>Responsible for</strong> - Use action verbs instead</li>
        <li><strong>Duties included</strong> - Focus on achievements</li>
        <li><strong>Helped with</strong> - Be specific about your role</li>
        <li><strong>Worked on</strong> - Describe what you accomplished</li>
        <li><strong>Assisted</strong> - Show your direct impact</li>
      </ul>
      Replace these with strong action verbs that demonstrate your direct contribution and impact.
    `,
  },
];

const explanation = `
  Your resume should focus on achievements rather than just listing job duties. Employers want to see what you've accomplished, not just what you were supposed to do. Using responsibility-focused language can make your resume sound passive and less impactful.
  
  Our analysis shows that resumes using achievement-oriented language are 3x more likely to get noticed by recruiters.
`;

const question = "Why should I avoid responsibility-focused language in my resume?";

interface ResponsibilitiesProps{
  resume_url:string;
  responsibilities_score:number;
  responsibilities_feedback:string;
}

const Responsibilities: React.FC<ResponsibilitiesProps> = ({
  resume_url,
  responsibilities_score,
  responsibilities_feedback,
}) => {
  return (
    <div className="grid h-screen grid-cols-2">
      {/* Left half */}
      <div className="flex h-full flex-col justify-start overflow-y-auto p-4 [-ms-overflow-style:none] [scrollbar-width:none] hover:[-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
        {/* Row with heading on the left and circle at the far right */}
        <div className="flex w-full items-center justify-between">
          <p className="text-2xl font-semibold text-black dark:text-white">
            Avoided Responsibility-oriented Words
            <p className="mb-4 mt-1 text-sm text-gray-600 dark:text-gray-400">
            Your resume should focus on your accomplishments, not your responsibilities
            </p>
          </p>
          <CircleProgress score={responsibilities_score} />
        </div>
        <br />
        <hr />
        <br />

        {/* The rest of the content below */}
        {/* <p>Quantify Impact feedback: {quantify_impact_feedback}</p> */}
        <FeedbackCard
          explanation={explanation}
          question={question}
          feedback={responsibilities_feedback}
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

export default Responsibilities;
