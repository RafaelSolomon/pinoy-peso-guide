import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/components/ThemeProvider";
import { useState } from "react";
import Index from "./pages/Index";
import Budgeting from "./pages/Budgeting";
import Investing from "./pages/Investing";
import Tools from "./pages/Tools";
import Insurance from "./pages/Insurance";
import About from "./pages/About";
import NotFound from "./pages/NotFound";
import Header from "./components/Header";

const App = () => {
  const [queryClient] = useState(() => new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 1000 * 60 * 5, // 5 minutes
        retry: 1,
      },
    },
  }));

  return (
    <ThemeProvider defaultTheme="system" storageKey="pesowwise-theme">
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Header />
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/budgeting" element={<Budgeting />} />
              <Route path="/investing" element={<Investing />} />
              <Route path="/tools" element={<Tools />} />
              <Route path="/insurance" element={<Insurance />} />
              <Route path="/about" element={<About />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
};

export default App;
