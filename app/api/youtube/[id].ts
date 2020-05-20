import { NextApiRequest, NextApiResponse } from "next"
import fetch from "isomorphic-fetch"
import { load } from "cheerio"

import cors from "app/lib/cors"

const handler = async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
  await cors(req, res)

  if (!req.query.id) {
    return res.status(422).json({ err: "ID missing" })
  }

  const response = await fetch(`https://www.youtube.com/watch?v=${req.query.id}`)
  const data = await response.text()

  const root = load(data)

  const output = {
    title: root('meta[property="og:title"]').attr("content"),
    channel: root(
      ".video-list-item.related-list-item.show-video-time.related-list-item-compact-video .stat.attribution"
    )
      .first()
      .text(),
  }

  res.json(output)
}

export default handler
