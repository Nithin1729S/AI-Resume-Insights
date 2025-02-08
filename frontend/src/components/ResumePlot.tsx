import React from 'react';
import { LineChart, BarChart } from 'lucide-react';

type RESUME = {
  impact: number;
  brevity: number;
  style: number;
  sections: number;
  total_score: number;
};


const ResumePlot: React.FC<RESUME> = ({ impact,brevity,style,sections,total_score}) => {
  const maxScore = 100; // Assuming max score is 100

  // Calculate percentage for radar chart points
  const scores = [
    { name: 'Impact', value: (impact / maxScore) * 1000 },
    { name: 'Brevity', value: (brevity / maxScore) * 1000 },
    { name: 'Style', value: (style / maxScore) * 1000 },
    { name: 'Sections', value: (sections / maxScore) * 1000 },
  ];

  // Calculate points for radar chart
  const centerX = 150;
  const centerY = 150;
  const radius = 100;
  const points = scores.map((score, i) => {
    const angle = (Math.PI * 2 * i) / scores.length - Math.PI / 2;
    const value = (score.value * radius) / 100;
    return {
      x: centerX + Math.cos(angle) * value,
      y: centerY + Math.sin(angle) * value,
    };
  });

  const polygonPoints = points.map(p => `${p.x},${p.y}`).join(' ');
  const axisPoints = scores.map((_, i) => {
    const angle = (Math.PI * 2 * i) / scores.length - Math.PI / 2;
    return {
      x: centerX + Math.cos(angle) * radius,
      y: centerY + Math.sin(angle) * radius,
    };
  });

  return (
    <div className="p-6 bg-white rounded-xl ">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Resume Score Analysis</h2>
        <div className="flex items-center space-x-2">
          <LineChart className="w-5 h-5 text-blue-600" />
          <span className="text-gray-600">Score Breakdown</span>
        </div>
      </div>

      <div className="flex flex-col md:flex-row items-center gap-8">
        {/* Radar Chart */}
        <div className="relative w-[300px] h-[300px]">
          <svg width="300" height="300" className="transform -rotate-90">
            {/* Background circles */}
            {[25, 50, 75, 100].map((percentage) => (
              <circle
                key={percentage}
                cx={centerX}
                cy={centerY}
                r={(radius * percentage) / 100}
                fill="none"
                stroke="#e5e7eb"
                strokeWidth="1"
                className="opacity-50"
              />
            ))}

            {/* Axis lines */}
            {axisPoints.map((point, i) => (
              <line
                key={i}
                x1={centerX}
                y1={centerY}
                x2={point.x}
                y2={point.y}
                stroke="#e5e7eb"
                strokeWidth="1"
              />
            ))}

            {/* Score polygon */}
            <polygon
              points={polygonPoints}
              fill="rgba(59, 130, 246, 0.2)"
              stroke="#3b82f6"
              strokeWidth="2"
            />

            {/* Score points */}
            {points.map((point, i) => (
              <circle
                key={i}
                cx={point.x}
                cy={point.y}
                r="4"
                fill="#3b82f6"
              />
            ))}
          </svg>

          {/* Labels */}
          {scores.map((score, i) => {
            const angle = (Math.PI * 2 * i) / scores.length - Math.PI / 2;
            const labelRadius = radius + 20;
            const x = centerX + Math.cos(angle) * labelRadius;
            const y = centerY + Math.sin(angle) * labelRadius;
            
            return (
              <div
                key={score.name}
                className="absolute transform -translate-x-1/2 -translate-y-1/2 text-sm font-medium text-gray-600"
                style={{
                  left: x,
                  top: y,
                  transform: 'translate(-50%, -50%) rotate(90deg)',
                }}
              >
                {score.name}
              </div>
            );
          })}
        </div>

        {/* Score Summary */}
        <div className="flex-1 space-y-6">
          <div className="bg-blue-50 p-6 rounded-lg">
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600">
                {total_score*10}%
              </div>
              <div className="text-sm text-gray-600 mt-1">Total Score</div>
            </div>
          </div>

          <div className="space-y-4">
            {scores.map((score) => (
              <div key={score.name}>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium text-gray-600">
                    {score.name}
                  </span>
                  <span className="text-sm font-medium text-blue-600">
                    {score.value.toFixed(1)}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-600 rounded-full h-2"
                    style={{ width: `${score.value}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumePlot;