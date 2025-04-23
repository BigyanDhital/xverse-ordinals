"use client";

import type * as React from "react";
import QueryClientProvider from "./queryclient.provider";

export default function Providers({ children }: { children: React.ReactNode }) {
  return <QueryClientProvider>{children}</QueryClientProvider>;
}
