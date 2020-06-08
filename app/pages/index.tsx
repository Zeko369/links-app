import React, { useEffect } from "react"
import { ssrQuery, useRouter } from "blitz"
import { Link as ILink } from "@prisma/client"
import { List, ListItem, Heading, Link as ChakraLink } from "@chakra-ui/core"

import getLinks from "app/queries/getLinks"
import Link from "app/components/Link"
import useKeyPress from "app/hooks/useKeyPress"

const Links: React.FC<{ links: ILink[] }> = ({ links }) => {
  return (
    <List styleType="circle">
      {links.map((link) => (
        <ListItem key={link.id} py={1}>
          <Link href={`/links/[id]`} as={`/links/${link.id}`} wordBreak="break-all">
            {link.name}
          </Link>{" "}
          -&gt;{" "}
          <ChakraLink href={link.url} target="_blank" wordBreak="break-all">
            {link.url}
          </ChakraLink>
        </ListItem>
      ))}
      {links.length === 0 && (
        <Heading>
          No links...
          <span role="img" aria-label="cry">
            😢
          </span>
        </Heading>
      )}
    </List>
  )
}

interface ServerProps {
  links: ILink[]
}

export const getServerSideProps = async ({ req, res }): Promise<{ props: ServerProps }> => {
  const links = await ssrQuery(getLinks, {}, { req, res })
  return { props: { links } }
}

const Home: React.FC<ServerProps> = ({ links }) => {
  const router = useRouter()
  const keyPress = useKeyPress("n")

  useEffect(() => {
    if (keyPress) {
      router.push("/links/add")
    }
  }, [keyPress, router])

  return <Links links={links} />
}

export default Home
