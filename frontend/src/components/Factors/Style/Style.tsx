"use client";

import React, { act } from "react";
import PDFCanvas from "@/components/PDFCanvas/PDFCanvas";
import RecruiterInsightsCard from "../../RecruiterInsightsCard";
import { AlertCircle, Check, ChevronRight, Lock } from "lucide-react";
import { useRouter } from "next/navigation";

const THRESHOLD: number = 5.9;

const faqs = [
  {
    id: 1,
    question: "How can I improve the readability of my resume?",
    answer: `
      Improving readability is crucial for making your resume easy to scan. Here are some tips:
      <ul>
        <li><strong>Use bullet points:</strong> Break down information into bullet points to make it easier to read.</li>
        <li><strong>Consistent formatting:</strong> Ensure that fonts, sizes, and spacing are consistent throughout your resume.</li>
        <li><strong>Clear headings:</strong> Use clear and distinct headings for different sections of your resume.</li>
        <li><strong>Simple language:</strong> Avoid jargon and use simple, straightforward language.</li>
      </ul>
    `,
  },
  {
    id: 2,
    question: "What are some tips for using active voice in my resume?",
    answer: `
      Using active voice makes your resume more dynamic and engaging. Here are some tips:
      <ul>
        <li><strong>Start with action verbs:</strong> Begin your bullet points with strong action verbs like "Led," "Developed," or "Implemented."</li>
        <li><strong>Avoid passive constructions:</strong> Instead of saying "Was responsible for managing," say "Managed."</li>
        <li><strong>Be direct:</strong> Clearly state what you did and the impact it had.</li>
      </ul>
    `,
  },
  {
    id: 3,
    question: "How can I ensure consistency in my resume?",
    answer: `
      Consistency is key to a professional-looking resume. Here are some tips:
      <ul>
        <li><strong>Uniform formatting:</strong> Use the same font, size, and style for similar elements.</li>
        <li><strong>Consistent dates:</strong> Format dates in the same way throughout your resume.</li>
        <li><strong>Standardized language:</strong> Use similar language and tone across all sections.</li>
      </ul>
    `,
  },
  {
    id: 4,
    question: "What are some common buzzwords to include in my resume?",
    answer: `
      Including relevant buzzwords can make your resume stand out. Here are some examples:
      <ul>
        <li><strong>Industry-specific terms:</strong> Use terms that are relevant to your industry.</li>
        <li><strong>Action-oriented words:</strong> Words like "Achieved," "Improved," and "Managed" can highlight your accomplishments.</li>
        <li><strong>Skills and competencies:</strong> Include key skills and competencies that are in demand in your field.</li>
      </ul>
    `,
  },
];

interface QuantifyImpactProps {
  resume_url: string;
  style_score: number;
  style_feedback: string;
  buzzwords_score: number;
  dates_score: number;
  contact_personal_details_score: number;
  readability_score: number;
  personal_pronouns_score: number;
  active_voice_score: number;
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
  buzzwords_score: number,
  dates_score: number,
  contact_personal_details_score: number,
  readability_score: number,
  personal_pronouns_score: number,
  active_voice_score: number,
  spelling_consistencies_score: number,
): ScoreItem[] => [
  {
    id: "1",
    title: "Buzzwords",
    description:
      buzzwords_score > THRESHOLD
        ? "Great job! Your buzzwords make achievements stand out."
        : "Missing buzzwords! Your style feels vague.",
    status: buzzwords_score > THRESHOLD ? "success" : "error",
    action: buzzwords_score > THRESHOLD ? "MORE" : "FIX",
    path: "/factors/style/buzzwords",
  },
  {
    id: "2",
    title: "Dates",
    description:
      dates_score > THRESHOLD
        ? "Great job! Your dates are well formatted."
        : "Incorrect dates! Please check the formatting.",
    status: dates_score > THRESHOLD ? "success" : "error",
    action: dates_score > THRESHOLD ? "MORE" : "FIX",
    path: "/factors/style/dates",
  },
  {
    id: "3",
    title: "Contact & Personal Details",
    description:
      contact_personal_details_score > THRESHOLD
        ? "Great job! Your contact and personal details are complete."
        : "Incomplete contact and personal details! Please update them.",
    status: contact_personal_details_score > THRESHOLD ? "success" : "error",
    action: contact_personal_details_score > THRESHOLD ? "MORE" : "FIX",
    path: "/factors/style/contact-personal-details",
  },
  {
    id: "4",
    title: "Readability",
    description:
      readability_score > THRESHOLD
        ? "Great job! Your resume is easy to read."
        : "Poor readability! Please improve the clarity.",
    status: readability_score > THRESHOLD ? "success" : "error",
    action: readability_score > THRESHOLD ? "MORE" : "FIX",
    path: "/factors/style/readability",
  },
  {
    id: "5",
    title: "Personal Pronouns",
    description:
      personal_pronouns_score > THRESHOLD
        ? "Great job! Your use of personal pronouns is consistent."
        : "Inconsistent use of personal pronouns! Please review them.",
    status: personal_pronouns_score > THRESHOLD ? "success" : "error",
    action: personal_pronouns_score > THRESHOLD ? "MORE" : "FIX",
    path: "/factors/style/personal-pronouns",
  },
  {
    id: "6",
    title: "Active Voice",
    description:
      active_voice_score > THRESHOLD
        ? "Great job! Your use of active voice is consistent."
        : "Inconsistent use of active voice! Please review them.",
    status: active_voice_score > THRESHOLD ? "success" : "error",
    action: active_voice_score > THRESHOLD ? "MORE" : "FIX",
    path: "/factors/style/active-voice",
  },
  {
    id: "7",
    title: "Consistency",
    description:
    spelling_consistencies_score > THRESHOLD
        ? "Great job! Your resume is consistent."
        : "Inconsistencies found! Please review your resume.",
    status: spelling_consistencies_score > THRESHOLD ? "success" : "error",
    action: spelling_consistencies_score > THRESHOLD ? "MORE" : "FIX",
    path: "/factors/style/consistency",
  },
];

const Style: React.FC<QuantifyImpactProps> = ({
  resume_url,
  style_score,
  style_feedback,
  buzzwords_score,
  dates_score,
  contact_personal_details_score,
  readability_score,
  personal_pronouns_score,
  active_voice_score,
  spelling_consistencies_score,
}) => {
  const router = useRouter();
  return (
    <div className="grid h-screen grid-cols-2">
      {/* Left half */}
      <div className="flex h-full flex-col justify-start overflow-y-auto p-4 [-ms-overflow-style:none] [scrollbar-width:none] hover:[-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
        <div className="rounded-xl border border-gray-100 bg-white p-8 shadow-sm">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-2xl font-semibold text-purple-900">Style</h2>
            <div className="rounded-full bg-orange-50 px-4 py-2">
              <span className="font-semibold text-orange-600">
                {style_score}
              </span>
              <span className="text-sm text-orange-400">/10</span>
            </div>
          </div>

          <p className="mb-8 text-gray-600">{style_feedback}</p>

          {scoreItems(
            buzzwords_score,
            dates_score,
            contact_personal_details_score,
            readability_score,
            personal_pronouns_score,
            active_voice_score,
            spelling_consistencies_score
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

export default Style;
