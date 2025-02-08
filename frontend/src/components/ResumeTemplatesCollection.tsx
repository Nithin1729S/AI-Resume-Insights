"use client";

import { useState } from "react";
import Image from "next/image";

const templates = [
  {
    id: 1,
    name: "Modern Minimal",
    image: ""
  },
  {
    id: 2,
    name: "Professional Elite",
    image: ""
  },
  {
    id: 3,
    name: "Executive Pro",
    image: "0&h=900&fit=crop"
  },
  {
    id: 4,
    name: "Creative Edge",
    image: ""
  },
  {
    id: 5,
    name: "Tech Innovator",
    image: ""
  },
  {
    id: 6,
    name: "Digital Master",
    image: ""
  }
];

const PLACEHOLDER_IMAGE = "/placeholder.png"; // Ensure this file exists in your public folder

const isValidUrl = (url: string | URL) => {
  try {
    return Boolean(new URL(url));
  } catch {
    return false;
  }
};

const ResumeTemplates = () => {
  return (
    <div className="max-w-7xl mx-auto px-8 py-16 bg-gray-50">
      <h2 className="text-3xl font-bold mb-12 text-center bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
        Premium Resume Templates
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
}

const TemplateCard = ({ template }: { template: Template }) => {
  const [imageSrc, setImageSrc] = useState(
    isValidUrl(template.image) ? template.image : PLACEHOLDER_IMAGE
  );

  return (
    <div
      className="group cursor-pointer"
      onClick={() =>
        window.open("https://www.overleaf.com/latex/templates/tagged/cv", "_blank")
      }
    >
      <div className="relative h-[500px] overflow-hidden rounded-2xl shadow-lg transform transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl">
        <Image
          src={imageSrc}
          alt={template.name}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          onError={() => setImageSrc(PLACEHOLDER_IMAGE)}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500" />
        <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-6 group-hover:translate-y-0 transition-transform duration-500">
          <h3 className="text-xl font-semibold text-white mb-2">
            {template.name}
          </h3>
          <p className="text-white/80 text-sm">Click to view on Overleaf</p>
        </div>
      </div>
    </div>
  );
};

export default ResumeTemplates;
