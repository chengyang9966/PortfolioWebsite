import { ViewTransition } from "react";

// Route-level slide: links tagged nav-forward / nav-back pick the direction (see globals.css).
const directional = { "nav-forward": "page-forward", "nav-back": "page-back", default: "none" };

export function PageTransition({ children }: { children: React.ReactNode }) {
  return (
    <ViewTransition enter={directional} exit={directional} default="none">
      <div>{children}</div>
    </ViewTransition>
  );
}
