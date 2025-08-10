import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, Shield, BookOpen, Calculator, Users, Star } from "lucide-react";
import { Link } from "react-router-dom";
import SmartRecommendations from "@/components/SmartRecommendations";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary via-primary-light to-accent pt-16 pb-24">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.1%22%3E%3Cpath%20d%3D%22M36%2034v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6%2034v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6%204V0H4v4H0v2h4v4h2V6h4V4H6z%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-30"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Badge variant="secondary" className="mb-6 bg-white/20 text-white border-white/30 hover:bg-white/30">
              🇵🇭 Your Complete Filipino Finance Guide
            </Badge>
            
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
              Master Your
              <span className="block bg-gradient-to-r from-accent to-accent-light bg-clip-text text-transparent">
                Peso Power
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto leading-relaxed">
              Navigate the Philippine financial landscape with confidence. From budgeting basics to investment strategies tailored for Filipino families.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-white text-primary hover:bg-white/90 shadow-lg">
                <Link to="/budgeting">Start Your Journey</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                <Link to="/about">Learn More</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Smart Recommendations Section */}
      <section className="py-12 bg-gradient-to-br from-muted/30 to-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <SmartRecommendations showRiskFlags={true} maxRecommendations={3} />
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Everything You Need to Know About Money
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Comprehensive financial education designed specifically for Filipino families and individuals.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Link to="/budgeting" className="block">
              <Card className="group hover:shadow-card transition-all duration-300 border-border/50 hover:border-primary/20 cursor-pointer h-full">
                <CardHeader>
                  <div className="w-12 h-12 bg-gradient-to-br from-primary to-primary-light rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <BookOpen className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle className="text-xl">Budgeting Basics</CardTitle>
                  <CardDescription>
                    Learn practical budgeting strategies that work with Filipino income patterns and expenses.
                  </CardDescription>
                </CardHeader>
              </Card>
            </Link>

            <Link to="/investing" className="block">
              <Card className="group hover:shadow-card transition-all duration-300 border-border/50 hover:border-success/20 cursor-pointer h-full">
                <CardHeader>
                  <div className="w-12 h-12 bg-gradient-to-br from-success to-success-light rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <TrendingUp className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle className="text-xl">Investment Guide</CardTitle>
                  <CardDescription>
                    Discover investment opportunities in the Philippines from stocks to real estate and OFW options.
                  </CardDescription>
                </CardHeader>
              </Card>
            </Link>

            <Link to="/tools" className="block">
              <Card className="group hover:shadow-card transition-all duration-300 border-border/50 hover:border-accent/20 cursor-pointer h-full">
                <CardHeader>
                  <div className="w-12 h-12 bg-gradient-to-br from-accent to-accent-light rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <Calculator className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle className="text-xl">Financial Tools</CardTitle>
                  <CardDescription>
                    Interactive calculators for loans, savings, and retirement planning with peso-specific features.
                  </CardDescription>
                </CardHeader>
              </Card>
            </Link>

            <Link to="/insurance" className="block">
              <Card className="group hover:shadow-card transition-all duration-300 border-border/50 hover:border-primary/20 cursor-pointer h-full">
                <CardHeader>
                  <div className="w-12 h-12 bg-gradient-to-br from-primary to-primary-light rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <Shield className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle className="text-xl">Insurance & Protection</CardTitle>
                  <CardDescription>
                    Understand insurance options, health coverage, and financial protection for your family.
                  </CardDescription>
                </CardHeader>
              </Card>
            </Link>

            <Link to="/about" className="block">
              <Card className="group hover:shadow-card transition-all duration-300 border-border/50 hover:border-accent/20 cursor-pointer h-full">
                <CardHeader>
                  <div className="w-12 h-12 bg-gradient-to-br from-accent to-accent-light rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <Users className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle className="text-xl">Family Finance</CardTitle>
                  <CardDescription>
                    Special guidance for OFW families, multi-generational planning, and cultural considerations.
                  </CardDescription>
                </CardHeader>
              </Card>
            </Link>

            <Link to="/about" className="block">
              <Card className="group hover:shadow-card transition-all duration-300 border-border/50 hover:border-success/20 cursor-pointer h-full">
                <CardHeader>
                  <div className="w-12 h-12 bg-gradient-to-br from-success to-success-light rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <Star className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle className="text-xl">Expert Insights</CardTitle>
                  <CardDescription>
                    Learn from Filipino financial experts and real success stories from local families.
                  </CardDescription>
                </CardHeader>
              </Card>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-primary to-primary-light">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Transform Your Financial Future?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Join thousands of Filipino families who have already started their journey to financial freedom.
          </p>
          <Button asChild size="lg" className="bg-white text-primary hover:bg-white/90 shadow-lg">
            <Link to="/budgeting">Get Started Today</Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Index;