import db from "db"

export interface CreateCategoryProps {
  name: string
}

const createCategory = async (data: CreateCategoryProps) => {
  const category = await db.category.create({ data })
  return category
}

export default createCategory
