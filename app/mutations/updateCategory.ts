import db, { CategoryUpdateArgs } from "db"

const updateCategory = async (props: CategoryUpdateArgs) => {
  const category = await db.category.update(props)
  return category
}

export default updateCategory
