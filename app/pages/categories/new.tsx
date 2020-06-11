import React from "react"
import { useRouter } from "blitz"
import createCategory from "app/mutations/createCategory"
import CategoryForm from "app/components/categories/Form"

export interface CreateCategoryProps {
  name: string
}

const NewCategory: React.FC = () => {
  const router = useRouter()

  const onSubmit = async (values: CreateCategoryProps) => {
    await createCategory(values)
    router.push("/categories")
  }

  return <CategoryForm onSubmit={onSubmit} text="Add new" />
}

export default NewCategory
