'use client';

import { ThemeProvider as ShadCNThemeProvider } from 'next-themes';
import { ReactNode } from 'react';

interface ThemeProviderProps {
  children: ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  return (
    <ShadCNThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
    >
      {children}
    </ShadCNThemeProvider>
  );
}