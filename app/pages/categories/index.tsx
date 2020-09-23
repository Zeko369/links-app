import React from "react"
import { ssrQuery } from "blitz"
import { Category as ICategory } from "@prisma/client"
import { List, ListItem, Heading } from "@chakra-ui/core"
import { Link, LinkButton } from "chakra-next-link"

import getCategories from "app/queries/getCategories"
import TopRow from "app/components/TopRow"

interface ServerProps {
  categories: ICategory[]
}

export const getServerSideProps = async ({ req, res }): Promise<{ props: ServerProps }> => {
  const categories = await ssrQuery(getCategories, {}, { req, res })
  return { props: { categories } }
}

const Categories: React.FC<ServerProps> = ({ categories }) => {
  return (
    <>
      <TopRow
        title="Categories"
        right={
          <>
            <LinkButton href="/categories/new" backgroundColor="blue.400">
              New
            </LinkButton>
          </>
        }
      />
      <List styleType="circle">
        {categories.length > 0 ? (
          categories.map((category) => (
            <ListItem key={category.id} py={1}>
              <Link href="/categories/[id]" as={`/categories/${category.id}`}>
                {category.name}
              </Link>{" "}
              <Link href="/categories/[id]/edit" as={`/categories/${category.id}/edit`}>
                Edit
              </Link>
            </ListItem>
          ))
        ) : (
          <Heading>
            No categories...
            <span role="img" aria-label="cry">
              😢
            </span>
          </Heading>
        )}
      </List>
    </>
  )
}

export default Categories
