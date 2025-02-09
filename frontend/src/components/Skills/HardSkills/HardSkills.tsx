"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Wrench, ChevronRight } from "lucide-react";
import { cn } from "@/utils/cn";
import PDFCanvas from "@/components/PDFCanvas/PDFCanvas";


interface HardSkillsProps {
  resume_url: string;
  skills: string[];
}

const HardSkills: React.FC<HardSkillsProps> = ({ resume_url, skills }) => {
  const router = useRouter();

  const handleSkillClick = (skill: string) => {
    // Navigate to the skill details page
    router.push(`/skills/${encodeURIComponent(skill.toLowerCase())}`);
  };

  return (
    <div className="flex h-screen bg-muted/30">
      {/* Left Panel - Skills Grid */}
      <div className="flex-1 p-6">
        <Card className="w-full">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Wrench className="h-5 w-5 text-primary" />
                <CardTitle className="text-2xl font-semibold">Hard Skills</CardTitle>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[calc(100vh-180px)] pr-4">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                {skills.map((skill, index) => (
                  <Button
                  key={index}
                  variant="secondary"
                  className={cn(
                    "h-auto py-4 px-4 group relative bg-[#f5f5f5] text-gray-800 border border-gray-300",
                    "hover:bg-[#e0e0e0] hover:text-gray-900",
                    "transition-all duration-200"
                  )}
                  onClick={() => handleSkillClick(skill)}
                >
                  <span className="text-sm font-medium">{skill}</span>
                  <ChevronRight className={cn(
                    "h-4 w-4 absolute right-2 opacity-0 text-gray-600",
                    "group-hover:opacity-100 group-hover:text-gray-900 transition-opacity duration-200"
                  )} />
                </Button>
                
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      </div>

      {/* Right Panel - Resume Preview */}
      <div className="w-1/2 h-full bg-background p-6">
        <Card className="h-full border-0 shadow-none">
          <CardContent className="p-0">
            <div className="h-[calc(100vh-140px)] w-full">
              <PDFCanvas resume_url={resume_url} />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default HardSkills;