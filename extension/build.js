const { promises: fs } = require("fs")
const { join } = require("path")

const build = async () => {
  const files = await fs.readdir(join(__dirname, "./src"))
  console.log(files)
}

module.exports = build
