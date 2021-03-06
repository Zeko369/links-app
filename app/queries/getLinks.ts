import db, { FindManyLinkArgs } from "db"

interface GetLinkInput {
  where?: FindManyLinkArgs["where"]
  orderBy?: FindManyLinkArgs["orderBy"]
  take?: FindManyLinkArgs["take"]
  skip?: FindManyLinkArgs["skip"]
  search?: string
}

const getLinks = async ({ where, orderBy, take, skip, search }: GetLinkInput) => {
  const links = await db.link.findMany({
    orderBy: { id: "desc", ...orderBy },
    where: {
      ...where,
      OR: [
        { description: { contains: search, mode: "insensitive" } },
        { name: { contains: search, mode: "insensitive" } },
        { url: { contains: search, mode: "insensitive" } },
      ],
    },
    take,
    skip,
  })

  const count = await db.link.count()
  const hasMore = skip! + take! < count
  return {
    links,
    hasMore,
    count,
  }
}

export default getLinks
