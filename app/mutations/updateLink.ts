import db, { LinkUpdateArgs } from "db"

const updateLink = async (props: LinkUpdateArgs) => {
  const link = await db.link.update(props)
  return link
}

export default updateLink
