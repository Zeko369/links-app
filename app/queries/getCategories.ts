import db from "db"

const getCategories = async () => {
  const categories = await db.category.findMany({ orderBy: { id: "desc" } })
  return categories
}

export default getCategories
