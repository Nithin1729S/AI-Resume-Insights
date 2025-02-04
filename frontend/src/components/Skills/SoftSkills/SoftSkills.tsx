"use client";

import React from "react";
import PDFCanvas from "@/components/PDFCanvas/PDFCanvas";
import RecruiterInsightsCard from "../../RecruiterInsightsCard";
const THRESHOLD: number = 6;

const faqs = [
  {
    id: 1,
    question: "I'm a student or recent graduate. What metrics should I use?",
    answer: `
      If you're a student and you are struggling to come up with metrics and numbers, here are a few ideas:
      <ul>
        <li><strong>Team size:</strong> e.g. how many people have you worked with for specific projects or extracurricular activities? e.g. Teamed with x people to deliver y...</li>
        <li><strong>Industry-specific metrics:</strong> Depending on the industry you're looking to apply to, there are specific metrics. e.g. have you worked with large amounts of data? For example, you could explain how you "analyzed 10,000 data points to do x" or "Collected 1,000 survey responses to do y".</li>
        <li><strong>Extra-curricular activities:</strong> Think about any other extra-curricular activities you may have participated in. e.g. you could discuss the # of participants at an event you may have organized, etc.</li>
      </ul>
    `,
  },
  {
    id: 2,
    question: "What if I'm not in a numbers-focused role?",
    answer: `
      A common misconception is that only people in financial or sales roles have access to numbers they can use on their resume. That's not true. Every role or project has something you can quantify. You just need to think about the impact of your work in a non-financial context.
      <br /><br />
      Let's go through a few examples:
      <ul>
        <li><strong>Time savings:</strong> Did you introduce a new process, template, or tool that saved your company time? e.g. in terms of hours per week.</li>
        <li><strong>Scope:</strong> You can highlight the complexity of work you did by mentioning how many customers or users your team served.</li>
        <li><strong>Industry-specific metrics:</strong> Depending on the industry you're looking to apply to, there are specific metrics. e.g. have you worked with large amounts of data? For example, you could explain how you "analyzed 10,000 data points to do x" or "Collected 1,000 survey responses to do y".</li>
      </ul>
      Don't be afraid to estimate if you don't have an exact number available. Most resumes use estimates. For example, if you upgraded some machinery and made your company’s operations more efficient, you could estimate how many hours of labor those new machines saved per week.
      <br /><br />
      To take it a step further, you could multiply these weekly labor hours by the average hourly employee pay to give a rough idea of how much money the machines saved.
    `,
  },
  {
    id: 3,
    question: "How do you add numbers and metrics to your bullet points?",
    answer: `<p>
Expand the image next to the question for a real example of how to add numbers to your bullet points. This is called quantifying your bullet points.
<br><br>
This is one of the best things you can do to separate your resume from other applicants.
<br><br>								In the examples, notice how we explicitly describe the <em>impact</em> of our work. You want to always talk about the <em>result</em> of your work —&nbsp;did you help your company get more sales? Did you save your company time? Doing this makes your achievements more meaningful and helps employers know what kind of impact you can have at their company.					</p>`,
  },
  {
    id: 4,
    question: "What numbers can I use to quantify my resume?",
    answer: `<p>
Employers love to see achievements that directly contribute to the company’s bottom line (i.e. revenues and costs). Thus, quantifying your impact in dollars will be most impressive to employers.
<br><br>
However, not all of us work in sales or finance roles where our performance can be easily converted into dollar figures. What should you do in that case? Here are a few options:
<br><br>
1) Use any metric that is relevant to your job, and then make an educated estimate to convert that metric into dollars. For example, improvements you made to a process may have cut the process’s time by 20 hours a week. Twenty hours is equivalent to half of one full-time employee’s workweek, so you can convert your time savings into an estimated financial impact of half the average full-time employee’s salary — say, $30,000 a year.
										<br><br>
										2) There are also other metrics you can use to quantify your results!
										For example, how many people or departments did you work with? Did a change you made result in fewer customer support queries? You can even quantify your achievements based on the size of a project you ran or the time you saved your team on a weekly basis. 
										<br><br>
										3. Keep in mind that quantifying a bullet point is not just about the amount (i.e. how much, or a dollar or percentage value) but also the frequency (i.e. how often) and length (i.e. how long a project was).

<br><br>

There are hundreds of other metrics you can use depending on your industry. If you're in marketing, metrics include things like marketing spend, total subscribers, change in conversion rates and changes in customer acquisition costs. If you're in a technical field like software engineering, metrics could include reduction in execution speed, size of data you worked with and time you saved your team.</p>`,
  },
];

const explanation = `
    Recruiters are looking for evidence of impact on your resume, and hard numbers help with this. To explain this, let's compare these two lines from a sample resume (don't worry, we'll rewrite lines on your own resume in a second) Notice how using hard numbers emphasizes the impact of your work — this is what recruiters look for on your resume. Let's now work through your own resume, including giving you ideas of numbers even if you're not in a numbers-heavy role.

Our data has shown that the best performing resumes quantify the majority of their bullet points (75%+)..
  `;

const question = "What do hard numbers and quantifying impact mean?";
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
