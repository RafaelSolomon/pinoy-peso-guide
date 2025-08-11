import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Target, Plus, X } from "lucide-react";
import { Link } from "react-router-dom";

interface Goal {
  id: string;
  name: string;
  targetAmount: number;
  currentAmount: number;
  targetDate: string;
  priority: 'high' | 'medium' | 'low';
  category: string;
}

const GoalBasedBudgeting = () => {
  const [goals, setGoals] = useState<Goal[]>([
    {
      id: '1',
      name: 'Emergency Fund',
      targetAmount: 150000,
      currentAmount: 45000,
      targetDate: '2024-12-31',
      priority: 'high',
      category: 'Emergency'
    }
  ]);
  
  const [newGoal, setNewGoal] = useState({
    name: '',
    targetAmount: '',
    currentAmount: '',
    targetDate: '',
    priority: 'medium' as Goal['priority'],
    category: ''
  });

  const [showAddForm, setShowAddForm] = useState(false);

  const addGoal = () => {
    if (newGoal.name && newGoal.targetAmount && newGoal.targetDate) {
      const goal: Goal = {
        id: Date.now().toString(),
        name: newGoal.name,
        targetAmount: parseFloat(newGoal.targetAmount),
        currentAmount: parseFloat(newGoal.currentAmount) || 0,
        targetDate: newGoal.targetDate,
        priority: newGoal.priority,
        category: newGoal.category || 'Other'
      };
      
      setGoals([...goals, goal]);
      setNewGoal({
        name: '',
        targetAmount: '',
        currentAmount: '',
        targetDate: '',
        priority: 'medium',
        category: ''
      });
      setShowAddForm(false);
    }
  };

  const removeGoal = (id: string) => {
    setGoals(goals.filter(goal => goal.id !== id));
  };

  const calculateProgress = (goal: Goal) => {
    return Math.min((goal.currentAmount / goal.targetAmount) * 100, 100);
  };

  const calculateMonthlyRequired = (goal: Goal) => {
    const remaining = goal.targetAmount - goal.currentAmount;
    const targetDate = new Date(goal.targetDate);
    const monthsLeft = Math.max(1, Math.ceil((targetDate.getTime() - Date.now()) / (1000 * 60 * 60 * 24 * 30)));
    return remaining / monthsLeft;
  };

  const getPriorityColor = (priority: Goal['priority']) => {
    switch (priority) {
      case 'high': return 'destructive';
      case 'medium': return 'default';
      case 'low': return 'secondary';
    }
  };

  const totalRequired = goals.reduce((sum, goal) => sum + Math.max(0, calculateMonthlyRequired(goal)), 0);

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Target className="h-5 w-5 text-primary" />
            <div>
              <CardTitle>Goal-Based Budgeting</CardTitle>
              <CardDescription>
                Create specific budgets for your financial goals and track progress
              </CardDescription>
            </div>
          </div>
          <Button 
            onClick={() => setShowAddForm(!showAddForm)} 
            size="sm"
            variant="outline"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Goal
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {showAddForm && (
          <Card>
            <CardContent className="pt-6">
              <div className="grid gap-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="goalName">Goal Name</Label>
                    <Input
                      id="goalName"
                      placeholder="e.g., Vacation to Japan"
                      value={newGoal.name}
                      onChange={(e) => setNewGoal({...newGoal, name: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="category">Category</Label>
                    <Select value={newGoal.category} onValueChange={(value) => setNewGoal({...newGoal, category: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Emergency">Emergency Fund</SelectItem>
                        <SelectItem value="Travel">Travel</SelectItem>
                        <SelectItem value="Home">Home Purchase</SelectItem>
                        <SelectItem value="Education">Education</SelectItem>
                        <SelectItem value="Investment">Investment</SelectItem>
                        <SelectItem value="Other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="targetAmount">Target Amount (₱)</Label>
                    <Input
                      id="targetAmount"
                      type="number"
                      placeholder="100000"
                      value={newGoal.targetAmount}
                      onChange={(e) => setNewGoal({...newGoal, targetAmount: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="currentAmount">Current Amount (₱)</Label>
                    <Input
                      id="currentAmount"
                      type="number"
                      placeholder="0"
                      value={newGoal.currentAmount}
                      onChange={(e) => setNewGoal({...newGoal, currentAmount: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="targetDate">Target Date</Label>
                    <Input
                      id="targetDate"
                      type="date"
                      value={newGoal.targetDate}
                      onChange={(e) => setNewGoal({...newGoal, targetDate: e.target.value})}
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label>Priority</Label>
                  <Select value={newGoal.priority} onValueChange={(value: Goal['priority']) => setNewGoal({...newGoal, priority: value})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="high">High Priority</SelectItem>
                      <SelectItem value="medium">Medium Priority</SelectItem>
                      <SelectItem value="low">Low Priority</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="flex gap-2">
                  <Button onClick={addGoal}>Add Goal</Button>
                  <Button variant="outline" onClick={() => setShowAddForm(false)}>Cancel</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        <div className="space-y-4">
          {goals.map((goal) => (
            <Card key={goal.id}>
              <CardContent className="pt-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h4 className="font-semibold">{goal.name}</h4>
                      <Badge variant={getPriorityColor(goal.priority)} className="text-xs">
                        {goal.priority} priority
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        {goal.category}
                      </Badge>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Progress: ₱{goal.currentAmount.toLocaleString()} / ₱{goal.targetAmount.toLocaleString()}</span>
                        <span>{calculateProgress(goal).toFixed(1)}%</span>
                      </div>
                      <Progress value={calculateProgress(goal)} className="h-2" />
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>Need monthly: ₱{calculateMonthlyRequired(goal).toLocaleString()}</span>
                        <span>Target: {new Date(goal.targetDate).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeGoal(goal.id)}
                    className="ml-4"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {goals.length > 0 && (
          <Card className="bg-accent/5">
            <CardContent className="pt-6">
              <div className="space-y-2">
                <h4 className="font-semibold">Monthly Budget Summary</h4>
                <div className="flex justify-between">
                  <span>Total Monthly Required:</span>
                  <span className="font-semibold">₱{totalRequired.toLocaleString()}</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  This is the total amount you need to save monthly to reach all your goals on time.
                </p>
              </div>
            </CardContent>
          </Card>
        )}

        <div className="flex gap-2">
          <Button asChild variant="outline" size="sm">
            <Link to="/tools/budget-calculator">Budget Calculator</Link>
          </Button>
          <Button asChild variant="outline" size="sm">
            <Link to="/tools/emergency-fund-calculator">Emergency Fund Tool</Link>
          </Button>
          <Button asChild variant="outline" size="sm">
            <Link to="/tools/investment-calculator">Investment Calculator</Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default GoalBasedBudgeting;