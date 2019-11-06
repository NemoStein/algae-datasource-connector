/* global localStorage, parent */

import { connector, ports } from '../../algaefile.js'
import { getDatasourceURL, loadDatasourceMetadata } from '../main.js'

let datasourceName
let apiURL = 'https://api.lichen.com'
let organizationID = localStorage.orgPubId
let authToken = parent.getSessionToken()

connector.addEventListener(ports.datasourceName, (/** @type {CustomEvent} */ event) => {
  datasourceName = event.detail
  load()
})

connector.addEventListener(ports.apiURL, (/** @type {CustomEvent} */ event) => {
  apiURL = event.detail || 'https://api.lichen.com'
  load()
})

connector.addEventListener(ports.organizationID, (/** @type {CustomEvent} */ event) => {
  organizationID = event.detail || localStorage.orgPubId
  load()
})

connector.addEventListener(ports.authToken, (/** @type {CustomEvent} */ event) => {
  authToken = event.detail || parent.getSessionToken()
  load()
})

const Main = document.getElementById('Main')
const Spinner = document.getElementById('Spinner')

const load = async () => {
  if (!datasourceName) {
    return
  }

  Main.innerText = 'Loading...'
  Spinner.classList.add('show')

  const datasource = await loadDatasourceMetadata(getDatasourceURL(apiURL, organizationID, datasourceName), authToken)

  Main.innerText = 'Loaded!'
  Spinner.classList.remove('show')

  connector.setOutlet(ports.metadata, datasource)
  connector.send()
}
