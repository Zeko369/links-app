import Form from "app/components/Form"
import Layout from "app/layouts"
import { useRouter } from "blitz"
import useKeyPress from "app/hooks/useKeyPress"
import { useEffect } from "react"

const Add: React.FC = () => {
  const router = useRouter()
  const esc = useKeyPress("Escape")

  useEffect(() => {
    if (esc) {
      router.push("/")
    }
  }, [router, esc])

  return (
    <Layout>
      <Form />
    </Layout>
  )
}

export default Add