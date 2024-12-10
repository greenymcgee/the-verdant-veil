import React, { ReactNode } from 'react'

import { Input } from '../input'
import { Label } from '../label'

interface InputGroupProps {
  id: string
  inputProps?: Omit<PropsOf<typeof Input>, 'id' | 'data-testid'>
  label: ReactNode
}

export function InputGroup({ id, inputProps, label }: InputGroupProps) {
  return (
    <>
      <Label
        className="mb-2 block"
        data-testid={`label-${id}`}
        htmlFor={id}
        required={inputProps?.required}
      >
        {label}
      </Label>
      <Input {...inputProps} data-testid={`input-${id}`} id={id} />
    </>
  )
}
