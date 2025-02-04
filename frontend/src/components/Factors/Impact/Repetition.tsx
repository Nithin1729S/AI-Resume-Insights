"use client";

import React from "react";
import PDFCanvas from "@/components/PDFCanvas/PDFCanvas";
import CircleProgress from "@/components/ProgressTrackers/CircleProgress";
import FeedbackCard from "../../FeedbackCard";
import RecruiterInsightsCard from "../../RecruiterInsightsCard";

interface RepetitionProps{
  resume_url:string;
  repetition_score:number;
  repetition_feedback:string;
}

const faqs = [
  {
    id: 1,
    question: "Why is repetition bad?",
    answer: `
      <div>
        <p>
          Repetition often reduces your resume's impact, making it less compelling and harder for your achievements to stand out.
          <br><br>
          If you've used the exact same action verbs or phrases several times over in your resume, it's usually a sign that you're showing the same skill set too often.
        </p>
        <h2>Repetition of action verbs</h2>
        <p>You shouldn't use the same action verb more than two times on your resume. For alternative action verbs, see the image on the right of the question, the alternatives below, or go to the Action Verbs section.</p>
        <h2>Repetition of phrases</h2>
        <p>Similarly, try to avoid reusing specific phrases multiple times on your resume.</p>
      </div>
    `,
  },
  {
    id: 2,
    question: "How can I avoid repetitive language?",
    answer: `
      <div>
        <p>
          - Use a thesaurus to find synonyms for common action verbs
          <br>- Structure similar accomplishments differently
          <br>- Focus on different aspects of your skills in each section
          <br>- Use industry-specific terminology varied throughout
        </p>
      </div>
    `,
  },
  {
    id: 3,
    question: "What are some alternative action verbs I can use?",
    answer: `
      <div>
        <p>
          Instead of "Managed":
          <br>- Directed, Supervised, Orchestrated, Led, Guided
          <br><br>
          Instead of "Created":
          <br>- Developed, Designed, Established, Formulated, Implemented
          <br><br>
          Instead of "Improved":
          <br>- Enhanced, Optimized, Refined, Streamlined, Strengthened
        </p>
      </div>
    `,
  }
];

const explanation = `
  Repetition in your resume can make your content appear monotonous and reduce its impact. 
  Using varied language not only makes your resume more engaging but also demonstrates your 
  range of skills and communication abilities. Our analysis shows that resumes with diverse 
  vocabulary and minimal repetition perform 30% better in applicant tracking systems.
`;

const question = "How does repetition affect your resume's effectiveness?";

const Repetition: React.FC<RepetitionProps> = ({
  resume_url,
  repetition_score,
  repetition_feedback,
}) => {
  return (
    <div className="grid h-screen grid-cols-2">
      {/* Left half */}
      <div className="flex h-full flex-col justify-start overflow-y-auto p-4 [-ms-overflow-style:none] [scrollbar-width:none] hover:[-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
        {/* Row with heading on the left and circle at the far right */}
        <div className="flex w-full items-center justify-between">
          <p className="text-2xl font-semibold text-black dark:text-white">
            Repetition
            <p className="mb-4 mt-1 text-sm text-gray-600 dark:text-gray-400">
            Avoid repeating action verbs and phrases on your resume
            </p>
          </p>
          <CircleProgress score={repetition_score} />
        </div>
        <br />
        <hr />
        <br />

        {/* The rest of the content below */}
        {/* <p>Quantify Impact feedback: {quantify_impact_feedback}</p> */}
        <FeedbackCard
          explanation={explanation}
          question={question}
          feedback={repetition_feedback}
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

export default Repetition;
