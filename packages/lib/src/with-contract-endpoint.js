import set from 'lodash.set'

export default (web3, abi, pathPrefix = '') => obj => {
  const path = `${pathPrefix && pathPrefix + '.'}contract`
  class Contract extends web3.eth.Contract {
    constructor (...args) {
      super(abi, ...args)
    }
  }
  set(obj, path, Contract)
  return obj
}