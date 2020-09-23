import React, { useEffect, Suspense } from "react"
import { useRouter, BlitzPage, useRouterQuery, usePaginatedQuery } from "blitz"
import { List, ListItem, Heading, Stack, Flex, Button, Spinner, Input } from "@chakra-ui/core"
import { Link } from "chakra-next-link"

import getLinks from "app/queries/getLinks"
import useKeyPress from "app/hooks/useKeyPress"

const ITEMS_PER_PAGE = 3

const Links: React.FC = () => {
  const router = useRouter()
  const { page = 0, search = undefined } = useRouterQuery()
  const [{ links, hasMore, count }] = usePaginatedQuery(getLinks, {
    skip: ITEMS_PER_PAGE * Number(page),
    take: ITEMS_PER_PAGE,
    search: Array.isArray(search) ? search[0] : search,
  })

  const goToPreviousPage = () => router.push({ query: { page: Number(page) - 1 } })
  const goToNextPage = () => router.push({ query: { page: Number(page) + 1 } })

  return (
    <>
      <Flex justify="space-between" alignItems="center" mt="2">
        <Heading>Links</Heading>
        <Input maxW="400px" w="70%" placeholder="Search..." />
      </Flex>
      <Heading size="sm">{count} links</Heading>
      {links.length > 0 ? (
        <Stack mt="2">
          <Stack isInline>
            <Button isDisabled={page === 0} onClick={goToPreviousPage}>
              Previous
            </Button>
            <Button isDisabled={!hasMore} onClick={goToNextPage}>
              Next
            </Button>
          </Stack>
          <List styleType="circle">
            {links.map((link) => (
              <ListItem key={link.id} py={1}>
                <Link href={`/links/[id]`} as={`/links/${link.id}`} wordBreak="break-all">
                  {link.name}
                </Link>{" "}
                -&gt;{" "}
                <Link href={link.url} target="_blank" wordBreak="break-all">
                  {link.url}
                </Link>
              </ListItem>
            ))}
          </List>
        </Stack>
      ) : (
        <Heading>
          No links...
          <span role="img" aria-label="cry">
            😢
          </span>
        </Heading>
      )}
    </>
  )
}

const Home: BlitzPage = () => {
  const router = useRouter()
  const keyPress = useKeyPress("n")

  useEffect(() => {
    if (keyPress) {
      router.push("/links/add")
    }
  }, [keyPress, router])

  return (
    <Suspense fallback={<Spinner />}>
      <Links />
    </Suspense>
  )
}

export default Home
