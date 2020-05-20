import { NextApiRequest, NextApiResponse } from "next"
import getTitle from "utils/titleHelper"
import cors from "app/lib/cors"

const handler = async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
  await cors(req, res)

  if (req.method !== "POST") {
    res.status(404).send("Nothing to see here")
    return
  }

  let { url } = req.body

  res.status(200).send(getTitle(url))
}

export default handler
