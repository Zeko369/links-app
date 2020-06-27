import React from "react"
import { ssrQuery } from "blitz"
import { Category, Link } from "@prisma/client"
import { Heading, List, ListItem } from "@chakra-ui/core"

import getCategory from "app/queries/getCategory"
import RouterLink from "app/components/Link"

interface ServerProps {
  category: Category & {
    links: Link[]
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
            <RouterLink href={"/links/[id]"} as={`/links/${link.id}`}>
              {link.name}
            </RouterLink>
          </ListItem>
        ))}
      </List>
    </>
  )
}

export default ShowCategory
