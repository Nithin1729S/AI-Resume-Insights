import React from 'react';
import { LineChart, TrendingUp } from 'lucide-react';

type RESUME = {
  id: string;
  picture: string;
  pdf: string;
  impact: number;
  brevity: number;
  style: number;
  sections: number;
  total_score: number;
};

type GraphProps = {
  resumeData: RESUME[];
};

const ScoreGraph: React.FC<GraphProps> = ({ resumeData }) => {
  const maxScore = 100;
  const graphHeight = 300;
  const graphWidth = 1350;
  const padding = { top: 20, right: 30, bottom: 40, left: 40 };

  // Sort resumes by ID to ensure consistent ordering
  const sortedResumes = [...resumeData].sort((a, b) => a.id.localeCompare(b.id));

  // Calculate positions for the line graph
  const xStep = (graphWidth - padding.left - padding.right) / (sortedResumes.length - 1);
  const points = sortedResumes.map((resume, index) => ({
    x: padding.left + index * xStep,
    y: padding.top + (maxScore - resume.total_score) * ((graphHeight - padding.top - padding.bottom) / maxScore),
    score: resume.total_score,
    id: resume.id
  }));

  // Create the SVG path for the line
  const pathData = points.map((point, index) => 
    (index === 0 ? 'M' : 'L') + `${point.x},${point.y}`
  ).join(' ');

  // Calculate average score
  const averageScore = Math.round(sortedResumes.reduce((acc, resume) => acc + resume.total_score, 0) / sortedResumes.length);

  // Find min and max scores
  const minScore = Math.min(...sortedResumes.map(r => r.total_score));
  const maxScoreValue = Math.max(...sortedResumes.map(r => r.total_score));

  return (
    <div className="p-6 bg-white rounded-xl shadow-lg">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Resume Scores Comparison</h2>
        <div className="flex items-center space-x-2">
          <TrendingUp className="w-5 h-5 text-blue-600" />
          <span className="text-gray-600">Score Trends</span>
        </div>
      </div>

      <div className="flex flex-col gap-6">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-blue-50 p-4 rounded-lg">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600">{averageScore}%</div>
              <div className="text-sm text-gray-600">Average Score</div>
            </div>
          </div>
          <div className="bg-green-50 p-4 rounded-lg">
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600">{maxScoreValue}%</div>
              <div className="text-sm text-gray-600">Highest Score</div>
            </div>
          </div>
          <div className="bg-purple-50 p-4 rounded-lg">
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600">{minScore}%</div>
              <div className="text-sm text-gray-600">Lowest Score</div>
            </div>
          </div>
        </div>

        {/* Graph */}
        <div className="relative w-full" style={{ height: `${graphHeight}px` }}>
          <svg width={graphWidth} height={graphHeight}>
            {/* Y-axis grid lines and labels */}
            {[0, 25, 50, 75, 100].map((score) => {
              const y = padding.top + (maxScore - score) * ((graphHeight - padding.top - padding.bottom) / maxScore);
              return (
                <g key={score}>
                  <line
                    x1={padding.left}
                    y1={y}
                    x2={graphWidth - padding.right}
                    y2={y}
                    stroke="#e5e7eb"
                    strokeWidth="1"
                  />
                  <text
                    x={padding.left - 10}
                    y={y}
                    textAnchor="end"
                    alignmentBaseline="middle"
                    className="text-xs text-gray-500"
                  >
                    {score}%
                  </text>
                </g>
              );
            })}

            {/* Score line */}
            <path
              d={pathData}
              fill="none"
              stroke="#3b82f6"
              strokeWidth="2"
              className="transition-all duration-300"
            />

            {/* Data points */}
            {points.map((point, index) => (
              <g key={index}>
                <circle
                  cx={point.x}
                  cy={point.y}
                  r="4"
                  fill="#3b82f6"
                  className="transition-all duration-300"
                />
                {/* Score label */}
                <text
                  x={point.x}
                  y={point.y - 15}
                  textAnchor="middle"
                  className="text-xs font-medium text-gray-600"
                >
                  {point.score}%
                </text>
                {/* X-axis label (Resume ID) */}
                <text
                  x={point.x}
                  y={graphHeight - padding.bottom + 20}
                  textAnchor="middle"
                  className="text-xs text-gray-500"
                >
                  Resume {point.id}
                </text>
              </g>
            ))}
          </svg>
        </div>

        {/* Legend */}
        <div className="flex justify-center items-center space-x-4 text-sm text-gray-600">
          <div className="flex items-center">
            <div className="w-3 h-3 bg-blue-600 rounded-full mr-2"></div>
            Total Score
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScoreGraph;