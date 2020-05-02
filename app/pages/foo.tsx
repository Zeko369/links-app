import React from "react"
import { ssrQuery } from "blitz"
import { Link as ILink } from "@prisma/client"

import getLinks from "app/queries/getLinks"
import Layout from "app/layouts"
import getTitle from "utils/titleHelper"

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
      <ul>
        {links.map((link) => (
          <li>
            {getTitle(link.url)} -> {link.url}
          </li>
        ))}
      </ul>
    </Layout>
  )
}

export default Home
