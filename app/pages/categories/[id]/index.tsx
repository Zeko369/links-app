import React from "react"
import { ssrQuery } from "blitz"
import { Category, Link } from "@prisma/client"
import getCategory from "app/queries/getCategory"

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
      <h1>Show {category.id}</h1>
      {category.links.map((link) => (
        <h3>{link.name}</h3>
      ))}
    </>
  )
}

export default ShowCategory
