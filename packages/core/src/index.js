import set from 'lodash.set'

const FORBIDDEN_PATHS = [
  'eth',
  'eth.subscribe',
  'eth.Contract',
  'eth.accounts',
  'eth.personal',
  'eth.ens',
  'eth.abi',
  'eth.net',
  'bzz',
  'bzz.net',
  'shh',
  'shh.net',
  'utils'
]

const validatePlugin = plugin => {
  if (
    typeof plugin !== 'object' ||
    typeof plugin.name !== 'string',
    typeof plugin.addEndpoints !== 'function'
  ) {
    throw new Error('Web3 plugin must be an object with a fields <name> (string) and <addEndpoints> (function)')
  }
}

const flattenObject = (obj, prefix = '', result = {}) => {
  Object.entries(obj).forEach(([key, value]) => {
    if (value === Object(value)) {
      flattenObject(value, prefix + key + '.', result)
    } else {
      result[prefix + key] = value
    }
  })
  return result
}

function withPlugins (Web3, pluginsArray) {
  return class Web3WithPlugins extends Web3 {
    constructor (...args) {
      super(...args)

      // validate and apply each plugin
      for (let plugin of pluginsArray) {
        // throw if plugin is not correctly configured
        validatePlugin(plugin)

        // get the endpoints by calling the plugin's addEndpoints function
        const endpoints = plugin.addEndpoints(this)
        
        // for each endpoint
        // deeply set it on the web3 instance
        // at the specified path
        for (let path in flattenObject(endpoints)) {
          if (FORBIDDEN_PATHS.includes(path)) {
            throw new Error(`Web3 plugin ${plugin.name} is attempting to overwrite a standard api endpoint: web3.${path}`)
          }
          const endpoint = endpoints[path]
          set(this, path, endpoint)
        }
      }
    }
  }
}

export default withPlugins