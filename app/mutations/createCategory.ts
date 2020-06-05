import db from "db"

const createCategory = async (data: { name: string }) => {
  const category = await db.category.create({ data })
  return category
}

export default createCategory
