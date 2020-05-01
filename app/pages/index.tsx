import React from "react"
import { ssrQuery } from "blitz"
import { Link as ILink } from "@prisma/client"
import { List, ListItem, Heading } from "@chakra-ui/core"

import getLinks from "app/queries/getLinks"
import Layout from "app/layouts"
import Link from "app/components/Link"

const Links: React.FC<{ links: ILink[] }> = ({ links }) => {
  return (
    <List styleType="circle">
      {links.map((link) => (
        <ListItem key={link.id} py={1}>
          <Link href={`/links/[id]`} as={`/links/${link.id}`}>
            {link.name}
          </Link>{" "}
          -> <Link href={link.url}>{link.url}</Link>
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
  return (
    <Layout>
      <Links links={links} />
    </Layout>
  )
}

export default Home
