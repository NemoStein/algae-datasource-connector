import AlgaeAPI from '@lichen/algae-api'
import { metadataToDEH, metadataToNest } from './src/main.js'

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

// Converters
export const deh = new AlgaeAPI('Datasource Metadata to Nest Object').operator(metadataToNest)
deh.defineInlet('metadata', Object)
deh.defineOutlet('object', Object)

export const nest = new AlgaeAPI('Datasource Metadata to DDVEventHandler').operator(metadataToNest)
nest.defineInlet('metadata', Object)
nest.defineOutlet('object', Object)
