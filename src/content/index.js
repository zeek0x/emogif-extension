const main = async () => {
  const teamdomainSelect = document.createElement('select')
  const nameInput = document.createElement('input')
  const registerButton = document.createElement('button')
  const informationSpan = document.createElement('span')

  const [okError, teams] = await slack.searchJoinedTeams()
  if ( okError === 'error' ) { return }

  teams.forEach(teamdomain => {
    const teamdomainOption = document.createElement('option')
    teamdomainOption.textContent = teamdomain
    teamdomainSelect.appendChild(teamdomainOption)
  })

  registerButton.textContent = 'register'
  registerButton.onclick = async (event) => {
    event.target.disabled = true
    informationSpan.textContent = ''

    const url = document.querySelector('img').src
    const text = nameInput.value
    const teamdomain = teamdomainSelect.value
    const res = await slack.registerEmoji(url, text, teamdomain)
    informationSpan.textContent = JSON.stringify(res)
    event.target.disabled = false
  }
  document.body.appendChild(teamdomainSelect)
  document.body.appendChild(nameInput)
  document.body.appendChild(registerButton)
  document.body.appendChild(informationSpan)
}

main()
