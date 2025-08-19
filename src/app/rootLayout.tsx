"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import { SidebarProvider } from "@/context/SidebarContext";
import { ThemeProvider } from "@/context/ThemeContext";
import Chatbot from "@/components/chatbot/chatbot";
import LayoutInner from "./layoutInner";

export default function RootLayoutClient({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <SidebarProvider>
          <LayoutInner>{children}</LayoutInner>
        </SidebarProvider>
      </ThemeProvider>
      <Chatbot />
    </QueryClientProvider>
  );
}