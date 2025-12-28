import { ButtonHTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "primary" | "secondary" | "outline" | "ghost";
    size?: "sm" | "md" | "lg";
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant = "primary", size = "md", ...props }, ref) => {
        return (
            <button
                className={cn(
                    "inline-flex items-center justify-center rounded-lg font-medium transition-all duration-200",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2",
                    "disabled:pointer-events-none disabled:opacity-50",
                    {
                        "shadow-sm": variant === "primary" || variant === "secondary",
                        "hover:opacity-90 active:opacity-100": true, // Generic hover effect
                    },
                    {
                        "px-3 py-1.5 text-sm": size === "sm",
                        "px-4 py-2 text-base": size === "md",
                        "px-6 py-3 text-lg": size === "lg",
                    },
                    className
                )}
                style={{
                    backgroundColor: variant === 'primary' ? 'var(--btn-primary-bg)' : variant === 'secondary' ? 'var(--btn-secondary-bg)' : undefined,
                    color: variant === 'primary' ? 'var(--btn-primary-text)' : variant === 'secondary' ? 'var(--btn-secondary-text)' : undefined,
                    borderColor: variant === 'outline' ? 'var(--primary-600)' : undefined, // Keep outline standard for now or add var
                }}
                ref={ref}
                {...props}
            />
        );
    }
);

Button.displayName = "Button";

export default Button;
