import { useCallback, useState } from 'react'

export function useToggle(initialState = false) {
  const [bool, setBool] = useState(initialState)
  const toggleBool = useCallback(() => setBool((prevBool) => !prevBool), [])
  return [bool, toggleBool] as [boolean, VoidFunction]
}
