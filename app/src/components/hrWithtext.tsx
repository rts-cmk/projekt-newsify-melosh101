import React from "react";
import { cn } from "@/lib/utils"
export function HrWithText({ className, text, ...props }: React.ComponentProps<"div"> & { text: string }) {
  return (
    <div className={cn("flex items-center", className)}>
      <div className="grow border-t border-gray-400"></div>
      <span className="shrink mx-4  text-gray-500">
        {text}
      </span>
      <div className="grow border-t border-gray-400"></div>
    </div>
  )
} 
