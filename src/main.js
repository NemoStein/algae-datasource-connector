/* global fetch */

/**
 * Composes the URL to the datasource API
 *
 * @param {String} apiURL
 * @param {String} organizationID
 * @param {String} datasourceName
 *
 * @returns {String}
 * @throws {Error} Missing argument
 */
export const getDatasourceURL = (apiURL, organizationID, datasourceName) => {
  if (!apiURL || !organizationID || !datasourceName) {
    throw new Error('Missing argument "apiURL", "organizationID" or "datasourceID"')
  }

  return `${apiURL}/organizations/${organizationID}/data-sources/${datasourceName}`
}

/**
* Loads the datasource metadata
*
* @param {String} datasourceURL
* @param {String} authToken
* @param {AbortSignal} [signal]
*
* @returns {Promise<Object>} Datasource metadata promise
*/
export const loadDatasourceMetadata = async (datasourceURL, authToken, signal) => {
  try {
    const result = await fetch(datasourceURL, {
      signal,
      headers: {
        Authorization: `Bearer ${authToken}`,
        'Content-Type': 'application/json; charset=utf-8'
      }
    })

    return await result.json()
  } catch (error) {
    if (error.name === 'AbortError') {
      console.log(`Request to datasource "${datasourceURL}" aborted`)
      return
    }

    console.log(`Failed to read datasource "${datasourceURL}"`, error)
  }
}

/**
 * Converts the object returned from `loadDatasourceMetadata` to a suitable format to be used in Nest
 *
 * @param {Object} metadata
 *
 * @returns {Object} An object to be passed  Nest
 */
export const convertMetadataToNest = metadata => {
  if (!metadata) {
    return
  }

  return {}
}
