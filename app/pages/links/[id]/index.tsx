import Layout from "app/layouts"
import Form from "app/components/Form"
import { Link } from "@prisma/client"
import { ssrQuery, useRouter } from "blitz"
import getLink from "app/queries/getLink"
import useKeyPress from "app/hooks/useKeyPress"
import { useEffect } from "react"

interface ServerProps {
  link: Link
}

export const getServerSideProps = async ({ params, req, res }): Promise<{ props: ServerProps }> => {
  const link = await ssrQuery(getLink, { where: { id: parseInt(params.id) } }, { req, res })
  return { props: { link } }
}

const Edit: React.FC<ServerProps> = ({ link }) => {
  const router = useRouter()
  const esc = useKeyPress("Escape")

  useEffect(() => {
    if (esc) {
      router.push("/")
    }
  }, [router, esc])

  return (
    <Layout>
      <Form link={link} />
    </Layout>
  )
}

export default Edit
