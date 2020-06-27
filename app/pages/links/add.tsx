import { useRouter } from "blitz"
import { useEffect } from "react"
import Form from "app/components/Form"
import useKeyPress from "app/hooks/useKeyPress"

const Add: React.FC = () => {
  const router = useRouter()
  const esc = useKeyPress("Escape")

  useEffect(() => {
    if (esc) {
      router.push("/")
    }
  }, [router, esc])

  return <Form />
}

export default Add
