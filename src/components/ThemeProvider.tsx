'use client';

import { ThemeProvider as NextThemeProvider } from 'next-themes';
import { FC, PropsWithChildren } from 'react';

export const ThemeProvider: FC<PropsWithChildren<{}>> = ({ children }) => {
  // attribute="class" toggles `class` on <html> so your `.dark {}` rules apply
  return (
    <NextThemeProvider attribute="class" defaultTheme="system" enableSystem={true}>
      {children}
    </NextThemeProvider>
  );
};
