import { useReducer } from "react"
import { useRouter } from "blitz"
import { Input, Stack, FormControl, FormLabel, Box, Button } from "@chakra-ui/core"

import createLink from "app/mutations/createLink"
import capitalize from "app/helpers/capitalize"

interface State {
  name: string
  url: string
  description?: string
  isLoading: boolean
  error?: any
}

const defaultState: State = {
  name: "",
  url: "",
  isLoading: false,
}

type ActionName = "name" | "url" | "description"
type Action =
  | { type: ActionName; payload: string }
  | { type: "loading"; payload: boolean }
  | { type: "error"; payload: any }

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "name":
      return { ...state, name: action.payload }
    case "url":
      return { ...state, url: action.payload }
    case "description":
      return { ...state, description: action.payload }
    case "loading":
      return { ...state, isLoading: action.payload }
    case "error":
      return { ...state, error: action.payload }
    default:
      return state
  }
}

const inputs: { name: ActionName; required: boolean }[] = [
  { name: "url", required: true },
  { name: "name", required: true },
  { name: "description", required: false },
]

const Form: React.FC = () => {
  const [state, dispatch] = useReducer(reducer, defaultState)
  const router = useRouter()

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    dispatch({ type: "loading", payload: true })
    const data = { ...state, isLoading: undefined }
    try {
      await createLink(data)
      router.push("/")
      dispatch({ type: "loading", payload: true })
    } catch (err) {
      dispatch({ type: "error", payload: err })
    }
  }

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
            />
          </FormControl>
        ))}
      </Stack>
      <Button mt={4} variantColor="teal" isLoading={state.isLoading} type="submit">
        Add
      </Button>
    </form>
  )
}

export default Form
