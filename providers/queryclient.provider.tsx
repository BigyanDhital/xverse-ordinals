"use client";
import { QueryClient, QueryClientProvider as _QueryClientProvider } from "@tanstack/react-query";
import type { ReactNode } from "react";

export const queryClient = new QueryClient();

const QueryClientProvider = ({ children }: { children: ReactNode }) => {
  return <_QueryClientProvider client={queryClient}>{children}</_QueryClientProvider>;
};

export default QueryClientProvider;
