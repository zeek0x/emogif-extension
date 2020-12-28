const slack = (() => {
  const searchJoinedTeams = async () => {
    const url = 'https://slack.com/customize/emoji'
    const res = await fetch(url, {
      credentials: 'include',
    })
    const body = await res.text()
    const parser = new DOMParser()
    const $ = parser.parseFromString(body, 'text/html')
    const teamAnchors = [
      ...$.querySelectorAll('#header_team_nav li:not(#add_team_option) a')
    ]
    const teams = teamAnchors.map((anchor) => {
      const href = anchor.href
      if (!href) { return }

      const matches = href.match(/https:\/\/([^\.]+)\.slack\.com/)
      if (matches) {
        return matches[1]
      }
    })
    return teams
  }

  const registerEmoji = async (url, text, teamdomain) => {
    if(!url) {
      throw 'Invalid Emoji URL'
    }

    // fetch emoji image data
    const image = await fetch(url, {
      credentials: 'include',
    });
    const imageData = await image.blob();

    // fetch initial form data
    const initialUrl = `https://${teamdomain}.slack.com/customize/emoji`
    const initialResponse = await fetch(initialUrl, {
      credentials: 'include',
    })

    // Find API token
    const initialText = await initialResponse.text()
    const tokenRegex = /api_token[\"\']?\s*\:\s*[\"\']([\w-]+)[\"\']/
    const tokenMatches = tokenRegex.exec(initialText)
    const token  = tokenMatches ? tokenMatches[1] : null
    if (!token) { throw 'API token not found' }

    // create post form data
    const fd = new FormData()
    fd.append('mode', 'data')
    fd.append('name', text)
    fd.append('image', imageData, 'emoji.png')
    fd.append('token', token)

    // Add emoji
    const addUrl = `https://${teamdomain}.slack.com/api/emoji.add`
    const addResponse  = await fetch(addUrl, {
      body: fd,
      credentials: 'include',
      method: 'POST',
    })

    // Parse adding result
    const resultJson = await addResponse.text()
    try {
      result = JSON.parse(resultJson)
    } catch (e) {
      throw 'Invalid JSON syntax'
    }

    if (result.ok) { return result.ok }
    throw result.error || 'Unknown Error'
  }

  return {
    searchJoinedTeams,
    registerEmoji
  }
})()
