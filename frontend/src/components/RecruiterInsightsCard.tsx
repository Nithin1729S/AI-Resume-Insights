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
    <div className="min-h-screen bg-background mt-10">
      <div className="w-full mx-auto space-y-8">
        {/* Header Section */}
        <Card className="bg-white  w-full">
          <CardHeader className="text-center pb-2">
            <div className="flex items-center justify-center space-x-2">
              <Lightbulb className="h-8 w-8 text-primary" />
              <CardTitle className="text-4xl font-bold tracking-tight">
                Recruiter Insights
              </CardTitle>
            </div>
            <p className="text-muted-foreground text-lg mx-auto mt-4">
              Discover valuable insights and answers to common recruiting questions
            </p>
          </CardHeader>

          {/* Search Section */}
          <CardContent className="pt-4 pb-6">
            <div className="relative w-full max-w-2xl mx-auto">
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
        <Card className="bg-white shadow-lg w-full">
          <CardContent className="p-6">
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
                    className="border rounded-lg px-6 bg-gray-50"
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
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default RecruiterInsightsPage;