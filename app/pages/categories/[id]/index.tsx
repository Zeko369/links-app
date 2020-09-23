import React from "react"
import { ssrQuery } from "blitz"
import { Category, Link as LinkDB } from "@prisma/client"
import { Heading, List, ListItem } from "@chakra-ui/core"

import getCategory from "app/queries/getCategory"
import { Link } from "chakra-next-link"

interface ServerProps {
  category: Category & {
    links: LinkDB[]
  }
}

export const getServerSideProps = async ({ params, req, res }): Promise<{ props: ServerProps }> => {
  const category = await ssrQuery(getCategory, { where: { id: parseInt(params.id) } }, { req, res })
  return { props: { category } }
}

const ShowCategory: React.FC<ServerProps> = ({ category }) => {
  return (
    <>
      <Heading>{category.name}</Heading>
      <List mt={3} styleType="disc">
        {category.links.map((link) => (
          <ListItem>
            <Link href={"/links/[id]"} as={`/links/${link.id}`}>
              {link.name}
            </Link>
          </ListItem>
        ))}
      </List>
    </>
  )
}

export default ShowCategory
