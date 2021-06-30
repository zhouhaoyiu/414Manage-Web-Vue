const pageList = [{
  'introduction': '/introduction'
}]

function deepClone(org, tar) {
  var tar = tar || {}
  var toStr = Object.prototype.toString
  var arrType = '[object Array]'

  for (let key in org) {
    if (org.hasOwnProperty(key)) {
      if (typeof (org[key]) === 'object' && org[key] !== null) {
        tar[key] = toStr.call(org[key]) === arrType ? [] : {}
        deepClone(org[key], tar[key])
      } else {
        tar[key] = org[key]
      }
    }
  }
  return tar
}

export default pageList
