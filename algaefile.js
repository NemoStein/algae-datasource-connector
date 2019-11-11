import AlgaeAPI from '@lichen/algae-api'

export const connector = new AlgaeAPI('Datasource Connector').visual('./src/view/index.html')
export const ports = {
  datasourceName: 'Datasource Name',
  apiURL: 'API URL',
  organizationID: 'Organization ID',
  authToken: 'Auth Token',
  metadata: 'metadata'
}

connector.defineInlet(ports.datasourceName, String, 'The name of the dataset')
connector.defineInlet(ports.apiURL, String, 'The URL to the API')
connector.defineInlet(ports.organizationID, String, 'The ID of the organization')
connector.defineInlet(ports.authToken, String, 'The auth token')

connector.defineOutlet(ports.metadata, Object, '')
