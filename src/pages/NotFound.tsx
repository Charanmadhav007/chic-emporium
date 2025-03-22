
import React from "react";
import { useLocation, Link } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import Button from "@/components/ui/Button";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const NotFound: React.FC = () => {
  const location = useLocation();

  React.useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-20 flex items-center">
        <div className="content-container py-16 text-center">
          <h1 className="text-9xl font-display font-bold mb-6 text-gradient">404</h1>
          <p className="text-2xl font-medium mb-8">Oops! This page doesn't exist.</p>
          <p className="text-muted-foreground max-w-md mx-auto mb-10">
            The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
          </p>
          <Button as={Link} to="/" size="lg">
            <ChevronLeft className="mr-2 h-5 w-5" /> Return to Home
          </Button>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default NotFound;
