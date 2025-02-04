"use client";

import React from "react";
import PDFCanvas from "@/components/PDFCanvas/PDFCanvas";
import RecruiterInsightsCard from "../../RecruiterInsightsCard";
import { AlertCircle, Check, ChevronRight, Lock } from "lucide-react";
import { useRouter } from "next/navigation";


const THRESHOLD: number = 6;

const faqs = [
  {
    id: 1,
    question: "How can I effectively quantify my impact on a resume?",
    answer: `
      Quantifying your impact involves using numbers to highlight your achievements. Here are a few tips:
      <ul>
        <li><strong>Use specific metrics:</strong> Mention the exact numbers, percentages, or amounts. For example, "Increased sales by 20%" or "Managed a budget of $50,000".</li>
        <li><strong>Highlight scope and scale:</strong> Describe the size of the team you led, the number of projects you completed, or the scale of the operations you managed.</li>
        <li><strong>Showcase improvements:</strong> Focus on the improvements you brought about, such as "Reduced processing time by 30%" or "Improved customer satisfaction scores by 15%".</li>
      </ul>
    `,
  },
  {
    id: 2,
    question: "What if my role doesn't involve easily quantifiable metrics?",
    answer: `
      Even if your role isn't numbers-focused, you can still quantify your impact:
      <ul>
        <li><strong>Time savings:</strong> Did you implement a new process that saved time? Estimate the hours saved per week or month.</li>
        <li><strong>Efficiency improvements:</strong> Mention any improvements in efficiency, such as "Streamlined workflow, reducing errors by 25%".</li>
        <li><strong>Customer impact:</strong> Highlight how your work affected customers, like "Enhanced user experience, leading to a 10% increase in user retention".</li>
      </ul>
    `,
  },
  {
    id: 3,
    question: "How do I add impact metrics to my resume bullet points?",
    answer: `
      Adding metrics to your bullet points makes your achievements stand out. Here's how:
      <ul>
        <li><strong>Be specific:</strong> Use exact numbers and percentages. For example, "Led a team of 5 to complete a project 2 weeks ahead of schedule".</li>
        <li><strong>Focus on results:</strong> Highlight the outcomes of your actions, such as "Increased website traffic by 30% through SEO optimization".</li>
        <li><strong>Use action verbs:</strong> Start your bullet points with strong action verbs like "Achieved", "Implemented", "Reduced", or "Increased".</li>
      </ul>
    `,
  },
  {
    id: 4,
    question: "What are some examples of impact metrics I can use?",
    answer: `
      Here are some examples of metrics you can use to quantify your impact:
      <ul>
        <li><strong>Sales and revenue:</strong> "Boosted sales by 15%" or "Generated $100,000 in new revenue".</li>
        <li><strong>Cost savings:</strong> "Reduced operational costs by 10%" or "Saved $20,000 annually through process improvements".</li>
        <li><strong>Performance improvements:</strong> "Enhanced system performance, reducing load times by 50%" or "Increased production efficiency by 20%".</li>
        <li><strong>Customer satisfaction:</strong> "Improved customer satisfaction scores by 25%" or "Decreased customer complaints by 30%".</li>
      </ul>
    `,
  },
];

interface ImpactProps {
  resume_url: string;
  impact_score: number;
  impact_feedback: string;
  quantify_impact_score: number;
  repetition_score: number;
  weak_verbs_score: number;
  responsibilities_score: number;
  verb_tenses_score: number;
  spelling_consistencies_score: number;
}


interface ScoreItem {
  id: string;
  title: string;
  description: string;
  path: string;
  status: "success" | "error" | "locked";
  action: "FIX" | "MORE";
}

const scoreItems = (
  quantify_impact_score: number,
  repetition_score: number,
  weak_verbs_score: number,
  responsibilities_score: number,
  verb_tenses_score: number,
  spelling_consistencies_score: number,
): ScoreItem[] => [
  {
    id: "1",
    title: "Quantifying impact",
    description:
      quantify_impact_score > THRESHOLD
        ? "Great job! Your numbers make achievements stand out."
        : "Missing numbers! Your impact feels vague.",
    status: quantify_impact_score > THRESHOLD ? "success" : "error",
    action: quantify_impact_score > THRESHOLD ? "MORE" : "FIX",
    path: "/factors/impact/quantify-impact",
  },
  {
    id: "2",
    title: "Repetition",
    description:
      repetition_score > THRESHOLD
        ? "No verbs were overused."
        : "Repetitive verbs found! Try to diversify your language.",
    status: repetition_score > THRESHOLD ? "success" : "error",
    action: repetition_score > THRESHOLD ? "MORE" : "FIX",
    path: "/factors/impact/repetition",
  },
  {
    id: "3",
    title: "Weak verbs",
    description:
      weak_verbs_score > THRESHOLD
        ? "Strong verbs used effectively."
        : "Weak verbs found! They don’t showcase your impact.",
    status: weak_verbs_score > THRESHOLD ? "success" : "error",
    action: weak_verbs_score > THRESHOLD ? "MORE" : "FIX",
    path: "/factors/impact/weak-verbs",
  },
  {
    id: "4",
    title: "Responsibilities",
    description:
      responsibilities_score > THRESHOLD
        ? "Responsibilities are well described."
        : "Responsibilities need more detail.",
    status: responsibilities_score > THRESHOLD ? "success" : "error",
    action: responsibilities_score > THRESHOLD ? "MORE" : "FIX",
    path: "/factors/impact/responsibilities",
  },
  {
    id: "5",
    title: "Verb tenses",
    description:
      verb_tenses_score > THRESHOLD
        ? "Verb tenses are consistent."
        : "Inconsistent verb tenses found.",
    status: verb_tenses_score > THRESHOLD ? "success" : "error",
    action: verb_tenses_score > THRESHOLD ? "MORE" : "FIX",
    path: "/factors/impact/verb-tenses",
  },
  {
    id: "6",
    title: "Spelling & Consistency",
    description:
      spelling_consistencies_score > THRESHOLD
        ? "Spelling and consistency are on point."
        : "Spelling or consistency issues found.",
    status: spelling_consistencies_score > THRESHOLD ? "success" : "error",
    action: spelling_consistencies_score > THRESHOLD ? "MORE" : "FIX",
    path: "/factors/impact/spelling-consistencies",
  },
];

const Impact: React.FC<ImpactProps> = ({
  resume_url,
  impact_score,
  impact_feedback,
  quantify_impact_score,
  repetition_score,
  weak_verbs_score,
  responsibilities_score,
  verb_tenses_score,
  spelling_consistencies_score,
}) => {
  const router = useRouter();
  return (
    <div className="grid h-screen grid-cols-2">
      {/* Left half */}
      <div className="flex h-full flex-col justify-start overflow-y-auto p-4 [-ms-overflow-style:none] [scrollbar-width:none] hover:[-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
        <div className="rounded-xl border border-gray-100 bg-white p-8 shadow-sm">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-2xl font-semibold text-purple-900">Impact</h2>
            <div className="rounded-full bg-orange-50 px-4 py-2">
              <span className="font-semibold text-orange-600">
                {impact_score}
              </span>
              <span className="text-sm text-orange-400">/10</span>
            </div>
          </div>

          <p className="mb-8 text-gray-600">{impact_feedback}</p>

          {scoreItems(
            quantify_impact_score,
            repetition_score,
            weak_verbs_score,
            responsibilities_score,
            verb_tenses_score,
            spelling_consistencies_score,
          ).map((item: ScoreItem) => (
            <div
              key={item.id}
              className="flex items-center justify-between rounded-lg border border-gray-100 p-4 transition-colors hover:border-gray-200"
            >
              <div className="flex items-start gap-3">
                {item.status === "success" && (
                  <div className="mt-1">
                    <Check className="h-5 w-5 text-green-500" />
                  </div>
                )}
                {item.status === "error" && (
                  <div className="mt-1">
                    <AlertCircle className="h-5 w-5 text-red-500" />
                  </div>
                )}
                {item.status === "locked" && (
                  <div className="mt-1">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                )}
                <div>
                  <h3 className="mb-1 font-medium text-gray-900">
                    {item.title}
                  </h3>
                  <p className="text-sm text-gray-500">{item.description}</p>
                </div>
              </div>
              <button
                className={`flex items-center rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
                  item.action === "FIX"
                    ? "text-purple-600 hover:bg-purple-50"
                    : "text-purple-600 hover:bg-purple-50"
                }`}
                onClick={() => {
                  router.push(item.path);
                }}
              >
                {item.action}
                <ChevronRight className="ml-1 h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
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

export default Impact;
