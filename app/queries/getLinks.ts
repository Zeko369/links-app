import db from "db"

const getLinks = async () => {
  const links = await db.link.findMany({ orderBy: { id: "desc" }, first: 30 })
  return links
}

export default getLinks
