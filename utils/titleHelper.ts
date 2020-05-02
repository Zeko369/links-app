const getTitle = (link: string): string => {
  let url: URL
  try {
    url = new URL(link)
  } catch (err) {
    console.error(err)
    return `{error}[${link}]`
  }

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
      const [username, title] = url.pathname.slice(1).split("/")
      return `MEDIUM:${username} -> ${title.split("-").slice(0, -1).join(" ")}`
    }
    case "youtube.com":
      // TODO: add youtube resolver
      return `YOUTUBE:${url.search.slice(3)}`
  }

  return url.pathname.split("/").filter(Boolean).reverse()[0]
}

export default getTitle
