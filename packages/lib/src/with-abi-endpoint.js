import set from 'lodash.set'

export default (abi, pathPrefix = '') => obj => {
  const path = `${pathPrefix && pathPrefix + '.'}abi`
  set(obj, path, abi)
  return obj
}