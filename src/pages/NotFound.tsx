import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Home, ArrowLeft } from "lucide-react";

const NotFound = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary/20 flex items-center justify-center">
      <div className="container">
        <div className="text-center max-w-2xl mx-auto">
          <div className="text-8xl font-bold text-primary/20 mb-4">404</div>
          <h1 className="text-4xl font-bold mb-4">Page Not Found</h1>
          <p className="text-xl text-muted-foreground mb-8">
            Oops! The page you're looking for doesn't exist. It might have been moved, deleted, or you entered the wrong URL.
          </p>
          
          <div className="space-y-4 sm:space-y-0 sm:space-x-4 sm:flex sm:justify-center">
            <Button asChild size="lg">
              <Link to="/">
                <Home className="mr-2 h-4 w-4" />
                Go Home
              </Link>
            </Button>
            <Button variant="outline" size="lg" onClick={() => window.history.back()}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Go Back
            </Button>
          </div>

          <div className="mt-12 p-6 bg-card rounded-lg">
            <h2 className="text-xl font-semibold mb-3">Looking for something specific?</h2>
            <div className="grid sm:grid-cols-2 gap-3 text-sm">
              <Link to="/budgeting" className="text-primary hover:underline">Budgeting Guide</Link>
              <Link to="/investing" className="text-primary hover:underline">Investment Options</Link>
              <Link to="/tools" className="text-primary hover:underline">Financial Tools</Link>
              <Link to="/insurance" className="text-primary hover:underline">Insurance Guide</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;