"use client";

import React from "react";
import PDFCanvas from "@/components/PDFCanvas/PDFCanvas";
import CircleProgress from "@/components/ProgressTrackers/CircleProgress";
import FeedbackCard from "../../FeedbackCard";
import RecruiterInsightsCard from "../../RecruiterInsightsCard";

const faqs = [
  {
    id: 1,
    question: "What contact information should I include on my resume?",
    answer: `
      Essential contact information for your resume includes:
      <ul>
        <li><strong>Full name:</strong> Prominently displayed at the top</li>
        <li><strong>Professional email:</strong> Use a simple, professional email address</li>
        <li><strong>Phone number:</strong> Include your current, active phone number</li>
        <li><strong>Location:</strong> City and state/country is sufficient</li>
        <li><strong>LinkedIn profile:</strong> Optional but recommended for professional networking</li>
      </ul>
    `,
  },
  {
    id: 2,
    question: "What personal information should I avoid on my resume?",
    answer: `
      To maintain professionalism and privacy, avoid including:
      <ul>
        <li><strong>Date of birth or age:</strong> This can lead to unconscious bias</li>
        <li><strong>Marital status:</strong> Not relevant for most job applications</li>
        <li><strong>Social security number:</strong> Never include sensitive personal data</li>
        <li><strong>Personal photos:</strong> Unless specifically requested (varies by country)</li>
        <li><strong>Religious or political affiliations:</strong> Unless relevant to the position</li>
      </ul>
    `,
  },
  {
    id: 3,
    question: "How should I format my contact information?",
    answer: `
      Your contact information should be:
      <ul>
        <li><strong>Clearly visible:</strong> Place it at the top of your resume</li>
        <li><strong>Well-organized:</strong> Use consistent formatting and spacing</li>
        <li><strong>Professional:</strong> Use business-appropriate fonts and styling</li>
        <li><strong>Easy to read:</strong> Avoid cluttering with unnecessary icons or designs</li>
      </ul>
    `,
  },
];

const explanation = `
    Your contact and personal details section is crucial as it's how employers will reach you. Keep it professional,
    concise, and ensure all information is current and accurate. This section should be prominently placed at the
    top of your resume and easily scannable.
`;

const question = "How important are contact details on my resume?";

interface ContactPersonalDetailsProps {
  resume_url: string;
  contact_personal_details_score: number;
  contact_personal_details_feedback: string;
}
const ContactPersonalDetails: React.FC<ContactPersonalDetailsProps> = ({
  resume_url,
  contact_personal_details_score,
  contact_personal_details_feedback,
}) => {
  return (
    <div className="grid h-screen grid-cols-2">
      {/* Left half */}
      <div className="flex h-full flex-col justify-start overflow-y-auto p-4 [-ms-overflow-style:none] [scrollbar-width:none] hover:[-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
        {/* Row with heading on the left and circle at the far right */}
        <div className="flex w-full items-center justify-between">
          <p className="text-2xl font-semibold text-black dark:text-white">
            Contact and Personal Details
            <p className="mb-4 mt-1 text-sm text-gray-600 dark:text-gray-400">
              Avoid including unnecessary personal details. Just include what's
              required.
            </p>
          </p>
          <CircleProgress score={contact_personal_details_score} />
        </div>
        <br />
        <hr />
        <br />

        {/* The rest of the content below */}
        {/* <p>Quantify Impact feedback: {quantify_impact_feedback}</p> */}
        <FeedbackCard
          explanation={explanation}
          question={question}
          feedback={contact_personal_details_feedback}
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

export default ContactPersonalDetails;
