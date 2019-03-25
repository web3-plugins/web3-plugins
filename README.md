# Web3 Plugins
A plugin system for the web3.js library.  
Extend the functionality of web3.js by adding endpoints to a Web3 instance.

```javascript
import Web3 from 'web3'
import withPlugins from '@web3-plugins/core'

// import an officially supported plugin
import erc20Plugin from '@web3-plugins/erc20'

// or author your own custom plugins
const toDisplayValuePlugin = {
  addEndpoints: web3 => ({
    'utils.toDisplayValue': (value, decimals = 18) => {
      const ten = new web3.utils.BN(10)
      const baseUnit = ten.exponentiatedBy(decimals)
      const baseValue = new web3.utils.BN(value)
      return baseValue.dividedBy(baseUnit)
    }
  })
}

// instantiate a web3 instance with plugins
const web3 = new withPlugins(Web3, [
  erc20Plugin,
  toDisplayValuePlugin
])(Web3.givenProvider)

// take your enhanced web3 instance for a spin...
const doStuff = async () => {
  const tokenAddress = '0xBB9bc244D798123fDe783fCc1C72d3Bb8C189413'
  const walletAddress = '0xB3764761E297D6f121e79C32A65829Cd1dDb4D32'

  // using the erc20 plugin endpoints
  const decimals = await web3.erc20.decimals(tokenAddress).call()
  const walletBalance = await web3.erc20.balanceOf(tokenAddress, walletAddress).call()
  
  // using the toDisplayValue endpoint
  const walletDisplayBalance = web3.utils.toDisplayValue(walletBalance, decimals)
}
```