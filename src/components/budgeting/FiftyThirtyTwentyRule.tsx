import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calculator } from "lucide-react";
import { Link } from "react-router-dom";
import { useFinancialProfile } from "@/hooks/useFinancialProfile";

const FiftyThirtyTwentyRule = () => {
  const { preFillData, updateProfile } = useFinancialProfile('budget-calculator');
  const [income, setIncome] = useState("");
  const [incomeFrequency, setIncomeFrequency] = useState("monthly");
  const [actualNeeds, setActualNeeds] = useState("");
  const [actualWants, setActualWants] = useState("");
  const [actualSavings, setActualSavings] = useState("");
  const [results, setResults] = useState<any>(null);

  // Auto-fill from financial profile
  useEffect(() => {
    if (preFillData.monthlyIncome && !income) {
      setIncome(preFillData.monthlyIncome.toString());
    }
  }, [preFillData, income]);

  const convertToMonthlyIncome = (amount: number, frequency: string) => {
    switch (frequency) {
      case 'daily': return amount * 30; // Assume 30 working days
      case 'weekly': return amount * 4.33; // Average weeks per month
      case 'bi-weekly': return amount * 2.17; // Average bi-weekly periods per month
      case 'monthly': return amount;
      default: return amount;
    }
  };

  const calculateBudget = () => {
    const inputIncome = parseFloat(income);
    if (inputIncome > 0) {
      const monthlyIncome = convertToMonthlyIncome(inputIncome, incomeFrequency);
      const idealNeeds = monthlyIncome * 0.5;
      const idealWants = monthlyIncome * 0.3;
      const idealSavings = monthlyIncome * 0.2;
      
      const actual = {
        needs: parseFloat(actualNeeds) || 0,
        wants: parseFloat(actualWants) || 0,
        savings: parseFloat(actualSavings) || 0
      };

      const budgetResults = {
        income: monthlyIncome,
        ideal: { needs: idealNeeds, wants: idealWants, savings: idealSavings },
        actual,
        variance: {
          needs: actual.needs - idealNeeds,
          wants: actual.wants - idealWants,
          savings: actual.savings - idealSavings
        },
        percentages: {
          needs: (actual.needs / monthlyIncome) * 100,
          wants: (actual.wants / monthlyIncome) * 100,
          savings: (actual.savings / monthlyIncome) * 100
        }
      };

      setResults(budgetResults);

      // Update financial profile
      updateProfile({
        income: monthlyIncome,
        needs: actual.needs,
        wants: actual.wants,
        savings: actual.savings
      }, 'budget-calculator');
    }
  };

  const getVarianceColor = (variance: number) => {
    if (variance > 0) return "text-destructive";
    if (variance < 0) return "text-success";
    return "text-foreground";
  };

  const getProgressColor = (category: string, percentage: number) => {
    const thresholds = { needs: 50, wants: 30, savings: 20 };
    const threshold = thresholds[category as keyof typeof thresholds];
    
    if (percentage <= threshold) return "bg-success";
    if (percentage <= threshold * 1.2) return "bg-warning";
    return "bg-destructive";
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <Calculator className="h-5 w-5 text-primary" />
          <CardTitle>50/30/20 Budget Rule</CardTitle>
        </div>
        <CardDescription>
          The gold standard for budgeting: 50% needs, 30% wants, 20% savings/debt repayment
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid gap-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="income">Income Amount (₱)</Label>
              <Input
                id="income"
                type="number"
                placeholder="Enter your income amount"
                value={income}
                onChange={(e) => setIncome(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="frequency">Income Frequency</Label>
              <Select value={incomeFrequency} onValueChange={setIncomeFrequency}>
                <SelectTrigger>
                  <SelectValue placeholder="Select frequency" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="daily">Daily Income</SelectItem>
                  <SelectItem value="weekly">Weekly Income</SelectItem>
                  <SelectItem value="bi-weekly">Bi-Weekly Income</SelectItem>
                  <SelectItem value="monthly">Monthly Income</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="grid md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="needs">Actual Needs (₱)</Label>
              <Input
                id="needs"
                type="number"
                placeholder="Rent, food, utilities"
                value={actualNeeds}
                onChange={(e) => setActualNeeds(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="wants">Actual Wants (₱)</Label>
              <Input
                id="wants"
                type="number"
                placeholder="Entertainment, dining"
                value={actualWants}
                onChange={(e) => setActualWants(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="savings">Actual Savings (₱)</Label>
              <Input
                id="savings"
                type="number"
                placeholder="Emergency, investments"
                value={actualSavings}
                onChange={(e) => setActualSavings(e.target.value)}
              />
            </div>
          </div>
        </div>

        <Button onClick={calculateBudget} className="w-full">
          Analyze My Budget
        </Button>

        {results && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm font-medium">Needs</span>
                  <span className="text-sm">{results.percentages.needs.toFixed(1)}%</span>
                </div>
                <Progress 
                  value={Math.min(results.percentages.needs, 100)} 
                  className="h-2"
                />
                <div className="flex justify-between text-xs">
                  <span>₱{results.actual.needs.toLocaleString()}</span>
                  <span className="text-muted-foreground">Target: ₱{results.ideal.needs.toLocaleString()}</span>
                </div>
                <div className={`text-xs ${getVarianceColor(results.variance.needs)}`}>
                  {results.variance.needs > 0 ? '+' : ''}₱{results.variance.needs.toLocaleString()} vs ideal
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm font-medium">Wants</span>
                  <span className="text-sm">{results.percentages.wants.toFixed(1)}%</span>
                </div>
                <Progress 
                  value={Math.min(results.percentages.wants, 100)} 
                  className="h-2"
                />
                <div className="flex justify-between text-xs">
                  <span>₱{results.actual.wants.toLocaleString()}</span>
                  <span className="text-muted-foreground">Target: ₱{results.ideal.wants.toLocaleString()}</span>
                </div>
                <div className={`text-xs ${getVarianceColor(results.variance.wants)}`}>
                  {results.variance.wants > 0 ? '+' : ''}₱{results.variance.wants.toLocaleString()} vs ideal
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm font-medium">Savings</span>
                  <span className="text-sm">{results.percentages.savings.toFixed(1)}%</span>
                </div>
                <Progress 
                  value={Math.min(results.percentages.savings, 100)} 
                  className="h-2"
                />
                <div className="flex justify-between text-xs">
                  <span>₱{results.actual.savings.toLocaleString()}</span>
                  <span className="text-muted-foreground">Target: ₱{results.ideal.savings.toLocaleString()}</span>
                </div>
                <div className={`text-xs ${getVarianceColor(results.variance.savings)}`}>
                  {results.variance.savings > 0 ? '+' : ''}₱{results.variance.savings.toLocaleString()} vs ideal
                </div>
              </div>
            </div>

            <div className="flex gap-2">
              <Button asChild variant="outline" size="sm">
                <Link to="/tools/budget-calculator">Use Full Calculator</Link>
              </Button>
              <Button asChild variant="outline" size="sm">
                <Link to="/tools/emergency-fund-calculator">Plan Emergency Fund</Link>
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default FiftyThirtyTwentyRule;