const validatePlugin = plugin => {
  if (
    typeof plugin !== 'object' ||
    typeof plugin.addEndpoints !== 'function'
  ) {
    throw new Error('Web3 plugin must be an object with a field "addEndpoints" that is a function.')
  }
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
        for (let path in endpoints) {
          const endpoint = endpoints[path]
          _.set(this, path, endpoint)
        }
      }
    }
  }
}

export default withPlugins