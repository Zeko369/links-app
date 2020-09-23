import React, { useEffect, Suspense, useState } from "react"
import { useRouter, BlitzPage, useRouterQuery, usePaginatedQuery } from "blitz"
import { List, ListItem, Heading, Stack, Flex, Button, Spinner, Input } from "@chakra-ui/core"
import { Link } from "chakra-next-link"

import getLinks from "app/queries/getLinks"
import useKeyPress from "app/hooks/useKeyPress"
import { useDebounce } from "app/hooks/useDebounce"

const ITEMS_PER_PAGE = 30

const Links: React.FC = () => {
  const router = useRouter()
  const [searchVal, setSearchVal] = useState<string | undefined>()
  const { page = 0, q = undefined } = useRouterQuery()
  const [{ links, hasMore, count }] = usePaginatedQuery(getLinks, {
    skip: ITEMS_PER_PAGE * Number(page),
    take: ITEMS_PER_PAGE,
    search: Array.isArray(q) ? q[0] : q,
  })

  const goToPreviousPage = () => router.push({ pathname: "/", query: { page: Number(page) - 1 } })
  const goToNextPage = () => router.push({ pathname: "/", query: { page: Number(page) + 1 } })

  const debouncedSearchVal = useDebounce(searchVal, 150)

  useEffect(() => {
    if (debouncedSearchVal !== q) {
      router.push({
        pathname: "/",
        query: { page: 0, q: debouncedSearchVal },
      })
    }
  }, [debouncedSearchVal, page, router, q])

  return (
    <>
      <Flex justify="space-between" alignItems="center" mt="2">
        <Heading>Links</Heading>
        <Input
          maxW="400px"
          w="70%"
          placeholder="Search..."
          onChange={(e) => setSearchVal(e.target.value)}
          value={searchVal}
        />
      </Flex>
      <Heading size="sm">
        {count} links {Number(page) !== 0 && `On page ${page}`}
      </Heading>
      {links.length > 0 ? (
        <Stack mt="2">
          <Stack isInline>
            <Button isDisabled={Number(page) === 0} onClick={goToPreviousPage}>
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
