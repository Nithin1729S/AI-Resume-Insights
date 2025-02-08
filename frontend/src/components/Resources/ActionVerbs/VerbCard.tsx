import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ListChecks } from "lucide-react";
import { cn } from "@/utils/cn";


interface VerbCardProps {
  title: string;
  verbs: string[];
}

const VerbCard: React.FC<VerbCardProps> = ({ title, verbs }) => {
  return (
    <Card className="w-full transition-all duration-300 hover:shadow-lg bg-white mt-3">
      <CardHeader className="pb-3">
        <div className="flex items-center space-x-2">
          <ListChecks className="h-5 w-5 text" />
          <CardTitle className="font-semibold tracking-tight">
            {title.toUpperCase()}
          </CardTitle>
        </div>
      </CardHeader>

      <CardContent>
        <ScrollArea className="h-full max-h-[400px] pr-4">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
            {verbs.map((verb, index) => (
              <Badge
              key={index}
              className="h-auto py-2 px-3 justify-center text-center font-medium bg-[#f5f5f5] text-gray-800 border border-gray-300 
                         hover:bg-[#e0e0e0] hover:text-gray-900 transition-colors duration-200"
            >
              {verb}
            </Badge>
            
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default VerbCard;