function withPlugins (Web3Class, pluginsArray) {
  return class extends Web3Class {
    constructor (...args) {
      super(...args)

      for (let plugin of pluginsArray) {
        if (
          typeof plugin !== 'object' ||
          typeof plugin.name !== 'string' ||
          typeof plugin.factory !== 'function'
        ) {
          throw new Error('Web3 ')
        }

        this[plugin.name] = plugin.factory(this);
      }
    }
  }
}

export default withPlugins