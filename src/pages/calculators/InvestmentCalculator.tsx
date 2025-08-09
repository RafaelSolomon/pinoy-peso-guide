import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const InvestmentCalculator = () => {
  const [initialAmount, setInitialAmount] = useState("");
  const [monthlyContribution, setMonthlyContribution] = useState("");
  const [annualReturn, setAnnualReturn] = useState("8");
  const [years, setYears] = useState("10");
  const [results, setResults] = useState(null);

  const calculateInvestment = () => {
    const initial = parseFloat(initialAmount) || 0;
    const monthly = parseFloat(monthlyContribution) || 0;
    const rate = parseFloat(annualReturn) / 100;
    const time = parseFloat(years);

    if (time > 0) {
      // Future value of initial investment
      const futureInitial = initial * Math.pow(1 + rate, time);
      
      // Future value of monthly contributions
      const monthlyRate = rate / 12;
      const months = time * 12;
      const futureMonthly = monthly * (Math.pow(1 + monthlyRate, months) - 1) / monthlyRate;
      
      const totalContributions = initial + (monthly * months);
      const totalValue = futureInitial + futureMonthly;
      const totalGains = totalValue - totalContributions;

      setResults({
        totalValue,
        totalContributions,
        totalGains,
        initial,
        monthly,
        years: time
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
            <h1 className="text-3xl font-bold">Investment Growth Calculator</h1>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Compound Interest Calculator</CardTitle>
              <CardDescription>
                See how your investments can grow over time with the power of compound interest.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="initial">Initial Investment (₱)</Label>
                  <Input
                    id="initial"
                    type="number"
                    placeholder="0"
                    value={initialAmount}
                    onChange={(e) => setInitialAmount(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="monthly">Monthly Contribution (₱)</Label>
                  <Input
                    id="monthly"
                    type="number"
                    placeholder="0"
                    value={monthlyContribution}
                    onChange={(e) => setMonthlyContribution(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="return">Expected Annual Return (%)</Label>
                  <Input
                    id="return"
                    type="number"
                    step="0.1"
                    value={annualReturn}
                    onChange={(e) => setAnnualReturn(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="years">Investment Period (years)</Label>
                  <Input
                    id="years"
                    type="number"
                    value={years}
                    onChange={(e) => setYears(e.target.value)}
                  />
                </div>
              </div>

              <Button onClick={calculateInvestment} className="w-full">
                Calculate Investment Growth
              </Button>

              {results && (
                <div className="space-y-4 mt-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Card className="bg-primary/5">
                      <CardContent className="p-4 text-center">
                        <h3 className="font-semibold text-primary">Total Value</h3>
                        <p className="text-2xl font-bold">₱{results.totalValue.toLocaleString()}</p>
                        <p className="text-sm text-muted-foreground">After {results.years} years</p>
                      </CardContent>
                    </Card>
                    <Card className="bg-accent/5">
                      <CardContent className="p-4 text-center">
                        <h3 className="font-semibold text-accent">Total Contributions</h3>
                        <p className="text-xl font-bold">₱{results.totalContributions.toLocaleString()}</p>
                        <p className="text-sm text-muted-foreground">Your money invested</p>
                      </CardContent>
                    </Card>
                    <Card className="bg-success/5">
                      <CardContent className="p-4 text-center">
                        <h3 className="font-semibold text-success">Investment Gains</h3>
                        <p className="text-xl font-bold">₱{results.totalGains.toLocaleString()}</p>
                        <p className="text-sm text-muted-foreground">Compound interest earned</p>
                      </CardContent>
                    </Card>
                  </div>
                  
                  <Card className="bg-success/5">
                    <CardContent className="p-4">
                      <h4 className="font-semibold mb-2">Investment Options in the Philippines:</h4>
                      <ul className="text-sm space-y-1">
                        <li>• <strong>Stock Market (PSE):</strong> 8-12% historical returns</li>
                        <li>• <strong>Mutual Funds:</strong> 6-10% depending on fund type</li>
                        <li>• <strong>UITF:</strong> 4-8% for balanced funds</li>
                        <li>• <strong>Government Bonds:</strong> 4-6% stable returns</li>
                        <li>• <strong>Pag-IBIG MP2:</strong> 5-8% dividend rate</li>
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

export default InvestmentCalculator;