import React, { useState } from "react";

interface CardProps {
  explanation: string;
  question: string;
  feedback: string;
}

const Card: React.FC<CardProps> = ({ explanation, question, feedback }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleDropdown = () => {
    setIsExpanded((prev) => !prev);
  };

  return (
    <div className="col-span-12 rounded-[10px] bg-white px-7.5 pb-6 pt-7.5 shadow-1 dark:bg-gray-dark dark:shadow-card xl:col-span-7">
      <div className="mb-3.5 flex flex-col gap-2.5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h4 className="text-body-2xlg font-bold text-dark dark:text-white">
            Feedback
          </h4>
        </div>
        <div className="flex items-center gap-2.5">
          {/* Additional controls or icons can go here */}
        </div>
      </div>

      <div className="gap-2 text-center xsm:gap-0">
        {feedback}
      </div>

      <div className="mt-4">
        <button
          onClick={toggleDropdown}
          className="w-full text-center text-sm font-medium text-white bg-gray-500 rounded-md py-2 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-75"
        >
          {question}
        </button>
      </div>

      {isExpanded && (
        <div className="mt-4 text-sm text-gray-700 dark:text-gray-300">
          <p>{explanation}</p>
        </div>
      )}
    </div>
  );
};

export default Card;