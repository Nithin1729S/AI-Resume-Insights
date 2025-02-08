"use client";

import Image from "next/image";

const templates = [
  {
    id: 1,
    name: "Jake's Resume",
    image: "/resumes/Jake.jpeg",
    url: "https://www.overleaf.com/latex/templates/jakes-resume/syzfjbzwjncs"
  },
  {
    id: 2,
    name: "FAANGPath Simple Template",
    image: "/resumes/FAANGPath.jpeg",
    url: "https://www.overleaf.com/latex/templates/faangpath-simple-template/npsfpdqnxmbc"
  },
  {
    id: 3,
    name: "Omar's Resume",
    image: "/resumes/Omar.jpeg",
    url: "https://www.overleaf.com/latex/templates/omars-resume/yvmjzbpysxwg"
  },
  {
    id: 4,
    name: "Deedy CV",
    image: "/resumes/Deedy.jpeg",
    url: "https://www.overleaf.com/latex/templates/deedy-cv/bjryvfsjdyxz"
  },
];

const ResumeTemplates = () => {
  return (
    <div className="max-w-7xl mx-auto px-8 py-8 bg-gray-50 ml-10">
      <h2 className="text-3xl font-bold mb-12 text-center text-black bg-clip-text">
        Premium Resume Templates
      </h2>
      
      {/* Changed to 2 columns max for wider cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {templates.map((template) => (
          <TemplateCard key={template.id} template={template} />
        ))}
      </div>
    </div>
  );
};

interface Template {
  id: number;
  name: string;
  image: string;
  url: string;
}

const TemplateCard = ({ template }: { template: Template }) => {
  return (
    <div
      className="group cursor-pointer w-full max-w-[1000px] mx-auto" // Increased max-width from 800px to 1000px
      onClick={() => window.open(template.url, "_blank")}
    >
      <div className="relative h-[400px] overflow-hidden rounded-2xl shadow-lg transform transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl">
        <Image
          src={template.image}
          alt={template.name}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500" />
        <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-6 group-hover:translate-y-0 transition-transform duration-500">
          <h3 className="text-xl font-semibold text-white mb-2">
            {template.name}
          </h3>
          <p className="text-white/80 text-sm">Click to view</p>
        </div>
      </div>
    </div>
  );
};

export default ResumeTemplates;