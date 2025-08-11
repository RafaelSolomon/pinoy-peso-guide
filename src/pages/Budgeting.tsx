import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calculator, PiggyBank, Target, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";
import FiftyThirtyTwentyRule from "@/components/budgeting/FiftyThirtyTwentyRule";
import GoalBasedBudgeting from "@/components/budgeting/GoalBasedBudgeting";
import SmartRecommendations from "@/components/SmartRecommendations";

const Budgeting = () => {
  const quickLinks = [
    {
      title: "Budget Calculator",
      description: "Use our full-featured budget calculator with 50/30/20 analysis",
      icon: <Calculator className="h-6 w-6 text-primary" />,
      link: "/tools/budget-calculator"
    },
    {
      title: "Emergency Fund Calculator",
      description: "Plan and track your emergency fund progress",
      icon: <PiggyBank className="h-6 w-6 text-primary" />,
      link: "/tools/emergency-fund-calculator"
    },
    {
      title: "Investment Calculator",
      description: "Calculate returns and plan your investment strategy",
      icon: <TrendingUp className="h-6 w-6 text-primary" />,
      link: "/tools/investment-calculator"
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

        {/* Interactive Budgeting Tools */}
        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          <div className="lg:col-span-2 space-y-8">
            <FiftyThirtyTwentyRule />
            <GoalBasedBudgeting />
          </div>
          
          <div className="space-y-6">
            <SmartRecommendations 
              toolContext="budgeting" 
              maxRecommendations={3} 
            />
            
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Quick Access Tools</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {quickLinks.map((link, index) => (
                  <Button key={index} asChild variant="outline" className="w-full justify-start h-auto p-4">
                    <Link to={link.link}>
                      <div className="flex items-center gap-3">
                        {link.icon}
                        <div className="text-left">
                          <div className="font-medium">{link.title}</div>
                          <div className="text-xs text-muted-foreground">{link.description}</div>
                        </div>
                      </div>
                    </Link>
                  </Button>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center bg-primary/5 rounded-lg p-8">
          <h2 className="text-2xl font-bold mb-4">Master Your Financial Future</h2>
          <p className="text-muted-foreground mb-6">
            Start with these interactive budgeting tools and build a personalized financial plan that works for Filipino families.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button asChild size="lg">
              <Link to="/tools">Explore All Tools</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link to="/tools/budget-calculator">Advanced Calculator</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Budgeting;