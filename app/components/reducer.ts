export interface State {
  id?: number
  name: string
  url: string
  description?: string
  isLoading: boolean
  error?: any
}

export const defaultState: State = {
  name: "",
  url: "",
  isLoading: false,
}

export type ActionName = "name" | "url" | "description"
export type Action =
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

export const inputs: { name: ActionName; required: boolean }[] = [
  { name: "url", required: true },
  { name: "name", required: true },
  { name: "description", required: false },
]

export default reducer
