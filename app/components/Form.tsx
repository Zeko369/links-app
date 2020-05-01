import { useReducer, useState, useEffect, useRef } from "react"
import { useRouter } from "blitz"
import { Input, Stack, FormControl, FormLabel, Box, Button } from "@chakra-ui/core"

import createLink from "app/mutations/createLink"
import capitalize from "app/helpers/capitalize"
import ReadFromClipboard from "./ReadFromClipboard"
import { Link } from "@prisma/client"
import updateLink from "app/mutations/updateLink"
import reducer, { defaultState, inputs } from "./reducer"
import deleteLink from "app/mutations/removeLink"

const Form: React.FC<{ link?: Link }> = ({ link }) => {
  const [state, dispatch] = useReducer(reducer, { ...defaultState, ...link })
  const [showClipboard, setShowClipboard] = useState<boolean>(true)
  const router = useRouter()
  const nameRef = useRef(null)

  const update = state.id !== undefined

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    dispatch({ type: "loading", payload: true })
    const data = { ...state, isLoading: undefined }
    try {
      if (update) {
        await updateLink({ where: { id: state.id }, data })
      } else {
        await createLink(data)
      }
      router.push("/")
    } catch (err) {
      dispatch({ type: "error", payload: err })
    }
  }

  const add = (url: string) => {
    dispatch({ type: "url", payload: url })
    setShowClipboard(false)
    nameRef.current.focus()
  }

  const remove = async () => {
    if (window.confirm("Are you sure you want to delete this link")) {
      await deleteLink({ where: { id: state.id } })
      router.push("/")
    }
  }

  useEffect(() => {
    if (state.url.length > 0) {
      setShowClipboard(false)
    } else {
      setShowClipboard(true)
    }
  }, [state])

  return (
    <form onSubmit={onSubmit}>
      <Stack mt="4">
        {inputs.map((input) => (
          <FormControl key={input.name}>
            <FormLabel>{capitalize(input.name)}</FormLabel>
            <Input
              value={state[input.name]}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                dispatch({ type: input.name, payload: e.target.value })
              }
              isRequired={input.required}
              ref={input.name === "name" ? nameRef : null}
            />
          </FormControl>
        ))}
      </Stack>
      {state.id && (
        <Button mt={4} variantColor="red" float="right" onClick={remove}>
          Delete
        </Button>
      )}
      <Button mt={4} variantColor="teal" isLoading={state.isLoading} type="submit">
        {state.id ? "Update" : "Add"}
      </Button>
      {typeof window !== "undefined" && (showClipboard || update) && (
        <ReadFromClipboard add={add} autoAdd={!update} />
      )}
    </form>
  )
}

export default Form
