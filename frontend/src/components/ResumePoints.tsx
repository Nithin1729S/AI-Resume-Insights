import React from 'react';
import { Award, TrendingUp, Users, Database, Lightbulb, Cloud, Link, Zap, Lock } from 'lucide-react';

const ResumePoints = () => {
  const points = [
    {
      icon: TrendingUp,
      text: "Spearheaded development of a microservices architecture, reducing system latency by 40%",
      category: "Architecture"
    },
    {
      icon: Users,
      text: "Led a team of 8 developers in successful delivery of a mission-critical payment platform",
      category: "Leadership"
    },
    {
      icon: Award,
      text: "Implemented automated testing pipeline, achieving 95% code coverage",
      category: "Quality Assurance"
    },
    {
      icon: Database,
      text: "Optimized database queries resulting in 60% faster response times",
      category: "Performance"
    },
    {
      icon: Lightbulb,
      text: "Mentored 5 junior developers, accelerating their technical growth",
      category: "Mentorship"
    },
    {
      icon: Cloud,
      text: "Architected and deployed cloud-native solutions on AWS, saving $50K annually",
      category: "Cloud Infrastructure"
    },
    {
      icon: Link,
      text: "Developed RESTful APIs serving 1M+ daily requests with 99.9% uptime",
      category: "API Development"
    },
    {
      icon: Zap,
      text: "Reduced application bundle size by 45% through code splitting and lazy loading",
      category: "Optimization"
    },
    {
      icon: Lock,
      text: "Implemented OAuth 2.0 authentication system for 100K+ users",
      category: "Security"
    }
  ];

  return (
    <div className="max-w-4xl w-full mx-auto">
      <div className="bg-white rounded-2xl overflow-hidden border border-gray-100">
        {/* <div className="h-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500" /> */}
        
        <div className="px-8 py-10">
          <h2 className="text-4xl font-bold mb-2 text-gray-800">
            Sample Bullet Points
          </h2>
          <p className="text-gray-500 mb-8">A track record of impactful contributions and technical excellence</p>
          
          <div className="grid gap-6">
            {points.map((point, index) => {
              const Icon = point.icon;
              return (
                <div
                  key={index}
                  className="group relative flex items-start space-x-6 p-4 rounded-xl hover:bg-gray-50 transition-all duration-300"
                >
                  <div className="flex-shrink-0">
                    <div className="p-3 rounded-lg bg-gradient-to-br from-indigo-50 to-purple-50 group-hover:from-indigo-100 group-hover:to-purple-100 transition-colors duration-300">
                      <Icon className="w-6 h-6 text-indigo-600 group-hover:text-indigo-700 transition-colors duration-300" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-medium text-indigo-600 mb-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      {point.category}
                    </div>
                    <p className="text-gray-700 font-medium leading-relaxed group-hover:text-gray-900 transition-colors duration-300">
                      {point.text}
                    </p>
                  </div>
                  <div className="absolute left-0 w-1 h-0 bg-gradient-to-b from-indigo-500 to-purple-500 group-hover:h-[50px] transition-all duration-300 rounded-r-lg" />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumePoints;