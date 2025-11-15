import { Toaster as Sonner } from "sonner";

export function Toaster() {
  return (
    <Sonner
      position="top-right"
      toastOptions={{
        style: {
          background: "var(--card)",
          color: "var(--card-foreground)",
          border: "1px solid var(--border)",
        },
        className: "toaster group",
        duration: 3000,
      }}
      className="toaster group"
      expand={false}
      richColors
      closeButton
    />
  );
}
