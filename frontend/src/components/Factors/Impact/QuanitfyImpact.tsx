"use client";

import React from "react";
import PDFCanvas from "@/components/PDFCanvas/PDFCanvas";
import CircleProgress from "@/components/ProgressTrackers/CircleProgress";
import Card from "./Card";
import FAQ from "./FAQ";

const faqs = [
  {
    id: 1,
    question: " I'm a student or recent graduate. What metrics should I use?",
    answer: "If you're a student and you are struggling to come up with metrics and numbers, here are a few ideas:•   Team size: e.g. how many people have you worked with for specific projects or extracurricular activities? e.g. Teamed with x people to deliver y...•   Depending on industry you're looking to apply to, there are specific industry metrics. e.g. have you worked with large amounts of data? For example, you could explain how you 'analyzed 10,000 data points to do x' or 'Collected 1,000 survey responses to do y'.•   Think about any other extra-curricular activities you may have participated in - e.g. you could discuss the # of participants at an event you may have organized, etc."
  },
  {
    id: 2,
    question: "How long does shipping take?",
    answer: "Shipping typically takes 3-5 business days for domestic orders and 7-14 business days for international orders."
  },
  {
    id: 3,
    question: "Do you offer international shipping?",
    answer: "Yes, we offer international shipping to most countries. Shipping costs and delivery times may vary."
  },
  {
    id: 4,
    question: "How can I track my order?",
    answer: "Once your order is shipped, you will receive a tracking number via email. You can use this number to track your package on our website."
  },
  {
    id: 5,
    question: "What payment methods do you accept?",
    answer: "We accept all major credit cards, PayPal, and Apple Pay."
  }
];

const explanation = `
    Providing clear, quantifiable achievements in your resume can greatly
    improve its impact. For example, instead of "Assisted in increasing
    sales," consider "Helped increase sales by 20% over six months by
    implementing a new marketing strategy." Numbers provide context and
    value, making your accomplishments more tangible to potential
    employers.
  `;

  const question = "What do hard numbers and quantifying impact mean?";
  const feedback = `
    Your resume needs more specific numbers. Using hard numbers to describe
    your achievements is important, even if you're entry-level. You don't
    have enough of them, so let's show you how to improve this.
  `;


interface QuantifyImpactProps {
  resume_url: string;
  quantify_impact_score: number;
  quantify_impact_feedback: string;
}

const QuantifyImpact: React.FC<QuantifyImpactProps> = ({
  resume_url,
  quantify_impact_score,
  quantify_impact_feedback,
}) => {
  return (
    <div className="grid h-screen grid-cols-2">
      {/* Left half */}
      <div className="flex flex-col justify-start h-full overflow-y-auto p-4 [scrollbar-width:none] [-ms-overflow-style:none] hover:[-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
        {/* Row with heading on the left and circle at the far right */}
        <div className="flex justify-between items-center w-full">
          <p className="text-2xl font-semibold text-black dark:text-white">
            Quantify Impact
            <p className="mb-4 mt-1 text-sm text-gray-600 dark:text-gray-400">
              Increase your impact by using numbers and metrics in your bullet points
            </p>
          </p>
          <CircleProgress score={quantify_impact_score} />
        </div>

        {/* The rest of the content below */}
        <p>Quantify Impact feedback: {quantify_impact_feedback}</p>
        <Card
        explanation={explanation}
        question={question}
        feedback={feedback}
      />
        <br />
        <FAQ faqs={faqs} />
      </div>

      {/* Right half - PDFCanvas */}
      <div className="flex justify-end overflow-hidden w-full h-full">
        <PDFCanvas resume_url={resume_url} />
      </div>
    </div>
  );
};

export default QuantifyImpact;
