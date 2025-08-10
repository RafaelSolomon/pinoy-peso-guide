import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { useFinancialProfile } from "@/hooks/useFinancialProfile";
import SmartRecommendations from "@/components/SmartRecommendations";

const EmergencyFundCalculator = () => {
  const { preFillData, updateProfile } = useFinancialProfile('emergency-fund-calculator');
  const [monthlyExpenses, setMonthlyExpenses] = useState("");
  const [currentSavings, setCurrentSavings] = useState("");
  const [results, setResults] = useState(null);

  // Auto-fill from profile when available
  useEffect(() => {
    if (preFillData.monthlyExpenses && !monthlyExpenses) {
      setMonthlyExpenses(preFillData.monthlyExpenses.toString());
    }
    if (preFillData.currentSavings && !currentSavings) {
      setCurrentSavings(preFillData.currentSavings.toString());
    }
  }, [preFillData, monthlyExpenses, currentSavings]);

  const calculateEmergencyFund = () => {
    const expenses = parseFloat(monthlyExpenses);
    const savings = parseFloat(currentSavings) || 0;
    
    if (expenses > 0) {
      const threeMonths = expenses * 3;
      const sixMonths = expenses * 6;
      const twelveMonths = expenses * 12;
      const shortfall = Math.max(0, threeMonths - savings);
      const targetShortfall = Math.max(0, sixMonths - savings);
      const monthlyContribution = expenses * 0.1; // 10% of expenses suggested
      
      const emergencyResults = {
        basic: threeMonths,
        recommended: sixMonths,
        ideal: twelveMonths,
        current: savings,
        shortfall,
        targetShortfall,
        monthsToGoal: shortfall > 0 ? Math.ceil(shortfall / monthlyContribution) : 0,
        monthlyExpenses: expenses
      };
      
      setResults(emergencyResults);
      
      // Update financial profile
      updateProfile({
        goal: sixMonths,
        current: savings,
        monthlyContribution: monthlyContribution
      }, 'emergency-fund-calculator');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary/20">
      <div className="container py-12">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center mb-6">
            <Button asChild variant="ghost" size="icon" className="mr-4">
              <Link to="/tools">
                <ArrowLeft className="h-4 w-4" />
              </Link>
            </Button>
            <h1 className="text-3xl font-bold">Emergency Fund Calculator</h1>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Build Your Safety Net</CardTitle>
                  <CardDescription>
                    Calculate how much you should save for unexpected expenses like job loss or medical emergencies.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="expenses">Monthly Expenses (₱)</Label>
                      <Input
                        id="expenses"
                        type="number"
                        placeholder="Enter your monthly expenses"
                        value={monthlyExpenses}
                        onChange={(e) => setMonthlyExpenses(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="savings">Current Savings (₱)</Label>
                      <Input
                        id="savings"
                        type="number"
                        placeholder="Enter current emergency savings"
                        value={currentSavings}
                        onChange={(e) => setCurrentSavings(e.target.value)}
                      />
                    </div>
                  </div>

                  <Button onClick={calculateEmergencyFund} className="w-full">
                    Calculate Emergency Fund
                  </Button>

                  {results && (
                    <div className="space-y-4 mt-6">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <Card className="bg-warning/5">
                          <CardContent className="p-4 text-center">
                            <h3 className="font-semibold text-warning">Basic (3 months)</h3>
                            <p className="text-xl font-bold">₱{results.basic.toLocaleString()}</p>
                            <p className="text-sm text-muted-foreground">Minimum protection</p>
                          </CardContent>
                        </Card>
                        <Card className="bg-success/5">
                          <CardContent className="p-4 text-center">
                            <h3 className="font-semibold text-success">Recommended (6 months)</h3>
                            <p className="text-xl font-bold">₱{results.recommended.toLocaleString()}</p>
                            <p className="text-sm text-muted-foreground">Good protection</p>
                          </CardContent>
                        </Card>
                        <Card className="bg-primary/5">
                          <CardContent className="p-4 text-center">
                            <h3 className="font-semibold text-primary">Ideal (12 months)</h3>
                            <p className="text-xl font-bold">₱{results.ideal.toLocaleString()}</p>
                            <p className="text-sm text-muted-foreground">Maximum security</p>
                          </CardContent>
                        </Card>
                      </div>
                      
                      {results.current > 0 && (
                        <Card className="bg-accent/5">
                          <CardContent className="p-4">
                            <h4 className="font-semibold mb-2">Your Progress:</h4>
                            <div className="space-y-2">
                              <div className="flex justify-between text-sm">
                                <span>Current Savings:</span>
                                <span className="font-medium">₱{results.current.toLocaleString()}</span>
                              </div>
                              {results.shortfall > 0 && (
                                <div className="flex justify-between text-sm">
                                  <span>Still Need (Basic):</span>
                                  <span className="font-medium text-warning">₱{results.shortfall.toLocaleString()}</span>
                                </div>
                              )}
                              {results.targetShortfall > 0 && (
                                <div className="flex justify-between text-sm">
                                  <span>Still Need (Recommended):</span>
                                  <span className="font-medium text-primary">₱{results.targetShortfall.toLocaleString()}</span>
                                </div>
                              )}
                            </div>
                          </CardContent>
                        </Card>
                      )}
                      
                      <Card className="bg-muted/5">
                        <CardContent className="p-4">
                          <h4 className="font-semibold mb-2">Savings Tips:</h4>
                          <ul className="text-sm space-y-1">
                            <li>• Start with a goal of ₱1,000 for your first emergency fund</li>
                            <li>• Save ₱{Math.round(results.recommended / 24).toLocaleString()} monthly to reach 6 months in 2 years</li>
                            <li>• Keep emergency funds in a separate high-yield savings account</li>
                            <li>• Consider money market or time deposits for better returns</li>
                          </ul>
                        </CardContent>
                      </Card>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
            
            <div className="space-y-4">
              <SmartRecommendations 
                toolContext="emergency-fund-calculator" 
                maxRecommendations={2} 
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmergencyFundCalculator;