// @ts-nocheck
import * as React from "react";

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(({ ...props }, ref) => (
  <textarea ref={ref} {...props} />
));

Textarea.displayName = "Textarea";
