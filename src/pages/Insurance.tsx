import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Shield, Heart, Car, Home, Users, Briefcase } from "lucide-react";

const Insurance = () => {
  const insuranceTypes = [
    {
      title: "Health Insurance",
      description: "PhilHealth, HMO, and private health insurance options to protect against medical expenses.",
      icon: <Heart className="h-8 w-8 text-primary" />,
      priority: "Essential",
      coverage: "Medical bills, hospitalization"
    },
    {
      title: "Life Insurance",
      description: "Term life and whole life insurance to protect your family's financial future.",
      icon: <Shield className="h-8 w-8 text-success" />,
      priority: "High Priority",
      coverage: "Death benefit, family protection"
    },
    {
      title: "Car Insurance",
      description: "Comprehensive and CTPL insurance for vehicle protection and legal compliance.",
      icon: <Car className="h-8 w-8 text-accent" />,
      priority: "Required",
      coverage: "Vehicle damage, third-party liability"
    },
    {
      title: "Home Insurance",
      description: "Protect your property against fire, flood, earthquake, and theft.",
      icon: <Home className="h-8 w-8 text-warning" />,
      priority: "Recommended",
      coverage: "Property damage, personal belongings"
    },
    {
      title: "Family Insurance",
      description: "Comprehensive family protection plans covering multiple family members.",
      icon: <Users className="h-8 w-8 text-primary" />,
      priority: "High Priority",
      coverage: "Family health, education"
    },
    {
      title: "Business Insurance",
      description: "Professional liability and business protection for entrepreneurs and freelancers.",
      icon: <Briefcase className="h-8 w-8 text-success" />,
      priority: "Business Owners",
      coverage: "Professional liability, business assets"
    }
  ];

  const tips = [
    {
      title: "Start with Essentials",
      description: "PhilHealth and basic life insurance should be your first priorities."
    },
    {
      title: "Compare Providers",
      description: "Get quotes from multiple insurance companies to find the best rates."
    },
    {
      title: "Read the Fine Print",
      description: "Understand exclusions, waiting periods, and claim procedures."
    },
    {
      title: "Regular Review",
      description: "Update your coverage as your life circumstances change."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary/20">
      <div className="container py-12">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Insurance Guide for Filipinos</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Protect yourself and your family with the right insurance coverage. Learn about essential insurance types and how to choose the best options.
          </p>
        </div>

        {/* Insurance Types */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {insuranceTypes.map((insurance, index) => (
            <Card key={index} className="group hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <div className="flex items-start space-x-3">
                  {insurance.icon}
                  <div>
                    <CardTitle className="text-xl">{insurance.title}</CardTitle>
                    <div className="flex space-x-2 mt-2">
                      <Badge variant="outline">{insurance.priority}</Badge>
                    </div>
                  </div>
                </div>
                <CardDescription className="text-base mt-4">
                  {insurance.description}
                </CardDescription>
                <div className="mt-2">
                  <span className="text-sm font-medium text-muted-foreground">Coverage: </span>
                  <span className="text-sm text-foreground">{insurance.coverage}</span>
                </div>
              </CardHeader>
              <CardContent>
                <Button variant="outline" className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  Learn More
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Tips Section */}
        <div className="bg-card rounded-lg p-8 mb-12">
          <h2 className="text-2xl font-bold text-center mb-6">Insurance Planning Tips</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {tips.map((tip, index) => (
              <div key={index} className="flex space-x-3">
                <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-sm font-bold text-primary">{index + 1}</span>
                </div>
                <div>
                  <h3 className="font-semibold mb-1">{tip.title}</h3>
                  <p className="text-sm text-muted-foreground">{tip.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center bg-primary/5 rounded-lg p-8">
          <h2 className="text-2xl font-bold mb-4">Need Insurance Advice?</h2>
          <p className="text-muted-foreground mb-6">
            Get personalized insurance recommendations based on your needs and budget.
          </p>
          <Button size="lg" className="mr-4">
            Get Insurance Quote
          </Button>
          <Button variant="outline" size="lg">
            Find Insurance Agent
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Insurance;