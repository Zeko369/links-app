import db from "db"
import { NextApiRequest, NextApiResponse } from "next"
import getTitle from "utils/titleHelper"

import Cors from "cors"

const cors = Cors({ methods: ["GET", "POST"] })

function runMiddleware(req, res, fn) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result) => {
      if (result instanceof Error) {
        return reject(result)
      }

      return resolve(result)
    })
  })
}

const handler = async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
  await runMiddleware(req, res, cors)

  if (req.method !== "POST") {
    res.status(404).send("Nothing to see here")
    return
  }

  let { name, url } = req.body

  if (url === undefined) {
    res.status(400).json({ error: "no-url" })
  }

  if (!name || name.length === 0) {
    name = getTitle(url)
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
