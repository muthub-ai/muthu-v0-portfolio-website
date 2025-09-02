// @ts-nocheck
import * as React from "react";

// Mock implementations for testing: forward only children, ignore all other props
export const Form = ({ children }: { children: React.ReactNode }) => <>{children}</>;
export const FormField = ({ children }: { children: React.ReactNode }) => <>{children}</>;
export const FormItem = ({ children }: { children: React.ReactNode }) => <>{children}</>;
export const FormLabel = ({ children }: { children: React.ReactNode }) => <>{children}</>;
export const FormControl = ({ children }: { children: React.ReactNode }) => <>{children}</>;
export const FormMessage = ({ children }: { children: React.ReactNode }) => <>{children}</>;
