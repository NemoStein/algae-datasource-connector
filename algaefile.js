import AlgaeAPI from '@lichen/algae-api'
import { convertMetadataToNest } from './src/main.js'

export const ports = {
  datasourceName: 'Datasource Name',
  apiURL: 'API URL',
  organizationID: 'Organization ID',
  authToken: 'Auth Token',
  metadata: 'metadata'
}

// Connector
export const connector = new AlgaeAPI('Datasource Connector').visual('./src/view/index.html')

connector.defineInlet(ports.datasourceName, String, 'The name of the dataset')
connector.defineInlet(ports.apiURL, String, 'The URL to the API')
connector.defineInlet(ports.organizationID, String, 'The ID of the organization')
connector.defineInlet(ports.authToken, String, 'The auth token')

connector.defineOutlet(ports.metadata, Object)

// Converter
export const converter = new AlgaeAPI('Datasource Metadata to Nest Object').operator(convertMetadataToNest)

converter.defineInlet('metadata', Object)
converter.defineOutlet('nest', Object)
