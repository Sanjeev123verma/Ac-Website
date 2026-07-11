"use client";

import { AuthProvider } from "@/context/authContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import { Toaster } from "react-hot-toast";
import { SpeedInsights } from "@vercel/speed-insights/next";

export default function Providers({ children }) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <>
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 3000, // 10 seconds
        }}
      />
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          {children}
          <SpeedInsights />
        </AuthProvider>
      </QueryClientProvider>
    </>
  );
}
