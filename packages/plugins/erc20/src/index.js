import abi from './abi'

const contractFactoryFromABI = abi => (...args) => new web3.eth.Contract(abi, ...args)
const withContractFactory = contractFactory => fn => (deployedAddr, ...args) => fn(contractFactory(deployedAddr), ...args)

export default {
  addEndpoints: web3 => {
    const contractFactory = contractFactoryFromABI(abi)
    const withContract = withContractFactory(contractFactory)

    const contractMethodEndpoints = abi
      .filter(interface => interface.type === 'function')
      .reduce((endpoints, functionInterface) => {
        const methodName = functionInterface.name
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