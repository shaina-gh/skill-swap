import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium transition-smooth focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary-hover shadow-lg hover:shadow-neon hover:scale-105",
        destructive:
          "bg-status-error text-white hover:bg-status-error/90 shadow-lg",
        outline:
          "border border-card-border bg-card hover:bg-card-glass hover:border-neon-blue/50",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary-hover shadow-md",
        ghost: "hover:bg-card hover:bg-opacity-80",
        link: "text-neon-blue underline-offset-4 hover:underline hover:text-neon-purple",
        neon: "bg-gradient-primary text-white shadow-neon hover:scale-105 font-semibold",
        glass: "bg-card-glass backdrop-blur-sm border border-card-border hover:bg-card hover:border-neon-blue/50",
        success: "bg-status-success text-white hover:bg-status-success/90 shadow-lg",
        warning: "bg-status-warning text-primary-foreground hover:bg-status-warning/90 shadow-lg",
      },
      size: {
        default: "h-11 px-6 py-2",
        sm: "h-9 rounded-md px-4 text-xs",
        lg: "h-12 rounded-lg px-8 text-base",
        icon: "h-11 w-11",
        xl: "h-14 rounded-xl px-10 text-lg font-semibold",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
