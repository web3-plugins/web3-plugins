const abi = require('./abi.json')

const identity = i => i
const contractFactoryFromABI = (web3, abi) => (...args) => new web3.eth.Contract(abi, ...args)
const withContractFactory = contractFactory => (fn = identity) => (deployedAddr, ...args) => fn(contractFactory(deployedAddr), ...args)

export default {
  addEndpoints: web3 => {
    const contractFactory = contractFactoryFromABI(web3, abi)
    const withContract = withContractFactory(contractFactory)

    return {
      'erc20.abi': abi,
      'erc20.contract': contractFactory(),
      'erc20.contract.at': withContract()
    }
  }
}