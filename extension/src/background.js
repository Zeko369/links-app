// @ts-check
/*eslint no-undef: "off"*/

/// <reference path="./node_modules/@types/chrome/index.d.ts"/>

const createNewLink = (url, name, tabId) => {
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
      chrome.tabs.remove(tabId)
    })
}

chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  if (message.type === "close") {
    const { url, name, id } = message

    createNewLink(url, name, id)
  }
})

chrome.commands.onCommand.addListener(function (command) {
  if (command === "save-this-link") {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs.length === 1) {
        const tab = tabs[0]
        createNewLink(tab.url, undefined, tab.id)
      }
    })
  }
})
