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
      <div >

                        
                                                    <p>
Repetition often reduces your resume's impact, making it less compelling and harder for your achievements to stand out.
<br><br>
If you've used the exact same action verbs or phrases several times over in your resume, it's usually a sign that you're showing the same skill set too often.
</p>


<h2>Repetition of action verbs</h2>
<p>You shouldn't use the same action verb more than two times on your resume. For alternative action verbs, see the image on the right of the question, the alternatives below, or go to the <span class="internal-section-link" rel="action_words_tab">Action Verbs</span> section.</p>

<h2>Repetition of phrases</h2>
<p>Similarly, try to avoid reusing specific phrases multiple times on your resume. 
<br><br>
We see this mistake pretty often, where job seekers want to emphasize a certain skill and describe it in the exact same way in multiple parts of their resume (e.g. their work experience and their summary). Instead, try to vary up the language even when describing similar skills - this helps your resume's bullet points stand out. 
</p>                        
                      </div>
    `,
  },
];
const explanation = `
    Recruiters are looking for evidence of impact on your resume, and hard numbers help with this. To explain this, let's compare these two lines from a sample resume (don't worry, we'll rewrite lines on your own resume in a second) Notice how using hard numbers emphasizes the impact of your work — this is what recruiters look for on your resume. Let's now work through your own resume, including giving you ideas of numbers even if you're not in a numbers-heavy role.

Our data has shown that the best performing resumes quantify the majority of their bullet points (75%+)..
  `;

const question = "What do hard numbers and quantifying impact mean?";

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
