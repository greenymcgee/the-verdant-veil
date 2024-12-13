import React, { HTMLAttributes, ReactNode } from 'react'

import { Input } from '../input'
import { Label } from '../label'

interface InputGroupProps extends HTMLAttributes<HTMLDivElement> {
  id: string
  inputProps?: Omit<PropsOf<typeof Input>, 'id' | 'data-testid' | 'required'>
  label: ReactNode
  required?: boolean
}

export function InputGroup({
  id,
  inputProps,
  label,
  required,
  ...options
}: InputGroupProps) {
  return (
    <div {...options}>
      <Label
        className="mb-2 block"
        data-testid={`label-${id}`}
        htmlFor={id}
        required={required}
      >
        {label}
      </Label>
      <Input
        {...inputProps}
        data-testid={`input-${id}`}
        id={id}
        required={required}
      />
    </div>
  )
}
