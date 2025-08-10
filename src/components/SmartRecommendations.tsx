import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, TrendingUp, Shield, DollarSign, Home, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { profileEngine, SmartRecommendation, RiskFlag } from "@/lib/profileEngine";

interface SmartRecommendationsProps {
  toolContext?: string;
  showRiskFlags?: boolean;
  maxRecommendations?: number;
}

const SmartRecommendations = ({ 
  toolContext, 
  showRiskFlags = true, 
  maxRecommendations = 3 
}: SmartRecommendationsProps) => {
  const [recommendations, setRecommendations] = useState<SmartRecommendation[]>([]);
  const [riskFlags, setRiskFlags] = useState<RiskFlag[]>([]);
  const [profile, setProfile] = useState(profileEngine.getProfile());

  useEffect(() => {
    // Load persisted profile on mount
    profileEngine.loadPersistedProfile();
    const currentProfile = profileEngine.getProfile();
    setProfile(currentProfile);

    if (currentProfile) {
      if (toolContext) {
        setRecommendations(profileEngine.getRecommendationsForTool(toolContext));
      }
      setRiskFlags(currentProfile.riskFlags);
    }
  }, [toolContext]);

  if (!profile && !toolContext) {
    return (
      <Card className="bg-gradient-to-br from-primary/5 to-accent/5 border-primary/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-primary" />
            Smart Financial Insights
          </CardTitle>
          <CardDescription>
            Use our financial tools to get personalized recommendations and insights.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button asChild variant="outline" className="w-full">
            <Link to="/tools">Start with Budget Calculator</Link>
          </Button>
        </CardContent>
      </Card>
    );
  }

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case 'high': return <AlertTriangle className="h-4 w-4" />;
      case 'medium': return <TrendingUp className="h-4 w-4" />;
      default: return <CheckCircle className="h-4 w-4" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'destructive';
      case 'medium': return 'warning';
      default: return 'success';
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'destructive';
      case 'high': return 'warning';
      case 'medium': return 'accent';
      default: return 'muted';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'housing': return <Home className="h-4 w-4" />;
      case 'savings': return <Shield className="h-4 w-4" />;
      case 'debt': return <DollarSign className="h-4 w-4" />;
      default: return <TrendingUp className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-4">
      {/* Risk Flags */}
      {showRiskFlags && riskFlags.length > 0 && (
        <Card className="border-warning/50 bg-warning/5">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-warning">
              <AlertTriangle className="h-5 w-5" />
              Financial Risk Alerts
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {riskFlags.map((flag, index) => (
              <div key={index} className="flex items-start space-x-3 p-3 rounded-lg bg-background/50">
                <Badge variant={getSeverityColor(flag.severity) as any} className="mt-0.5">
                  {flag.severity.toUpperCase()}
                </Badge>
                <div className="flex-1">
                  <p className="font-medium text-sm">{flag.message}</p>
                  <p className="text-xs text-muted-foreground mt-1">{flag.recommendation}</p>
                  {flag.affectedTools.length > 0 && (
                    <p className="text-xs text-muted-foreground mt-1">
                      Affects: {flag.affectedTools.join(', ')}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {/* Smart Recommendations */}
      {recommendations.length > 0 && (
        <Card className="bg-gradient-to-br from-success/5 to-primary/5 border-success/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-success">
              <TrendingUp className="h-5 w-5" />
              Smart Recommendations
            </CardTitle>
            <CardDescription>
              Personalized suggestions based on your financial profile
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {recommendations.slice(0, maxRecommendations).map((rec) => (
              <div key={rec.id} className="flex items-start space-x-3 p-4 rounded-lg bg-background/50 border border-border/50">
                <div className="flex items-center gap-2">
                  {getCategoryIcon(rec.category)}
                  <Badge variant={getPriorityColor(rec.priority) as any} className="text-xs">
                    {rec.priority.toUpperCase()}
                  </Badge>
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-sm">{rec.title}</h4>
                  <p className="text-xs text-muted-foreground mt-1">{rec.description}</p>
                  {rec.deadline && (
                    <p className="text-xs text-accent font-medium mt-1">
                      Deadline: {rec.deadline.toLocaleDateString()}
                    </p>
                  )}
                </div>
                {rec.actionUrl && (
                  <Button asChild size="sm" variant="outline">
                    <Link to={rec.actionUrl}>Take Action</Link>
                  </Button>
                )}
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {/* Financial Snapshot */}
      {profile && (
        <Card className="bg-gradient-to-br from-muted/50 to-accent/5">
          <CardHeader>
            <CardTitle className="text-sm">Financial Snapshot</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="grid grid-cols-2 gap-4 text-xs">
              <div>
                <p className="text-muted-foreground">Monthly Income</p>
                <p className="font-semibold">₱{profile.income.monthlyNet.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-muted-foreground">DTI Ratio</p>
                <p className="font-semibold">{(profile.debt.dtiRatio * 100).toFixed(1)}%</p>
              </div>
              <div>
                <p className="text-muted-foreground">Emergency Fund</p>
                <p className="font-semibold">₱{profile.savings.emergencyFund.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Total Debt</p>
                <p className="font-semibold">₱{profile.debt.totalDebt.toLocaleString()}</p>
              </div>
            </div>
            <div className="pt-2 border-t border-border/50">
              <p className="text-xs text-muted-foreground">
                Last updated: {profile.lastUpdated.toLocaleDateString()}
              </p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default SmartRecommendations;