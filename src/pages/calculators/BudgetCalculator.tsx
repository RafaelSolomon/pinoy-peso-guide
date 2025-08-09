import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const BudgetCalculator = () => {
  const [monthlyIncome, setMonthlyIncome] = useState("");
  const [results, setResults] = useState(null);

  const calculateBudget = () => {
    const income = parseFloat(monthlyIncome);
    if (income > 0) {
      setResults({
        needs: income * 0.5,
        wants: income * 0.3,
        savings: income * 0.2,
        total: income
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
            <h1 className="text-3xl font-bold">Budget Calculator</h1>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>50/30/20 Budget Rule</CardTitle>
              <CardDescription>
                Calculate your ideal budget allocation based on the popular 50/30/20 rule adapted for Filipino families.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="income">Monthly Income (₱)</Label>
                <Input
                  id="income"
                  type="number"
                  placeholder="Enter your monthly income"
                  value={monthlyIncome}
                  onChange={(e) => setMonthlyIncome(e.target.value)}
                />
              </div>

              <Button onClick={calculateBudget} className="w-full">
                Calculate Budget
              </Button>

              {results && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                  <Card className="bg-primary/5">
                    <CardContent className="p-4 text-center">
                      <h3 className="font-semibold text-primary">Needs (50%)</h3>
                      <p className="text-2xl font-bold">₱{results.needs.toLocaleString()}</p>
                      <p className="text-sm text-muted-foreground">Rent, food, utilities</p>
                    </CardContent>
                  </Card>
                  <Card className="bg-accent/5">
                    <CardContent className="p-4 text-center">
                      <h3 className="font-semibold text-accent">Wants (30%)</h3>
                      <p className="text-2xl font-bold">₱{results.wants.toLocaleString()}</p>
                      <p className="text-sm text-muted-foreground">Entertainment, dining out</p>
                    </CardContent>
                  </Card>
                  <Card className="bg-success/5">
                    <CardContent className="p-4 text-center">
                      <h3 className="font-semibold text-success">Savings (20%)</h3>
                      <p className="text-2xl font-bold">₱{results.savings.toLocaleString()}</p>
                      <p className="text-sm text-muted-foreground">Emergency fund, investments</p>
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

export default BudgetCalculator;