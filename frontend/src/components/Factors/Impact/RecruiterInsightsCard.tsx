import React, { useState } from "react";
import { FaSearch, FaChevronDown, FaChevronUp } from "react-icons/fa";

interface Insights {
  id: number;
  question: string;
  answer: string;
}

interface RecruiterInsightsPageProps {
  faqs: Insights[];
}

const RecruiterInsightsPage: React.FC<RecruiterInsightsPageProps> = ({ faqs }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const toggleFAQ = (id: number) => {
    setExpandedFAQ(expandedFAQ === id ? null : id);
  };

  const filteredFAQs = faqs.filter((faq) =>
    faq.question.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-white-50 to-white-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-extrabold text-center text-indigo-900 mb-8">Recruiter Insights</h1>
        
        <div className="mb-8">
          <div className="relative">
            <input
              type="text"
              placeholder="Search Insights..."
              className="w-full py-3 px-4 pr-10 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              value={searchQuery}
              onChange={handleSearch}
            />
            <FaSearch className="absolute right-3 top-3 text-gray-400" />
          </div>
        </div>

        <div className="space-y-4">
          {filteredFAQs.map((faq) => (
            <div key={faq.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <button
                className="w-full text-left p-4 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-inset"
                onClick={() => toggleFAQ(faq.id)}
                aria-expanded={expandedFAQ === faq.id}
              >
                <div className="flex justify-between items-center">
                  <h2 className="text-lg font-semibold text-gray-800">{faq.question}</h2>
                  {expandedFAQ === faq.id ? (
                    <FaChevronUp className="text-indigo-600" />
                  ) : (
                    <FaChevronDown className="text-indigo-600" />
                  )}
                </div>
              </button>
              {expandedFAQ === faq.id && (
            <div
              className="p-4 bg-indigo-50 transition-all duration-300 ease-in-out"
              dangerouslySetInnerHTML={{ __html: faq.answer }}
            />
          )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RecruiterInsightsPage;