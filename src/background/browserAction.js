const WEB_URL = 'https://zeek0x.github.io/emogif/'

const browserAction = (() => {
  const addListener = () => {
    chrome.browserAction.onClicked.addListener(
      (tab) => {
        chrome.tabs.create({ url: WEB_URL })
      },
    )
  }

  return { addListener }
})()
