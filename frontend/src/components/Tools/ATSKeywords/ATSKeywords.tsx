import React from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { FileText, SplitSquareVertical } from "lucide-react";
import PDFCanvas from "@/components/PDFCanvas/PDFCanvas";
interface ATSKeywordsProps {
  resume_url: string;
  job_matches:string;
}
const ATSKeywords: React.FC<ATSKeywordsProps> = ({
  resume_url,
  job_matches,
}) => {
  const paragraphs = job_matches.split('\n');
  return (
    <div className="grid grid-cols-2 h-screen">
      {/* Left half */}
      <div className="flex-1 p-6 ">
              <div className="h-full flex flex-col max-w-3xl mx-auto">
                <div className="flex items-center gap-2 mb-6">
                  <FileText className="h-6 w-6 text-primary" />
                  <h1 className="text-2xl font-semibold tracking-tight">Job Matches</h1>
                </div>
                
                <Card className="flex-1 shadow-md">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg font-medium">Generated Content</CardTitle>
                      <SplitSquareVertical className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <Separator className="mt-2" />
                  </CardHeader>
                  <CardContent>
                    <ScrollArea className="h-[calc(100vh-220px)] pr-4">
                      <div className="space-y-6">
                        {paragraphs.map((paragraph, index) => (
                          <p
                            key={index}
                            className="text-base leading-relaxed first-letter:text-lg first-letter:font-medium"
                          >
                            {paragraph}
                          </p>
                        ))}
                      </div>
                    </ScrollArea>
                  </CardContent>
                </Card>
              </div>
            </div>
      {/* Right half - PDFCanvas */}
      <div  className="sticky top-0 flex justify-end p-4 overflow-hidden w-full h-full">
        <PDFCanvas resume_url={resume_url}/>
      </div>
    </div>
  );
};

export default ATSKeywords;
