"use client";

import React from "react";
import PDFCanvas from "@/components/PDFCanvas/PDFCanvas";
import CircleProgress from "@/components/ProgressTrackers/CircleProgress";
import FeedbackCard from "../../FeedbackCard";
import RecruiterInsightsCard from "../../RecruiterInsightsCard";

const faqs = [
  {
    id: 1,
    question: "How many pages should my resume be?",
    answer: `
      The ideal resume length depends on your experience level:
      <ul>
        <li><strong>Students/Recent Graduates:</strong> Stick to one page. You likely don't have enough relevant experience to justify more.</li>
        <li><strong>Mid-Level Professionals (3-10 years):</strong> One to two pages is appropriate, depending on your achievements and relevant experience.</li>
        <li><strong>Senior Professionals (10+ years):</strong> Two pages maximum. Focus on recent and relevant experience.</li>
      </ul>
    `,
  },
  {
    id: 2,
    question: "My resume content feels too cramped. What should I do?",
    answer: `
      A cramped resume can be hard to read. Here are some tips to improve readability:
      <ul>
        <li><strong>Margins:</strong> Keep margins between 0.5 to 1 inch</li>
        <li><strong>Font Size:</strong> Use 10-12pt for body text, 12-14pt for headings</li>
        <li><strong>White Space:</strong> Add appropriate spacing between sections</li>
        <li><strong>Bullet Points:</strong> Keep to 4-6 bullets per role</li>
      </ul>
      Remember, a well-spaced resume with less content is more effective than a cramped resume trying to fit everything.
    `,
  },
  {
    id: 3,
    question: "Should I reduce font size to fit more content?",
    answer: `
      Reducing font size below 10pt to fit more content is not recommended. Instead:
      <ul>
        <li>Remove redundant information</li>
        <li>Focus on recent and relevant experience</li>
        <li>Use concise bullet points</li>
        <li>Consider what the recruiter really needs to know</li>
      </ul>
      Readability should never be compromised just to include more information.
    `,
  },
  {
    id: 4,
    question: "How do I decide what to keep or remove?",
    answer: `
      When trimming content, consider:
      <ul>
        <li><strong>Relevance:</strong> Keep information most relevant to the job you're applying for</li>
        <li><strong>Recency:</strong> Focus on recent experience (last 10 years)</li>
        <li><strong>Impact:</strong> Prioritize achievements with measurable results</li>
        <li><strong>Uniqueness:</strong> Remove duplicate skills or similar experiences</li>
      </ul>
      Remember, your resume is a highlight reel, not a complete job history.
    `,
  },
];

const explanation = `
    Page density refers to how efficiently you use space in your resume while maintaining readability. 
    A good resume strikes a balance between including necessary information and maintaining clear, 
    readable formatting. Cramming too much information or having too sparse content can both hurt 
    your chances with recruiters.
  `;

const question = "What is page density and why does it matter?";

interface PageDensityProps {
  resume_url: string;
  page_density_score: number;
  page_density_feedback: string;
}

const PageDensity: React.FC<PageDensityProps> = ({
  resume_url,
  page_density_score,
  page_density_feedback,
}) => {
  return (
    <div className="grid h-screen grid-cols-2">
      {/* Left half */}
      <div className="flex h-full flex-col justify-start overflow-y-auto p-4 [-ms-overflow-style:none] [scrollbar-width:none] hover:[-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
        {/* Row with heading on the left and circle at the far right */}
        <div className="flex w-full items-center justify-between">
          <p className="text-2xl font-semibold text-black dark:text-white">
            Page Density
            <p className="mb-4 mt-1 text-sm text-gray-600 dark:text-gray-400">
              How many pages are you using? Are you cramming too much
              information into each page?
            </p>
          </p>
          <CircleProgress score={page_density_score} />
        </div>
        <br />
        <hr />
        <br />

        {/* The rest of the content below */}
        {/* <p>Quantify Impact feedback: {quantify_impact_feedback}</p> */}
        <FeedbackCard
          explanation={explanation}
          question={question}
          feedback={page_density_feedback}
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

export default PageDensity;
