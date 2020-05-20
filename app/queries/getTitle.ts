import capitalize from "app/helpers/capitalize"
import { load } from "cheerio"

const getTitle = async (link: string): Promise<string> => {
  let url: URL
  try {
    url = new URL(link)
  } catch (err) {
    console.error(err)
    return `{error}[${link}]`
  }

  try {
    let hostname = url.hostname

    if (hostname.startsWith("www")) {
      hostname = hostname.slice(4)
    }

    if (url.pathname === "/") {
      return hostname
    }

    switch (hostname) {
      case "github.com": {
        return `GITHUB:${url.pathname.slice(1)}`
      }
      case "medium.com": {
        // TODO: add medium detection with Sepia-Upstream
        if (url.pathname.slice(1).split("/").length === 1) {
          return `MEDIUM-user: ${url.pathname.slice(1)}`
        }

        const [username, title] = url.pathname.slice(1).split("/")
        return `MEDIUM:${username} -> ${title.split("-").slice(0, -1).join(" ")}`
      }
      case "youtube.com":
        // TODO: add youtube resolver

        if (url.pathname.split("/").reverse()[0] === "watch") {
          const response = await fetch(`https://www.youtube.com/watch?v=${url.search.slice(3)}`)
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

          return `YOUTUBE:(${output.channel} -> ${output.title})`
        }

        return `YOUTUBE:${url.search.slice(3)}`
      case "google.com": {
        try {
          const params = new URLSearchParams(url.search)
          return `GOOGLE: ${capitalize(params.get("q"))}`
        } catch (err) {
          return `Google something`
        }
      }
    }
  } catch (err) {
    console.error(err)
  }

  return url.pathname.split("/").filter(Boolean).reverse()[0]
}

export default getTitle
