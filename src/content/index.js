const resultToMessage = ([okError, message], name) => {
  switch (okError) {
    case 'ok':
      return 'Registerd!🎉'
    case 'error':
      switch (message) {
        case 'too_many_frames':
          return '[FAILED] FPS is too large.💨'
        case 'resized_but_still_too_large':
          return '[FAILED] Scale is too large.🔍'
        case 'error_name_taken':
          return `[FAILED] :${name}: is already registered.🔮`
        default:
          return `[FAIELD] Unknown error occured. message=${message}.😱`
      }
  }
}

const main = async () => {
  const teamdomainSelect = document.createElement('select')
  const nameInput = document.createElement('input')
  const registerButton = document.createElement('button')
  const informationSpan = document.createElement('span')

  registerButton.textContent = 'register'
  registerButton.onclick = async (event) => {
    event.target.disabled = true
    informationSpan.textContent = ''

    const url = document.querySelector('img').src
    const text = nameInput.value
    const teamdomain = teamdomainSelect.value
    const result = await slack.registerEmoji(url, text, teamdomain)
    informationSpan.textContent = resultToMessage(result)
    event.target.disabled = false
  }
  document.body.appendChild(teamdomainSelect)
  document.body.appendChild(nameInput)
  document.body.appendChild(registerButton)
  document.body.appendChild(informationSpan)

  // After DOM elements have appended
  const [okError, teams] = await slack.searchJoinedTeams()
  if ( okError === 'error' ) {
    informationSpan.textContent = 'Failed to get teamdomain.'
    return
  }

  teams.forEach(teamdomain => {
    const teamdomainOption = document.createElement('option')
    teamdomainOption.textContent = teamdomain
    teamdomainSelect.appendChild(teamdomainOption)
  })
}

main()
