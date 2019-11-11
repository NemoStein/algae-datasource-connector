import { connector, ports } from '../../algaefile.js'
import { getDatasourceURL, loadDatasourceMetadata } from '../main.js'

let datasourceName
let apiURL
let organizationID
let authToken

connector.addEventListener(ports.datasourceName, (/** @type {CustomEvent} */ event) => {
  datasourceName = event.detail
  load()
})

connector.addEventListener(ports.apiURL, (/** @type {CustomEvent} */ event) => {
  apiURL = event.detail
  load()
})

connector.addEventListener(ports.organizationID, (/** @type {CustomEvent} */ event) => {
  organizationID = event.detail
  load()
})

connector.addEventListener(ports.authToken, (/** @type {CustomEvent} */ event) => {
  authToken = event.detail
  load()
})

const Main = document.getElementById('Main')
const Spinner = document.getElementById('Spinner')

const load = async () => {
  console.log('[Algae]', datasourceName, apiURL, organizationID, authToken)

  if (!datasourceName || !organizationID || !authToken) {
    return
  }

  Main.innerText = 'Loading...'
  Spinner.classList.add('show')

  const datasource = await loadDatasourceMetadata(getDatasourceURL(apiURL || 'https://api.lichen.com', organizationID, datasourceName), authToken)

  Main.innerText = 'Loaded!'
  Spinner.classList.remove('show')

  connector.setOutlet(ports.metadata, datasource)
  connector.send()
}
