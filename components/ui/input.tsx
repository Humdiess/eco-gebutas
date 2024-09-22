import * as React from 'react'
import { cn } from '@/lib/utils'

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={cn(
          'block w-full rounded-md border border-gray-300 p-2 text-sm text-gray-900 focus:border-green-500 focus:ring-green-500',
          className
        )}
        {...props}
      />
    )
  }
)
Input.displayName = 'Input'
