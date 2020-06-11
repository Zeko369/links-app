import Form from "app/components/Form"
import { useRouter, useQuery } from "blitz"
import getLink from "app/queries/getLink"
import useKeyPress from "app/hooks/useKeyPress"
import { useEffect, Suspense, useState } from "react"
import { Link as ChakraLink, Select, Box, FormControl, FormLabel, Button } from "@chakra-ui/core"
import ErrorBoundary from "app/components/ErrorBoundary"
import getCategories from "app/queries/getCategories"
import updateLink from "app/mutations/updateLink"
import { LinkWithCategories, Refetch } from "app/ts/links"

// export const getServerSideProps = async ({ params, req, res }): Promise<{ props: ServerProps }> => {
//   const link = await ssrQuery(getLink, { where: { id: parseInt(params.id) } }, { req, res })
//   return { props: { link } }
// }

interface CategoryProps {
  link: LinkWithCategories
  refetch: Refetch<LinkWithCategories>
}

const Categories: React.FC<CategoryProps> = ({ link, refetch }) => {
  const [loading, setLoading] = useState<boolean>(false)
  const [selected, setSelected] = useState<number[]>(link.categories.map((category) => category.id))
  const [categories] = useQuery(getCategories, {})

  const onChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelected(Array.from(e.target.selectedOptions).map((option) => parseInt(option.value)))
  }

  const save = () => {
    setLoading(true)
    updateLink({
      where: { id: link.id },
      data: { categories: { set: selected.map((id) => ({ id })) } },
    })
      .then(() => refetch())
      .then(() => {
        setLoading(false)
      })
  }

  const change = new Set([...link.categories.map((c) => c.id), ...selected]).size !== link.categories.length

  return (
    <Box mt={3}>
      <FormControl>
        <FormLabel htmlFor="catSelect">Category</FormLabel>
        <Select id="catSelect" multiple height={100} onChange={onChange} isDisabled={loading}>
          {categories.map((category) => (
            <option key={category.id} value={category.id} selected={selected.includes(category.id)}>
              {category.name}
            </option>
          ))}
        </Select>
        {change && (
          <Button mt={3} onClick={save} isLoading={loading}>
            Save
          </Button>
        )}
      </FormControl>
    </Box>
  )
}

const EditComponent: React.FC = () => {
  const router = useRouter()
  const projectId = router ? parseInt(router.query.id as string) : 0
  const [link, { refetch }] = useQuery(getLink, { where: { id: projectId } })

  return (
    <>
      <ChakraLink href={link.url} target="_blank">
        Go to
      </ChakraLink>
      <Form link={link} />
      <Categories link={link} refetch={refetch} />
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
    <ErrorBoundary>
      <Suspense fallback={<h1>Loading...</h1>}>
        <EditComponent />
      </Suspense>
    </ErrorBoundary>
  )
}

export default Edit
