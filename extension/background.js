// @ts-check
/*eslint no-undef: "off"*/

/// <reference path="./node_modules/@types/chrome/index.d.ts"/>

chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  if (message.type === "close") {
    const { url, name } = message

    /** @type {RequestInit} */
    const options = {
      method: "POST",
      body: JSON.stringify({ url, name }),
      headers: {
        "Content-Type": "application/json",
      },
    }

    fetch("https://links.zekan.tk/api/add", options)
      .then((res) => {
        return res.json()
      })
      .then((data) => {
        console.log(data)
        chrome.tabs.remove(message.id)
      })
  }
})
