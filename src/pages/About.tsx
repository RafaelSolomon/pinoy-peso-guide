import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, Target, Award, Heart } from "lucide-react";

const About = () => {
  const values = [
    {
      title: "Financial Empowerment",
      description: "We believe every Filipino deserves access to quality financial education and tools.",
      icon: <Target className="h-8 w-8 text-primary" />
    },
    {
      title: "Cultural Understanding",
      description: "Our content is specifically designed for Filipino families and their unique financial challenges.",
      icon: <Heart className="h-8 w-8 text-success" />
    },
    {
      title: "Practical Solutions",
      description: "We focus on actionable advice that works with real Filipino incomes and lifestyles.",
      icon: <Award className="h-8 w-8 text-accent" />
    },
    {
      title: "Community Support",
      description: "Building a community where Filipinos can learn and share financial experiences together.",
      icon: <Users className="h-8 w-8 text-warning" />
    }
  ];

  const stats = [
    { label: "Filipinos Helped", value: "50,000+" },
    { label: "Financial Articles", value: "200+" },
    { label: "Free Tools", value: "15+" },
    { label: "Years of Experience", value: "5+" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary/20">
      <div className="container py-12">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">About Peso Power</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            We're on a mission to help every Filipino achieve financial freedom through education, practical tools, and culturally relevant advice.
          </p>
        </div>

        {/* Mission Statement */}
        <div className="bg-card rounded-lg p-8 mb-12">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
            <p className="text-lg text-muted-foreground max-w-4xl mx-auto leading-relaxed">
              To democratize financial literacy in the Philippines by providing accessible, practical, and culturally relevant financial education that empowers Filipino families to build wealth, secure their future, and break the cycle of financial struggle.
            </p>
          </div>
        </div>

        {/* Values */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-center mb-8">Our Values</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {values.map((value, index) => (
              <Card key={index} className="text-center">
                <CardHeader>
                  <div className="flex justify-center mb-4">
                    {value.icon}
                  </div>
                  <CardTitle className="text-xl">{value.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    {value.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="bg-primary/5 rounded-lg p-8 mb-12">
          <h2 className="text-2xl font-bold text-center mb-8">Our Impact</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Story */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div>
            <h2 className="text-2xl font-bold mb-4">Our Story</h2>
            <p className="text-muted-foreground mb-4">
              Peso Power was born from the recognition that most financial advice available to Filipinos was either too generic or focused on Western financial systems that don't apply to our unique economic environment.
            </p>
            <p className="text-muted-foreground mb-4">
              We understand the challenges of managing finances with irregular income, supporting extended family, dealing with limited investment options, and navigating complex government benefits like SSS and GSIS.
            </p>
            <p className="text-muted-foreground">
              Our team of Filipino financial experts, economists, and educators work together to create content that speaks directly to your experience and provides solutions that actually work in the Philippine context.
            </p>
          </div>
          <div className="bg-gradient-to-br from-primary/10 to-accent/10 rounded-lg p-6 flex items-center justify-center">
            <div className="text-center">
              <div className="text-4xl mb-4">🇵🇭</div>
              <h3 className="text-xl font-semibold mb-2">Proudly Filipino</h3>
              <p className="text-muted-foreground">
                Built by Filipinos, for Filipinos
              </p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center bg-card rounded-lg p-8">
          <h2 className="text-2xl font-bold mb-4">Join Our Community</h2>
          <p className="text-muted-foreground mb-6">
            Connect with thousands of Filipinos on their journey to financial freedom.
          </p>
          <Button size="lg" className="mr-4">
            Join Our Newsletter
          </Button>
          <Button variant="outline" size="lg">
            Follow on Social Media
          </Button>
        </div>
      </div>
    </div>
  );
};

export default About;