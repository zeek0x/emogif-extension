const searchJoinedTeams = (request, sender, sendResponse) => {
  slack.searchJoinedTeams()
    .then(
      result => sendResponse(['ok', result]),
      error => sendResponse(['error', error]),
    )
  return true
}

const registerEmoji = ({url, text, teamdomain}, sender, sendResponse) => {
  slack.registerEmoji(url, text, teamdomain)
    .then(
      result => sendResponse(['ok', result]),
      error => sendResponse(['error', error]),
    )
  return true
}

const main = () => {
  browserAction.addListener()
  chrome.runtime.onMessage.addListener(
    (request, sender, sendResponse) => {
      switch(request.type) {
        case eventType.SEARCH_JOINED_TEAMS:
          return searchJoinedTeams(request, sender, sendResponse)
        case eventType.REGISTER_EMOJI:
          return registerEmoji(request, sender, sendResponse)
      }
    }
  )
}

main()
