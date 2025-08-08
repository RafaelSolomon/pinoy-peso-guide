import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, Shield, Building, Coins } from "lucide-react";

const Investing = () => {
  const investmentOptions = [
    {
      title: "Stock Market (PSE)",
      description: "Invest in Philippine companies through the Philippine Stock Exchange. Great for long-term wealth building.",
      icon: <TrendingUp className="h-8 w-8 text-primary" />,
      riskLevel: "High Risk",
      timeHorizon: "5+ years"
    },
    {
      title: "Mutual Funds",
      description: "Professionally managed portfolios perfect for beginners. Start with as little as ₱1,000.",
      icon: <Shield className="h-8 w-8 text-primary" />,
      riskLevel: "Medium Risk",
      timeHorizon: "3-5 years"
    },
    {
      title: "Real Estate",
      description: "Property investment through REITs or direct ownership. Stable income and appreciation potential.",
      icon: <Building className="h-8 w-8 text-primary" />,
      riskLevel: "Medium Risk",
      timeHorizon: "10+ years"
    },
    {
      title: "Government Bonds",
      description: "Treasury bills and bonds backed by the Philippine government. Safe and predictable returns.",
      icon: <Coins className="h-8 w-8 text-primary" />,
      riskLevel: "Low Risk",
      timeHorizon: "1-5 years"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary/20">
      <div className="container py-12">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Smart Investing for Filipinos</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Discover investment opportunities in the Philippines. Build wealth through smart, diversified investing strategies.
          </p>
        </div>

        {/* Investment Options */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {investmentOptions.map((option, index) => (
            <Card key={index} className="group hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <div className="flex items-start space-x-3">
                  {option.icon}
                  <div>
                    <CardTitle className="text-xl">{option.title}</CardTitle>
                    <div className="flex space-x-2 mt-2">
                      <Badge variant="outline">{option.riskLevel}</Badge>
                      <Badge variant="secondary">{option.timeHorizon}</Badge>
                    </div>
                  </div>
                </div>
                <CardDescription className="text-base mt-4">
                  {option.description}
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

        {/* Educational Section */}
        <div className="bg-card rounded-lg p-8 mb-12">
          <h2 className="text-2xl font-bold text-center mb-6">Investment Basics</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-primary">1</span>
              </div>
              <h3 className="font-semibold mb-2">Start Early</h3>
              <p className="text-sm text-muted-foreground">Time is your greatest asset. The power of compound interest works best over long periods.</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-primary">2</span>
              </div>
              <h3 className="font-semibold mb-2">Diversify</h3>
              <p className="text-sm text-muted-foreground">Don't put all your eggs in one basket. Spread risk across different asset classes.</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-primary">3</span>
              </div>
              <h3 className="font-semibold mb-2">Stay Consistent</h3>
              <p className="text-sm text-muted-foreground">Regular investing beats trying to time the market. Set up automatic investments.</p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center bg-primary/5 rounded-lg p-8">
          <h2 className="text-2xl font-bold mb-4">Ready to Start Investing?</h2>
          <p className="text-muted-foreground mb-6">
            Take our risk assessment and get personalized investment recommendations.
          </p>
          <Button size="lg" className="mr-4">
            Take Risk Assessment
          </Button>
          <Button variant="outline" size="lg">
            Download Investment Guide
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Investing;