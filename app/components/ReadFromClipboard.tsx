import { useState, useEffect, useCallback } from "react"
import { Box, Button, Switch, FormLabel } from "@chakra-ui/core"

const read = async (): Promise<string> => {
  if (navigator.clipboard) {
    try {
      const data = await navigator.clipboard.readText()
      return data
    } catch (err) {}
  }

  return ""
}

// WARNING: RUN THIS CLIENT SIDE ONLY
const ReadFromClipboard: React.FC<{ add: (data: string) => void; autoAdd: boolean }> = ({ add, autoAdd }) => {
  const [hasPermissions, setHasPermissions] = useState<boolean>(false)
  const [clipboard, setClipboard] = useState<string | undefined>(undefined)

  const request = useCallback(async () => {
    setHasPermissions(true)
    const data = await read()

    try {
      const url = new URL(data)
      if (autoAdd) {
        add(url.toString())
      }
    } catch (err) {}

    setClipboard(data)
  }, [add, autoAdd])

  useEffect(() => {
    const interval = setInterval(() => {
      if (hasPermissions) {
        request()
      }
    }, 250)

    return () => clearInterval(interval)
  }, [hasPermissions, request])

  useEffect(() => {
    try {
      navigator.permissions.query({ name: "clipboard-read" } as any).then((res) => {
        if (res.state === "granted") {
          setHasPermissions(true)
          return request()
        }
      })
    } catch (err) {
      console.log(err)
    }
  }, [request])

  return (
    <Box mt={4}>
      {hasPermissions ? (
        <>
          {clipboard ? (
            <>
              <p>{clipboard}</p>
              <Button type="button" onClick={() => add(clipboard)}>
                Add this
              </Button>
            </>
          ) : (
            <p>Your clipboard is empry</p>
          )}
          <Button type="button" onClick={request}>
            Reload
          </Button>
        </>
      ) : (
        <>
          <FormLabel htmlFor="clipboard">Can we read from the cliboard</FormLabel>
          <Switch id="clipboard" onChange={request} />
        </>
      )}
    </Box>
  )
}

export default ReadFromClipboard
