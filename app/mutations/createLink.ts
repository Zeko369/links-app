import db from "db"

interface CreateLinkProps {
  url: string
  name: string
  description?: string
}

const createLink = async (data: CreateLinkProps) => {
  const link = await db.link.create({ data })
  return link
}

export default createLink
