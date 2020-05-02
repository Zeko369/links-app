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

  let { url } = req.body

  res.status(200).json(getTitle(url))
}

export default handler
