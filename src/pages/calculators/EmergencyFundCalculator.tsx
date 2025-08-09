import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const EmergencyFundCalculator = () => {
  const [monthlyExpenses, setMonthlyExpenses] = useState("");
  const [results, setResults] = useState(null);

  const calculateEmergencyFund = () => {
    const expenses = parseFloat(monthlyExpenses);
    if (expenses > 0) {
      setResults({
        basic: expenses * 3,
        recommended: expenses * 6,
        ideal: expenses * 12,
        monthlyExpenses: expenses
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary/20">
      <div className="container py-12">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center mb-6">
            <Button asChild variant="ghost" size="icon" className="mr-4">
              <Link to="/tools">
                <ArrowLeft className="h-4 w-4" />
              </Link>
            </Button>
            <h1 className="text-3xl font-bold">Emergency Fund Calculator</h1>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Build Your Safety Net</CardTitle>
              <CardDescription>
                Calculate how much you should save for unexpected expenses like job loss or medical emergencies.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
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
                  
                  <Card className="bg-accent/5">
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
      </div>
    </div>
  );
};

export default EmergencyFundCalculator;