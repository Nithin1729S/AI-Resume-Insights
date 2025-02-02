import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageCircle, ChevronDown, ChevronUp } from "lucide-react";
import { cn } from "@/utils/cn";
import { Button } from "./ui/button";


interface FeedbackCardProps {
  explanation: string;
  question: string;
  feedback: string;
}

const FeedbackCard: React.FC<FeedbackCardProps> = ({ explanation, question, feedback }) => {
  const [isExpanded, setIsExpanded] = React.useState(false);

  return (
    <Card className="w-full transition-all duration-300 hover:shadow-lg">
      <CardHeader className="space-y-1">
        <div className="flex items-center space-x-2">
          <MessageCircle className="h-5 w-5 text-primary" />
          <CardTitle className="text-xl">Feedback</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Feedback Section */}
        <div className="rounded-lg bg-muted/50 p-4">
          <p className="text-base leading-relaxed">{feedback}</p>
        </div>

        {/* Question Button */}
        <Button
          variant="outline"
          className="w-full justify-between"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <span className="text-sm font-medium">{question}</span>
          {isExpanded ? (
            <ChevronUp className="h-4 w-4 ml-2 text-muted-foreground" />
          ) : (
            <ChevronDown className="h-4 w-4 ml-2 text-muted-foreground" />
          )}
        </Button>

        {/* Explanation Section */}
        <div
          className={cn(
            "grid transition-all duration-300",
            isExpanded ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
          )}
        >
          <div className="overflow-hidden">
            <div className={cn(
              "rounded-lg bg-accent/50 p-4 text-sm leading-relaxed",
              isExpanded ? "opacity-100" : "opacity-0",
              "transition-opacity duration-300"
            )}>
              {explanation}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default FeedbackCard;