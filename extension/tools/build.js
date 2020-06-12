const { promises: fs } = require("fs")
const { join } = require("path")
const { exclude } = require("./config")

const build = async () => {
  const allFiles = await fs.readdir(join(__dirname, "../src"))
  const files = allFiles.filter(exclude)

  await Promise.all(
    files.map((file) => fs.copyFile(join(__dirname, "../src/", file), join(__dirname, "../dist/", file)))
  )
}

module.exports = build

if (require.main === module) {
  build()
    .then(() => console.log("Built"))
    .catch((err) => console.error(`Build error: `, err))
}
