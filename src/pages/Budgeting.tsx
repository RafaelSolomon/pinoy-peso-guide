import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calculator, PiggyBank, Target, TrendingUp } from "lucide-react";

const Budgeting = () => {
  const budgetingTips = [
    {
      title: "50/30/20 Rule",
      description: "Allocate 50% for needs, 30% for wants, and 20% for savings and debt payments.",
      icon: <Calculator className="h-8 w-8 text-primary" />,
      difficulty: "Beginner"
    },
    {
      title: "Emergency Fund",
      description: "Build 3-6 months of expenses as your financial safety net.",
      icon: <PiggyBank className="h-8 w-8 text-primary" />,
      difficulty: "Essential"
    },
    {
      title: "Goal-Based Budgeting",
      description: "Create specific budgets for your financial goals like travel or home purchase.",
      icon: <Target className="h-8 w-8 text-primary" />,
      difficulty: "Intermediate"
    },
    {
      title: "Income Tracking",
      description: "Monitor all income sources including side hustles and passive income.",
      icon: <TrendingUp className="h-8 w-8 text-primary" />,
      difficulty: "Advanced"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary/20">
      <div className="container py-12">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Master Your Budget</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Learn proven budgeting strategies tailored for Filipino families. Take control of your finances and build lasting wealth.
          </p>
        </div>

        {/* Featured Content */}
        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8 mb-12">
          {budgetingTips.map((tip, index) => (
            <Card key={index} className="group hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    {tip.icon}
                    <div>
                      <CardTitle className="text-xl">{tip.title}</CardTitle>
                      <Badge variant="secondary" className="mt-2">
                        {tip.difficulty}
                      </Badge>
                    </div>
                  </div>
                </div>
                <CardDescription className="text-base mt-4">
                  {tip.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="outline" className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  Learn More
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center bg-primary/5 rounded-lg p-8">
          <h2 className="text-2xl font-bold mb-4">Ready to Start Budgeting?</h2>
          <p className="text-muted-foreground mb-6">
            Use our free budgeting calculator to create your personalized financial plan.
          </p>
          <Button size="lg" className="mr-4">
            Use Budget Calculator
          </Button>
          <Button variant="outline" size="lg">
            Download Guide
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Budgeting;