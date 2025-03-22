
import React from 'react';
import { Link } from 'react-router-dom';
import Button from './Button';
import { cn } from '@/lib/utils';

interface LinkButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  className?: string;
  isLoading?: boolean;
  to: string;
}

const LinkButton = React.forwardRef<HTMLButtonElement, LinkButtonProps>(
  ({ variant = 'primary', size = 'md', children, className, isLoading, to, ...props }, ref) => {
    // Use all the styling from the Button component
    const baseStyles = "relative inline-flex items-center justify-center rounded-md font-medium transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-background disabled:pointer-events-none disabled:opacity-50";
    
    const variantStyles = {
      primary: "bg-primary text-primary-foreground hover:bg-primary/90 shadow-md",
      secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
      outline: "border border-primary bg-transparent text-primary hover:bg-primary/10",
      ghost: "bg-transparent text-foreground hover:bg-muted"
    };
    
    const sizeStyles = {
      sm: "text-xs px-3 py-1.5",
      md: "text-sm px-4 py-2",
      lg: "text-base px-6 py-3"
    };

    return (
      <Link 
        to={to}
        className={cn(
          baseStyles,
          variantStyles[variant],
          sizeStyles[size],
          isLoading && "cursor-not-allowed",
          className
        )}
        {...props}
      >
        {isLoading && (
          <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            <svg 
              className="animate-spin -ml-1 mr-2 h-4 w-4 text-current" 
              xmlns="http://www.w3.org/2000/svg" 
              fill="none" 
              viewBox="0 0 24 24"
            >
              <circle 
                className="opacity-25" 
                cx="12" 
                cy="12" 
                r="10" 
                stroke="currentColor" 
                strokeWidth="4"
              ></circle>
              <path 
                className="opacity-75" 
                fill="currentColor" 
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
          </span>
        )}
        <span className={isLoading ? "opacity-0" : ""}>{children}</span>
      </Link>
    );
  }
);

LinkButton.displayName = "LinkButton";

export default LinkButton;
