import db, { FindOneLinkArgs } from "db"

const getLink = async (args: FindOneLinkArgs) => {
  const link = await db.link.findOne({ ...args, include: { categories: true } })
  return link
}

export default getLink
