import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import Home from "@/pages/home";
import SIPCalculator from "@/pages/sip-calculator";
import SIPStepUpCalculator from "@/pages/sip-stepup-calculator";
import LumpSumCalculator from "@/pages/lumpsum-calculator";
import SWPCalculator from "@/pages/swp-calculator";
import Comparison from "@/pages/comparison";
import History from "@/pages/history";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/sip" component={SIPCalculator} />
      <Route path="/sip-stepup" component={SIPStepUpCalculator} />
      <Route path="/lumpsum" component={LumpSumCalculator} />
      <Route path="/swp" component={SWPCalculator} />
      <Route path="/compare" component={Comparison} />
      <Route path="/history" component={History} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <div className="flex flex-col min-h-screen">
          <Header />
          <div className="flex-1">
            <Router />
          </div>
          <Footer />
        </div>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
