const TscWatchClient = require("tsc-watch/client")
const build = require("./build")
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

try {
  watch.start("--project", ".")
} catch (e) {
  watch.kill()
}
