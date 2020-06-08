import Form from "app/components/Form"
import { useRouter, useQuery, Link } from "blitz"
import getLink from "app/queries/getLink"
import useKeyPress from "app/hooks/useKeyPress"
import { useEffect, Suspense } from "react"
import { Link as ChakraLink } from "@chakra-ui/core"
import ErrorBoundary from "app/components/ErrorBoundary"

// export const getServerSideProps = async ({ params, req, res }): Promise<{ props: ServerProps }> => {
//   const link = await ssrQuery(getLink, { where: { id: parseInt(params.id) } }, { req, res })
//   return { props: { link } }
// }

const EditComponent: React.FC = () => {
  const router = useRouter()
  const projectId = router ? parseInt(router.query.id as string) : 0
  const [link] = useQuery(getLink, { where: { id: projectId } })

  return (
    <>
      <ChakraLink target="_blank" as={Link} href="/">
        Go to
      </ChakraLink>
      <Form link={link} />
    </>
  )
}

const Edit: React.FC = () => {
  const router = useRouter()
  const esc = useKeyPress("Escape")

  useEffect(() => {
    if (esc) {
      router.push("/")
    }
  }, [router, esc])

  return (
    <ErrorBoundary fallback={(error) => <div>Error: {JSON.stringify(error)}</div>}>
      <Suspense fallback={<h1>Loading...</h1>}>
        <EditComponent />
      </Suspense>
    </ErrorBoundary>
  )
}

export default Edit
