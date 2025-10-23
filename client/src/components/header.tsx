import { Link } from "wouter";
import { Calculator } from "lucide-react";

export function Header() {
  return (
    <header className="border-b bg-card sticky top-0 z-50" data-testid="header">
      <div className="container mx-auto px-4 py-3 max-w-7xl">
        <div className="flex items-center justify-between">
          <Link href="/">
            <div className="flex items-center gap-3 hover-elevate active-elevate-2 rounded-lg px-3 py-2 -ml-3 transition-all cursor-pointer" data-testid="link-home">
              <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary text-primary-foreground">
                <Calculator className="w-6 h-6" />
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-lg leading-tight">Financial Calculators</span>
                <span className="text-xs text-muted-foreground">by Shashwat Asati</span>
              </div>
            </div>
          </Link>
          
          <a 
            href="https://shashwatasati.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors hidden sm:block"
            data-testid="link-website"
          >
            shashwatasati.com
          </a>
        </div>
      </div>
    </header>
  );
}
