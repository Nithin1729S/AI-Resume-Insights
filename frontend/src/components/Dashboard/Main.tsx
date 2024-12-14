"use client";

import React from "react";
import PDFCanvas from "@/components/PDFCanvas/PDFCanvas";

const Main: React.FC = () => {
  return (
    <div className="grid grid-cols-2 h-screen">
      {/* Left half - empty space */}
      <div></div>

      {/* Right half - PDFCanvas */}
      <div>
        <PDFCanvas />
      </div>
    </div>
  );
};

export default Main;