import { useReducer, useState, useEffect, useRef, useCallback } from "react"
import { Input, Stack, FormControl, FormLabel, Button } from "@chakra-ui/core"
import { useRouter } from "blitz"
import { Link } from "@prisma/client"

import createLink from "app/mutations/createLink"
import capitalize from "app/helpers/capitalize"
import ReadFromClipboard from "./ReadFromClipboard"
import updateLink from "app/mutations/updateLink"
import deleteLink from "app/mutations/removeLink"
import getTitle from "app/queries/getTitle"
import reducer, { defaultState, inputs } from "./reducer"

const query = async (state, update, dispatch, router) => {
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

const Form: React.FC<{ link?: Link }> = ({ link }) => {
  const [state, dispatch] = useReducer(reducer, { ...defaultState, ...link })
  const [showClipboard, setShowClipboard] = useState<boolean>(true)
  const [suggested, setSuggested] = useState<string>("")
  const router = useRouter()
  const nameRef = useRef<HTMLInputElement | null>(null)

  const update = state.id !== undefined

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    dispatch({ type: "loading", payload: true })
    await query(state, update, dispatch, router)
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

  const addSuggested = useCallback(async () => {
    await query({ ...state, name: suggested }, update, dispatch, router)
  }, [router, state, suggested, update])

  useEffect(() => {
    const listener = (event: KeyboardEvent) => {
      if (event.keyCode === 13 && event.shiftKey) {
        event.stopPropagation()
        addSuggested()
      }
    }

    const input = nameRef.current

    if (input) {
      input.addEventListener("keypress", listener)

      return () => input.removeEventListener("keypress", listener)
    }
  }, [addSuggested])

  useEffect(() => {
    if (state.url.length > 0) {
      setShowClipboard(false)
      if (state.name.length === 0) {
        getTitle(state.url).then((suggestedUrl) => {
          setSuggested(suggestedUrl)
        })
        // dispatch({ type: "name", payload: getTitle(state.url) })
      }
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
              placeholder={input.name === "name" ? suggested || "name" : input.name}
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
        <Button m={4} variantColor="red" float="right" onClick={remove}>
          Delete
        </Button>
      )}
      <Button m={4} ml={0} variantColor="teal" isLoading={state.isLoading} type="submit">
        {state.id ? "Update" : "Add"}
      </Button>
      {suggested && (
        <>
          <Button m={4} variantColor="green" onClick={addSuggested}>
            Add suggested
          </Button>
        </>
      )}
      {typeof window !== "undefined" && (showClipboard || update) && (
        <ReadFromClipboard add={add} autoAdd={!update} />
      )}
    </form>
  )
}

export default Form
