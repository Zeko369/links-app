import React from "react"
import { useRouter, ssrQuery } from "blitz"
import updateCategory from "app/mutations/updateCategory"
import CategoryForm from "app/components/categories/Form"
import { Heading } from "@chakra-ui/core"
import { Category } from "@prisma/client"
import getCategory from "app/queries/getCategory"

interface ServerProps {
  category: Category
}

export const getServerSideProps = async ({ params, req, res }): Promise<{ props: ServerProps }> => {
  const category = await ssrQuery(getCategory, { where: { id: parseInt(params.id) } }, { req, res })
  return { props: { category } }
}

const EditCategory: React.FC<ServerProps> = ({ category }) => {
  const router = useRouter()

  const onSubmit = async (values) => {
    await updateCategory({ where: { id: category.id }, data: { name: values.name } })
    router.push("/categories")
  }

  return (
    <>
      <Heading>Edit category</Heading>
      <CategoryForm onSubmit={onSubmit} text="Update" initValues={category} />
    </>
  )
}

export default EditCategory
