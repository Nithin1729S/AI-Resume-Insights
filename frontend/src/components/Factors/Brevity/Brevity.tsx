"use client";

import React from "react";
import PDFCanvas from "@/components/PDFCanvas/PDFCanvas";
import RecruiterInsightsCard from "../../RecruiterInsightsCard";
const THRESHOLD: number = 5.9;

const faqs = [
  {
    id: 1,
    question: "How can I ensure my resume is concise?",
    answer: `
      To ensure your resume is concise, focus on the following:
      <ul>
        <li><strong>Use bullet points:</strong> Bullet points help to break down information into digestible pieces, making it easier for recruiters to read.</li>
        <li><strong>Avoid filler words:</strong> Remove unnecessary words that do not add value to your statements.</li>
        <li><strong>Be specific:</strong> Use specific examples and metrics to highlight your achievements without being verbose.</li>
      </ul>
    `,
  },
  {
    id: 2,
    question: "What are some tips for writing concise bullet points?",
    answer: `
      Writing concise bullet points can make your resume more impactful. Here are some tips:
      <ul>
        <li><strong>Start with action verbs:</strong> Begin each bullet point with a strong action verb to convey your accomplishments clearly.</li>
        <li><strong>Quantify your achievements:</strong> Use numbers and metrics to provide context and show the impact of your work.</li>
        <li><strong>Focus on results:</strong> Highlight the outcomes of your actions rather than just listing tasks.</li>
      </ul>
    `,
  },
  {
    id: 3,
    question: "How can I reduce the length of my resume without losing important information?",
    answer: `<p>
      To reduce the length of your resume without losing important information, consider the following strategies:
      <ul>
        <li><strong>Prioritize content:</strong> Focus on the most relevant and recent experiences that align with the job you're applying for.</li>
        <li><strong>Combine similar points:</strong> Merge bullet points that convey similar information to avoid redundancy.</li>
        <li><strong>Edit ruthlessly:</strong> Remove any information that does not directly contribute to showcasing your qualifications and achievements.</li>
      </ul>
    </p>`,
  },
  {
    id: 4,
    question: "What are common mistakes to avoid when aiming for brevity in a resume?",
    answer: `<p>
      When aiming for brevity in a resume, avoid these common mistakes:
      <ul>
        <li><strong>Overly vague statements:</strong> Ensure your bullet points are specific and provide enough context to understand your achievements.</li>
        <li><strong>Excessive jargon:</strong> Avoid using too much industry-specific jargon that may not be understood by all recruiters.</li>
        <li><strong>Leaving out key details:</strong> While being concise, make sure not to omit important information that demonstrates your qualifications.</li>
      </ul>
    </p>`,
  },
];


interface QuantifyImpactProps {
  resume_url: string;
  brevity_score: number;
  brevity_feedback: string;
  length_depth_score: number;
  use_of_bullets_score: number;
  bullet_lengths_score: number;
  filler_words_score: number;
  page_density_score: number;
  spelling_consistencies_score: number;
}

import { AlertCircle, Check, ChevronRight, Lock } from "lucide-react";
import { useRouter } from "next/navigation";

interface ScoreItem {
  id: string;
  title: string;
  description: string;
  path: string;
  status: "success" | "error" | "locked";
  action: "FIX" | "MORE";
}

const scoreItems = (
  length_depth_score: number,
  use_of_bullets_score: number,
  bullet_lengths_score: number,
  filler_words_score: number,
  page_density_score: number,
): ScoreItem[] => [
  {
    id: "1",
    title: "Length & Depth",
    description:
      length_depth_score > THRESHOLD
        ? "Well-structured with appropriate length."
        : "Well-structured with appropriate length.",
    status: length_depth_score > THRESHOLD ? "success" : "error",
    action: length_depth_score > THRESHOLD ? "MORE" : "FIX",
    path: "/factors/brevity/length-depth",
  },
  {
    id: "2",
    title: "Use of Bullets",
    description:
      use_of_bullets_score > THRESHOLD
        ? " Effective use of bullet points for clarity."
        : "Double-check consistency in formatting.",
    status: use_of_bullets_score > THRESHOLD ? "success" : "error",
    action: use_of_bullets_score > THRESHOLD ? "MORE" : "FIX",
    path: "/factors/brevity/use-of-bullets",
  },
  {
    id: "3",
    title: "Bullet lengths",
    description:
      bullet_lengths_score > THRESHOLD
        ? "Concise and well-formed points."
        : "Keep each point focused; avoid overly long sentences.",
    status: bullet_lengths_score > THRESHOLD ? "success" : "error",
    action: bullet_lengths_score > THRESHOLD ? "MORE" : "FIX",
    path: "/factors/brevity/bullet-lengths",
  },
  {
    id: "4",
    title: "Filler Words",
    description:
      filler_words_score > THRESHOLD
        ? "Minimal fluff improves readability."
        : " Remove unnecessary filler words for a sharper impact.",
    status: filler_words_score > THRESHOLD ? "success" : "error",
    action: filler_words_score > THRESHOLD ? "MORE" : "FIX",
    path: "/factors/brevity/filler-words",
  },
  {
    id: "5",
    title: "Page Density",
    description:
      page_density_score > THRESHOLD
        ? "Balanced content distribution."
        : "Avoid overcrowding or excessive whitespace.",
    status: page_density_score > THRESHOLD ? "success" : "error",
    action: page_density_score > THRESHOLD ? "MORE" : "FIX",
    path: "/factors/brevity/page-density",
  },
];

const Brevity: React.FC<QuantifyImpactProps> = ({
  resume_url,
  brevity_score,
  brevity_feedback,
  length_depth_score,
  use_of_bullets_score,
  bullet_lengths_score,
  filler_words_score,
  page_density_score,
}) => {
  const router = useRouter();
  return (
    <div className="grid h-screen grid-cols-2">
      {/* Left half */}
      <div className="flex h-full flex-col justify-start overflow-y-auto p-4 [-ms-overflow-style:none] [scrollbar-width:none] hover:[-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
        <div className="rounded-xl border border-gray-100 bg-white p-8 shadow-sm">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-2xl font-semibold text-purple-900">Brevity</h2>
            <div className="rounded-full bg-orange-50 px-4 py-2">
              <span className="font-semibold text-orange-600">
                {brevity_score}
              </span>
              <span className="text-sm text-orange-400">/10</span>
            </div>
          </div>

          <p className="mb-8 text-gray-600">{brevity_feedback}</p>

          {scoreItems(
            length_depth_score,
            use_of_bullets_score,
            bullet_lengths_score,
            filler_words_score,
            page_density_score,
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

export default Brevity;
