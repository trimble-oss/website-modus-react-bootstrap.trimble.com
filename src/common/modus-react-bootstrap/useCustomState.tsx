/* eslint-disable react-hooks/rules-of-hooks, react-hooks/exhaustive-deps */
import React, { useEffect, useCallback, useRef, useState } from "react"

export default function useCustomState(prop, defaultProp) {
  const [value, setValue] = useState(defaultProp)
  const ref = useRef()

  useEffect(() => {
    if (prop !== undefined && ref.current !== prop) {
      ref.current = prop
      setValue(prop)
    }
  }, [prop])

  const setValueFn = useCallback(newValue => {
    setValue(newValue)
  }, [])

  return [value, setValueFn]
}
