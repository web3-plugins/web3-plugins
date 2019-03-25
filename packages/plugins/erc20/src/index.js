import flow from 'lodash.flow'
import { withABIEndpoint, withContractEndpoint } from '@web3-plugins/lib'

const abi = require('./abi.json')

export default {
  name: 'erc20',
  addEndpoints: web3 => flow(
    withABIEndpoint(abi, 'erc20'),
    withContractEndpoint(web3, abi, 'erc20')
  )({})
}