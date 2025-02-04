"use client";

import React from "react";
import PDFCanvas from "@/components/PDFCanvas/PDFCanvas";
import CircleProgress from "@/components/ProgressTrackers/CircleProgress";
import FeedbackCard from "../../FeedbackCard";
import RecruiterInsightsCard from "../../RecruiterInsightsCard";

const faqs = [
  {
    id: 1,
    question: "How can I improve the readability of my resume?",
    answer: `
      Here are key tips to enhance your resume's readability:
      <ul>
        <li><strong>Consistent formatting:</strong> Use consistent fonts, spacing, and bullet points throughout your resume</li>
        <li><strong>White space:</strong> Include adequate spacing between sections to avoid a cluttered appearance</li>
        <li><strong>Clear sections:</strong> Clearly label different sections (Experience, Education, Skills) with distinct headers</li>
        <li><strong>Bullet points:</strong> Use concise bullet points instead of dense paragraphs</li>
        <li><strong>Font choice:</strong> Stick to professional fonts like Arial, Calibri, or Times New Roman at 10-12pt size</li>
      </ul>
    `,
  },
  {
    id: 2,
    question: "What are common readability mistakes to avoid?",
    answer: `
      Here are frequent readability issues that can hurt your resume:
      <ul>
        <li><strong>Dense text blocks:</strong> Long paragraphs that are hard to scan quickly</li>
        <li><strong>Inconsistent spacing:</strong> Varying gaps between sections that make the layout look unprofessional</li>
        <li><strong>Too small font:</strong> Using fonts smaller than 10pt to fit more content</li>
        <li><strong>Poor contrast:</strong> Using light colors that are hard to read against white backgrounds</li>
        <li><strong>Overcrowding:</strong> Trying to fit too much information on one page</li>
      </ul>
      Remember, recruiters typically spend only 6-7 seconds scanning a resume initially. Make those seconds count with clear, scannable content.
    `,
  },
  {
    id: 3,
    question: "Should I use columns in my resume?",
    answer: `<p>
      While columns can help organize information, they should be used carefully:
      <br><br>
      <ul>
        <li>Columns work well for skills sections or brief information</li>
        <li>Avoid using columns for key experience descriptions</li>
        <li>Ensure column content is clearly separated</li>
        <li>Test how your resume appears when parsed by ATS systems</li>
      </ul>
      <br>
      Single-column layouts are generally safer and ensure your content is read in the correct order by both humans and ATS systems.
    </p>`,
  },
  {
    id: 4,
    question: "What's the ideal resume length for readability?",
    answer: `<p>
      For optimal readability:
      <br><br>
      - Entry to mid-level positions: Stick to one page
      <br>
      - Senior positions: Maximum two pages
      <br><br>
      Tips to maintain length while preserving readability:
      <br><br>
      - Remove redundant information
      <br>
      - Use concise bullet points
      <br>
      - Focus on recent and relevant experience
      <br>
      - Maintain adequate margins (0.5" - 1")
      <br><br>
      Remember: A shorter, well-organized resume is more effective than a longer, cluttered one.</p>`,
  },
];

const explanation = `
    Resume readability is crucial because recruiters spend an average of just 6-7 seconds on initial resume screening. A well-organized, clearly formatted resume ensures that your key qualifications are immediately visible to recruiters. Poor readability can result in qualified candidates being overlooked simply because their important information wasn't easily discoverable.
  `;

const question = "Why is resume readability important?";

interface ReadabilityProps{
  resume_url:string;
  readability_score:number;
  readability_feedback:string;
}
const Readability: React.FC<ReadabilityProps> = ({
  resume_url,
  readability_score,
  readability_feedback,
}) => {
  return (
    <div className="grid h-screen grid-cols-2">
      {/* Left half */}
      <div className="flex h-full flex-col justify-start overflow-y-auto p-4 [-ms-overflow-style:none] [scrollbar-width:none] hover:[-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
        {/* Row with heading on the left and circle at the far right */}
        <div className="flex w-full items-center justify-between">
          <p className="text-2xl font-semibold text-black dark:text-white">
          Readability
            <p className="mb-4 mt-1 text-sm text-gray-600 dark:text-gray-400">
            Ensure resume screeners can read key sections of your resume
            </p>
          </p>
          <CircleProgress score={readability_score} />
        </div>
        <br />
        <hr />
        <br />

        {/* The rest of the content below */}
        {/* <p>Quantify Impact feedback: {quantify_impact_feedback}</p> */}
        <FeedbackCard
          explanation={explanation}
          question={question}
          feedback={readability_feedback}
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

export default Readability;
