import React from "react";
import { Search, ChevronDown, ChevronUp, Lightbulb } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Insights {
  id: number;
  question: string;
  answer: string;
}

interface RecruiterInsightsPageProps {
  faqs: Insights[];
}

const RecruiterInsightsPage: React.FC<RecruiterInsightsPageProps> = ({ faqs }) => {
  const [searchQuery, setSearchQuery] = React.useState("");

  const filteredFAQs = faqs.filter((faq) =>
    faq.question.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header Section */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center space-x-2">
            <Lightbulb className="h-8 w-8 text-primary" />
            <h1 className="text-4xl font-bold tracking-tight">Recruiter Insights</h1>
          </div>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Discover valuable insights and answers to common recruiting questions
          </p>
        </div>

        {/* Search Section */}
        <Card className="border-none shadow-md">
          <CardContent className="pt-6">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search insights..."
                className="pl-10 h-12"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </CardContent>
        </Card>

        {/* FAQs Section */}
        <div className="space-y-6">
          {filteredFAQs.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No matching insights found</p>
            </div>
          ) : (
            <Accordion type="single" collapsible className="space-y-4">
              {filteredFAQs.map((faq) => (
                <AccordionItem
                  key={faq.id}
                  value={faq.id.toString()}
                  className="bg-card rounded-lg shadow-sm border px-6"
                >
                  <AccordionTrigger className="hover:no-underline py-4">
                    <div className="flex items-start text-left">
                      <span className="text-lg font-medium">{faq.question}</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="pt-2 pb-6">
                    <div
                      className="prose prose-sm max-w-none text-muted-foreground"
                      dangerouslySetInnerHTML={{ __html: faq.answer }}
                    />
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          )}
        </div>
      </div>
    </div>
  );
};

export default RecruiterInsightsPage;