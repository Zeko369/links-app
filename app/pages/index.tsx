import { ssrQuery } from "blitz"
import getLinks from "app/queries/getLinks"
import { Link } from "@prisma/client"
import { useReducer } from "react"

export const getServerSideProps = async ({ params, req, res }) => {
  const links = await ssrQuery(getLinks, {}, { req, res })
  return { props: { links } }
}

interface State {
  name: string
  link: string
  description?: string
}

const defaultState = {
  name: "",
  link: "",
}

type ActionName = "name" | "link" | "description"
type Action = { type: ActionName; payload: string }

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "name":
      return { ...state, name: action.payload }
    case "link":
      return { ...state, link: action.payload }
    case "description":
      return { ...state, description: action.payload }
    default:
      return state
  }
}

const inputs: ActionName[] = ["link", "name", "description"]

const Form: React.FC = () => {
  const [state, dispatch] = useReducer(reducer, defaultState)

  return (
    <form>
      {inputs.map((input) => (
        <input
          key={input}
          value={state[input]}
          onChange={(e) => dispatch({ type: input, payload: e.target.value })}
        />
      ))}
    </form>
  )
}

const Home: React.FC<{ links: Link[] }> = ({ links }) => {
  return (
    <div>
      <h1>Hello from the homepage</h1>
      <Form />
      <ul>
        {links.map((link) => (
          <li key={link.id}>
            {link.name} -> {link.url}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Home
