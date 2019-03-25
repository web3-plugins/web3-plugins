const abi = require('./abi.json')

const contractFactoryFromABI = abi => (...args) => new web3.eth.Contract(abi, ...args)
const withContractFactory = contractFactory => fn => (deployedAddr, ...args) => fn(contractFactory(deployedAddr), ...args)

export default {
  addEndpoints: web3 => {
    const contractFactory = contractFactoryFromABI(abi)
    const withContract = withContractFactory(contractFactory)

    const contractMethodEndpoints = abi
      .filter(interfaceDefinition => interfaceDefinition.type === 'function')
      .reduce((endpoints, functionDefinition) => {
        const methodName = functionDefinition.name
        endpoints[methodName] = withContract((c, ...params) =>
          c.methods[methodName](...params))

        return endpoints
      }, {})

    return {
      erc20: {
        abi,
        contractFactory,
        ...contractMethodEndpoints
      }
    }
  }
}