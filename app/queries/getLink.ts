import db, { FindOneLinkArgs } from "db"

const getLink = async (args: FindOneLinkArgs) => {
  const link = await db.link.findOne(args)
  return link
}

export default getLink
