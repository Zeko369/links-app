import Cors from "cors"
import { NextApiRequest, NextApiResponse } from "next"
import runMiddleware from "./runMiddleware"

const cors = (req: NextApiRequest, res: NextApiResponse, methods?: string[]) => {
  return runMiddleware(req, res, Cors({ methods: methods || ["GET", "POST"] }))
}

export default cors
