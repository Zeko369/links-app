import Form from "app/components/Form"
import { Link } from "@prisma/client"
import { ssrQuery, useRouter } from "blitz"
import getLink from "app/queries/getLink"
import useKeyPress from "app/hooks/useKeyPress"
import { useEffect } from "react"
import { Link as ChakraLink } from "@chakra-ui/core"

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
    <>
      <ChakraLink href={link.url} target="_blank">
        Go to
      </ChakraLink>
      <Form link={link} />
    </>
  )
}

export default Edit
