console.log("here")

const createNewLink = (url: string, name: string | undefined, tabId: number | undefined) => {
  const options: RequestInit = {
    method: "POST",
    body: JSON.stringify({ url, name }),
    headers: {
      "Content-Type": "application/json",
    },
  }

  fetch("https://links.zekan.tk/api/add", options)
    .then((res) => res.json())
    .then(() => tabId && chrome.tabs.remove(tabId))
}

chrome.runtime.onMessage.addListener((message) => {
  if (message.type === "close") {
    const { url, name, id } = message
    createNewLink(url, name, id)
  }
})

chrome.commands.onCommand.addListener((command) => {
  if (command === "save-this-link") {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs.length === 1) {
        const tab = tabs[0]
        createNewLink(tab.url || "", undefined, tab.id)
      }
    })
  }
})
