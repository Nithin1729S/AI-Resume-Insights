"use client";

import React from "react";
import PDFCanvas from "@/components/PDFCanvas/PDFCanvas";
import CircleProgress from "@/components/ProgressTrackers/CircleProgress";
import FeedbackCard from "../../FeedbackCard";
import RecruiterInsightsCard from "../../RecruiterInsightsCard";

const faqs = [
  {
    id: 1,
    question: "What academic information should I include in my resume?",
    answer: `
      Here are key elements to include in your education section:
      <ul>
        <li><strong>Degree and Major:</strong> List your degree type (BS, BA, MS, etc.) and field of study</li>
        <li><strong>University Name:</strong> Include the full name of your institution</li>
        <li><strong>Graduation Date:</strong> Add your graduation date (or expected date)</li>
        <li><strong>GPA:</strong> Include if it's 3.0 or higher</li>
        <li><strong>Relevant Coursework:</strong> List key courses that align with the job you're applying for</li>
        <li><strong>Academic Honors:</strong> Mention Dean's List, scholarships, or other achievements</li>
      </ul>
    `,
  },
  {
    id: 2,
    question: "Should I list all my educational experiences?",
    answer: `
      Generally, you should focus on your highest and most relevant education:
      <ul>
        <li><strong>Recent Graduates:</strong> Include university and possibly high school if you have notable achievements</li>
        <li><strong>Experienced Professionals:</strong> Focus on college and advanced degrees only</li>
        <li><strong>Multiple Degrees:</strong> List in reverse chronological order</li>
        <li><strong>Certifications:</strong> Include relevant professional certifications separately</li>
      </ul>
      Focus on education that adds value to the position you're applying for and demonstrates your qualifications.
    `,
  },
  {
    id: 3,
    question: "How should I format my education section?",
    answer: `
      Keep your education section clear and consistent:
      <ul>
        <li><strong>Placement:</strong> Usually at the top for recent graduates, below experience for professionals</li>
        <li><strong>Format:</strong> Use consistent formatting for each entry</li>
        <li><strong>Details:</strong> Include relevant academic projects, thesis work, or research</li>
        <li><strong>Clarity:</strong> Use clear dates and degree information</li>
      </ul>
      Remember to maintain the same formatting style throughout your resume for professionalism.
    `,
  },
  {
    id: 4,
    question: "What if I didn't finish my degree?",
    answer: `
      Be honest but strategic about incomplete education:
      <ul>
        <li><strong>Currently Enrolled:</strong> List expected graduation date and "In Progress"</li>
        <li><strong>Partial Completion:</strong> List credits earned or "Coursework in [Field]"</li>
        <li><strong>Focus on Learning:</strong> Highlight relevant courses and skills gained</li>
        <li><strong>Additional Training:</strong> Include certifications or professional development</li>
      </ul>
      Never misrepresent your educational background, but focus on what you've learned and achieved.
    `,
  },
];

const explanation = `
  Your education section is crucial for demonstrating your academic qualifications and knowledge foundation. 
  A well-structured education section helps recruiters quickly understand your academic background and 
  relevant coursework. It's particularly important for recent graduates or career changers, as it showcases 
  your theoretical knowledge and academic achievements.
`;

const question = "How important is the education section in my resume?";


interface EducationProps {
  resume_url: string;
  education_score: number;
  education_feedback: string;
}
const Education: React.FC<EducationProps> = ({
  resume_url,
  education_score,
  education_feedback,
}) => {
  return (
    <div className="grid h-screen grid-cols-2">
      {/* Left half */}
      <div className="flex h-full flex-col justify-start overflow-y-auto p-4 [-ms-overflow-style:none] [scrollbar-width:none] hover:[-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
        {/* Row with heading on the left and circle at the far right */}
        <div className="flex w-full items-center justify-between">
          <p className="text-2xl font-semibold text-black dark:text-white">
            Education
            <p className="mb-4 mt-1 text-sm text-gray-600 dark:text-gray-400">
            Get your education section in shape
            </p>
          </p>
          <CircleProgress score={education_score} />
        </div>
        <br />
        <hr />
        <br />

        {/* The rest of the content below */}
        {/* <p>Quantify Impact feedback: {quantify_impact_feedback}</p> */}
        <FeedbackCard
          explanation={explanation}
          question={question}
          feedback={education_feedback}
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

export default Education;
