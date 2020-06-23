const TscWatchClient = require("tsc-watch/client")
const fs = require("fs")
const { join } = require("path")

const build = require("./build")
const { exclude } = require("./config")
const watch = new TscWatchClient()

watch.on("success", () => {
  build()
    .then(() => {
      console.log("Built")
    })
    .catch((err) => {
      console.error(`Error building`, err)
    })
})
;(async () => {
  await fs.promises.rmdir(join(__dirname, "../dist"), { recursive: true })
  const files = await fs.promises.readdir(join(__dirname, "../src"))

  files.filter(exclude).forEach((file) => {
    const src = join(__dirname, "../src", file)
    const dist = join(__dirname, "../dist", file)

    fs.watchFile(join(__dirname, "../src", file), { interval: 500 }, () => {
      fs.promises
        .copyFile(src, dist)
        .then(() => console.log(`Updated: ${file}`))
        .catch(console.error)
    })
  })

  try {
    watch.start("--project", ".")
  } catch (e) {
    watch.kill()
  }
})()
