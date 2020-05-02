// @ts-check
/*eslint no-undef: "off"*/

/// <reference path="./node_modules/@types/chrome/index.d.ts"/>

let changeColor = document.querySelector("form")

chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
  if (tabs.length === 1) {
    const tab = tabs[0]

    /** @type {RequestInit} */
    const options = {
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
          document.querySelector("input#links-app-name").placeholder = data
        }
      })
      .catch((err) => {
        console.error(err)
      })
  }
})

changeColor.onsubmit = function (event) {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    if (tabs.length === 1) {
      const tab = tabs[0]
      const name = document.querySelector("input#links-app-name").value
      chrome.runtime.sendMessage({ type: "close", id: tab.id, url: tab.url, name })
    }
  })
}
