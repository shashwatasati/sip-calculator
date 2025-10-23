import { Heart } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="border-t bg-card mt-auto" data-testid="footer">
      <div className="container mx-auto px-4 py-6 max-w-7xl">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <span>© {currentYear}</span>
            <a 
              href="https://shashwatasati.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="font-medium text-foreground hover:text-primary transition-colors"
              data-testid="link-website"
            >
              shashwatasati.com
            </a>
            <span>- All rights reserved</span>
          </div>
          
          <div className="flex items-center gap-1">
            <span>Made with</span>
            <Heart className="h-4 w-4 text-red-500 fill-red-500" />
            <span>by</span>
            <span className="font-medium text-foreground">Shashwat Asati</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
