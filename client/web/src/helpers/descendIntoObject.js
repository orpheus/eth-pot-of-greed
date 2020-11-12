/**
 * Grab a value from an Object using a "complex" key string
 * @param  {String} key - The "complex" key to descend to (i.e. `contactInfo[0].emailAddress`)
 * @param  {Object} item - The Object to descend into to grab the value
 * @return {String} Returns the value or a blank string
 */
export default function descendIntoObject (key, item) {
  let value = ''

  // Descend into object to grab value
  if (key.includes('.') || key.includes('[')) {
    const keyParts = key.split('.')

    let tmpValue = item
    while (keyParts.length > 0) {
      // Grab and remove the first element from the array
      let part = keyParts.shift()
      let arrayPart

      // Split off the "array" value if there is one
      if (part.includes('[')) {
        const aParts = part.split('[')
        part = aParts[0]
        arrayPart = parseInt(aParts[1].replace(']', ''))
      }

      // Descend into the key
      if (tmpValue[part] !== undefined) { tmpValue = tmpValue[part] }

      // Descend into the array value if present
      if (arrayPart !== undefined && tmpValue[arrayPart] !== undefined) { tmpValue = tmpValue[arrayPart] }
    }

    if (typeof (tmpValue) !== 'object') { value = tmpValue }
  } else {
    // Grab basic key value pair
    value = item[key]
  }

  return value
}
