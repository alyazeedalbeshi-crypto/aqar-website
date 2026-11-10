import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

type Variant = "primary" | "outline" | "outline-light" | "ghost";

const base =
  "inline-flex min-h-11 items-center justify-center gap-2 px-7 py-2.5 text-sm font-semibold transition-colors duration-200 disabled:cursor-not-allowed disabled:opacity-60";

const variants: Record<Variant, string> = {
  primary: "bg-navy-900 text-ivory-50 hover:bg-navy-700",
  outline: "border border-navy-900 text-navy-900 hover:bg-navy-900 hover:text-ivory-50",
  "outline-light": "border border-ivory-200/70 text-ivory-50 hover:bg-ivory-50 hover:text-navy-900",
  ghost: "text-navy-900 underline-offset-4 hover:underline px-0",
};

export function buttonClasses(variant: Variant = "primary", className = "") {
  return `${base} ${variants[variant]} ${className}`;
}

type LinkProps = ComponentProps<typeof Link> & { variant?: Variant; children: ReactNode };

export function ButtonLink({ variant = "primary", className = "", children, ...props }: LinkProps) {
  return (
    <Link {...props} className={buttonClasses(variant, className)}>
      {children}
    </Link>
  );
}

type ButtonProps = ComponentProps<"button"> & { variant?: Variant };

export function Button({ variant = "primary", className = "", children, ...props }: ButtonProps) {
  return (
    <button {...props} className={buttonClasses(variant, className)}>
      {children}
    </button>
  );
}
