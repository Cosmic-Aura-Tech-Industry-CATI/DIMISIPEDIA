import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";

/**
 * Entity paths are data-driven strings from the knowledge base, so they are
 * widened here to the router's link type in one place instead of at every call site.
 */
export function EntityLink({
  to,
  className,
  onClick,
  children,
}: {
  to: string;
  className?: string;
  onClick?: () => void;
  children: ReactNode;
}) {
  return (
    <Link to={to as unknown as "/"} className={className} onClick={onClick}>
      {children}
    </Link>
  );
}
