const slack = (() => {
  const sendMessagePromise = (message) => {
    return new Promise((resolve) => {
      chrome.runtime.sendMessage(message, (res) => { resolve(res) })
    })
  }

  const searchJoinedTeams = async () => {
    const type = eventType.SEARCH_JOINED_TEAMS
    return await sendMessagePromise({type})
  }

  const registerEmoji = async (url, text, teamdomain) => {
    const type = eventType.REGISTER_EMOJI
    return await sendMessagePromise({type, url, text, teamdomain})
  }

  return {
    searchJoinedTeams,
    registerEmoji
  }
})()
