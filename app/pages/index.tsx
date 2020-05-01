import { Suspense } from "react"
import { useQuery, ssrQuery } from "blitz"
import { Link } from "@prisma/client"

import getLinks from "app/queries/getLinks"
import Form from "app/components/Form"
import Layout from "app/layouts"

const Links: React.FC<{ links: Link[] }> = ({ links }) => {
  return (
    <ul>
      {links.map((link) => (
        <li key={link.id}>
          {link.name} -> {link.url}
        </li>
      ))}
    </ul>
  )
}

interface ServerProps {
  links: Link[]
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
