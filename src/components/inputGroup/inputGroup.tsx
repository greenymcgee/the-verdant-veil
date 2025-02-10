import React, { HTMLAttributes, ReactNode } from 'react'

import { Input } from '../input'
import { Label } from '../label'

interface InputGroupProps extends HTMLAttributes<HTMLParagraphElement> {
  id: string
  inputProps?: Omit<PropsOf<typeof Input>, 'id' | 'data-testid' | 'required'>
  label: ReactNode
  required?: boolean
}

export function InputGroup({
  id,
  inputProps = { name: id },
  label,
  required,
  ...options
}: InputGroupProps) {
  return (
    <p {...options}>
      <Label
        className="mb-1 block"
        data-testid={`${id}-label`}
        htmlFor={id}
        required={required}
      >
        {label}
      </Label>
      <Input
        {...inputProps}
        data-testid={`${id}-input`}
        id={id}
        required={required}
      />
    </p>
  )
}
