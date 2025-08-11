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
      title: "🧮 Advanced Budget Calculator",
      description: "Master the 50/30/20 rule with detailed breakdowns & smart insights",
      badge: "Most Popular",
      icon: <Calculator className="h-6 w-6 text-primary" />,
      link: "/tools/budget-calculator"
    },
    {
      title: "🛡️ Emergency Fund Planner",
      description: "Build your safety net faster with goal tracking & milestones",
      badge: "Essential",
      icon: <PiggyBank className="h-6 w-6 text-primary" />,
      link: "/tools/emergency-fund-calculator"
    },
    {
      title: "📈 Investment Growth Calculator",
      description: "See your money grow with compound interest projections",
      badge: "Wealth Builder",
      icon: <TrendingUp className="h-6 w-6 text-primary" />,
      link: "/tools/investment-calculator"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary/20">
      <div className="container py-12">
        {/* Hero Section */}
        <Card className="text-center mb-12 bg-gradient-to-r from-primary/10 to-secondary/20 border-primary/20">
          <CardContent className="pt-8 pb-8">
            <h1 className="text-4xl font-bold mb-4 text-primary">🎯 Master Your Budget Today</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Transform your financial future with proven budgeting strategies designed for Filipino families. 
              Start building wealth that lasts generations! 💰
            </p>
          </CardContent>
        </Card>

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
            
            <Card className="border-primary/20 hover:border-primary/40 transition-all duration-200">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  ⚡ Quick Access Tools
                </CardTitle>
                <CardDescription>
                  Jump to powerful calculators designed for your needs
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {quickLinks.map((link, index) => (
                  <Card key={index} className="hover:shadow-lg transition-all duration-200 hover:scale-[1.02] cursor-pointer border-muted hover:border-primary/30">
                    <CardContent className="p-0">
                      <Button asChild variant="ghost" className="w-full justify-start h-auto p-4 hover:bg-primary/5">
                        <Link to={link.link}>
                          <div className="flex items-start gap-3 w-full">
                            <div className="mt-1">{link.icon}</div>
                            <div className="text-left flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <span className="font-medium">{link.title}</span>
                                <Badge variant="secondary" className="text-xs">
                                  {link.badge}
                                </Badge>
                              </div>
                              <div className="text-xs text-muted-foreground leading-relaxed">
                                {link.description}
                              </div>
                            </div>
                          </div>
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>

        {/* CTA Section */}
        <Card className="text-center bg-gradient-to-r from-primary/5 to-secondary/10 border-primary/20 hover:border-primary/40 transition-all duration-300">
          <CardContent className="p-8">
            <h2 className="text-2xl font-bold mb-4 text-primary">🚀 Ready to Transform Your Finances?</h2>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Take the first step towards financial freedom! Use our interactive tools to create a personalized 
              plan that grows your wealth while protecting your family's future. 💪
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button asChild size="lg" className="hover:scale-105 transition-transform duration-200">
                <Link to="/tools">🔧 Explore All Tools</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="hover:scale-105 transition-transform duration-200">
                <Link to="/tools/budget-calculator">📊 Advanced Calculator</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Budgeting;