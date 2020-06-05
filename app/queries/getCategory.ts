import db, { FindOneCategoryArgs } from "db"

const getCategory = async (args: FindOneCategoryArgs) => {
  const category = await db.category.findOne({ ...args, include: { links: true } })

  return category
}

export default getCategory
