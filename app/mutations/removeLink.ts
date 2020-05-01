import db, { LinkDeleteArgs } from "db"

const deleteLink = async (props: LinkDeleteArgs) => {
  const link = await db.link.delete(props)
  return link
}

export default deleteLink
