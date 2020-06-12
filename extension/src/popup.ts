const dom = {
  q: document.querySelector.bind(document),
  qa: document.querySelectorAll.bind(document),
}

const openButton = dom.q("#link")
if (openButton) {
  console.log("here")
  openButton.addEventListener("click", () => {
    chrome.tabs.create({ url: "https://links.zekan.tk" }, () => {
      window.console.log("done")
    })
  })
}

chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
  if (tabs.length === 1) {
    const tab = tabs[0]

    const options: RequestInit = {
      method: "POST",
      body: JSON.stringify({ url: tab.url }),
      headers: {
        "Content-Type": "application/json",
      },
    }

    fetch("https://links.zekan.tk/api/getName", options)
      .then((res) => res.text())
      .then((data) => {
        if (data.length > 0) {
          const input: HTMLInputElement | null = dom.q("input#links-app-name")
          if (input) {
            input.placeholder = data + "HERE"
          }
        }
      })
      .catch((err) => {
        console.error(err)
      })
  }
})

const changeColor = dom.q("form")
if (changeColor) {
  changeColor.addEventListener("submit", () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs.length === 1) {
        const tab = tabs[0]
        const name = (dom.q("input#links-app-name") as HTMLInputElement)?.value
        chrome.runtime.sendMessage({ type: "close", id: tab.id, url: tab.url, name })
      }
    })
  })
}
