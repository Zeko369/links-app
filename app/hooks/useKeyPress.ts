import { useState, useEffect, useCallback } from "react"

const useKeyPress = (targetKey) => {
  const [keyPressed, setKeyPressed] = useState(false)

  const downHandler = useCallback(
    ({ key, target }: KeyboardEvent) => {
      if (key === targetKey && (target as Element).nodeName !== "INPUT") {
        setKeyPressed(true)
      }
    },
    [targetKey]
  )

  const upHandler = useCallback(
    ({ key, target }: KeyboardEvent) => {
      if (key === targetKey && (target as Element).nodeName !== "INPUT") {
        setKeyPressed(false)
      }
    },
    [targetKey]
  )

  useEffect(() => {
    window.addEventListener("keydown", downHandler)
    window.addEventListener("keyup", upHandler)

    return () => {
      window.removeEventListener("keydown", downHandler)
      window.removeEventListener("keyup", upHandler)
    }
  }, [downHandler, upHandler])

  return keyPressed
}

export const useEscape = () => useKeyPress("Escape")

export default useKeyPress
