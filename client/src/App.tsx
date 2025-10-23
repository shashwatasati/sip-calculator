import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Home from "@/pages/home";
import SIPCalculator from "@/pages/sip-calculator";
import SIPStepUpCalculator from "@/pages/sip-stepup-calculator";
import LumpSumCalculator from "@/pages/lumpsum-calculator";
import SWPCalculator from "@/pages/swp-calculator";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/sip" component={SIPCalculator} />
      <Route path="/sip-stepup" component={SIPStepUpCalculator} />
      <Route path="/lumpsum" component={LumpSumCalculator} />
      <Route path="/swp" component={SWPCalculator} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
