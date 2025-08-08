import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calculator, PiggyBank, TrendingUp, DollarSign, Target, Calendar } from "lucide-react";

const Tools = () => {
  const tools = [
    {
      title: "Budget Calculator",
      description: "Calculate your monthly budget using the 50/30/20 rule adapted for Filipino income levels.",
      icon: <Calculator className="h-8 w-8 text-primary" />,
      category: "Budgeting"
    },
    {
      title: "Emergency Fund Calculator",
      description: "Determine how much you need to save for emergencies based on your expenses.",
      icon: <PiggyBank className="h-8 w-8 text-success" />,
      category: "Savings"
    },
    {
      title: "Investment Growth Calculator",
      description: "See how your investments can grow over time with compound interest.",
      icon: <TrendingUp className="h-8 w-8 text-accent" />,
      category: "Investing"
    },
    {
      title: "Debt Payoff Calculator",
      description: "Create a strategy to pay off credit cards and loans faster.",
      icon: <DollarSign className="h-8 w-8 text-warning" />,
      category: "Debt Management"
    },
    {
      title: "Retirement Calculator",
      description: "Plan for your retirement with SSS, GSIS, and private savings calculations.",
      icon: <Target className="h-8 w-8 text-primary" />,
      category: "Retirement"
    },
    {
      title: "Financial Goal Tracker",
      description: "Set and track your financial goals like house down payment or vacation fund.",
      icon: <Calendar className="h-8 w-8 text-success" />,
      category: "Goal Setting"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary/20">
      <div className="container py-12">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Financial Planning Tools</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Free calculators and tools to help you make better financial decisions and reach your money goals faster.
          </p>
        </div>

        {/* Tools Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tools.map((tool, index) => (
            <Card key={index} className="group hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <div className="flex items-start space-x-3">
                  {tool.icon}
                  <div>
                    <CardTitle className="text-lg">{tool.title}</CardTitle>
                    <div className="text-sm text-accent font-medium mt-1">
                      {tool.category}
                    </div>
                  </div>
                </div>
                <CardDescription className="text-base mt-4">
                  {tool.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="outline" className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  Use Calculator
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center bg-card rounded-lg p-8 mt-12">
          <h2 className="text-2xl font-bold mb-4">Need Help Getting Started?</h2>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Our financial advisors can help you create a personalized plan using these tools and more.
          </p>
          <Button size="lg" variant="hero">
            Get Financial Consultation
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Tools;