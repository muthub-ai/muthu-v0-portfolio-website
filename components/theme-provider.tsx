'use client'

import * as React from 'react'
import {
  ThemeProvider as NextThemesProvider,
  type ThemeProviderProps,
} from 'next-themes'

// next-themes' props type no longer declares children, so add it explicitly.
export function ThemeProvider({ children, ...props }: ThemeProviderProps & { children?: React.ReactNode }) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}
