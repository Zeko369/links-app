import db from "db"
import { NextApiRequest, NextApiResponse } from "next"

import cors from "app/lib/cors"
import getTitle from "app/queries/getTitle"

const handler = async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
  await cors(req, res)

  if (req.method !== "POST") {
    res.status(404).send("Nothing to see here")
    return
  }

  let { name, url } = req.body

  if (url === undefined) {
    res.status(400).json({ error: "no-url" })
  }

  if (!name || name.length === 0) {
    name = await getTitle(url)
  }

  try {
    const link = await db.link.create({ data: { name, url } })
    res.status(200).json(link)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: "create" })
  }
}

export default handler
