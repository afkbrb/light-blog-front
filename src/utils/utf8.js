/**
 * Make sure the charset of the page using this script is
 * set to utf-8 or you will not get the correct results.
 */
const highSurrogateMin = 0xd800
const highSurrogateMax = 0xdbff
const lowSurrogateMin = 0xdc00
const lowSurrogateMax = 0xdfff
const surrogateBase = 0x10000

function isHighSurrogate(charCode) {
  return highSurrogateMin <= charCode && charCode <= highSurrogateMax
}

function isLowSurrogate(charCode) {
  return lowSurrogateMin <= charCode && charCode <= lowSurrogateMax
}

function combineSurrogate(high, low) {
  return ((high - highSurrogateMin) << 10) + (low - lowSurrogateMin) + surrogateBase
}

/**
 * Convert JavaScript String to an Array of
 * UTF8 bytes
 * @export
 */
function stringToBytes(str) {
  const bytes = []
  const strLength = str.length
  let strIndex = 0
  let charCode; let charCode2

  while (strIndex < strLength) {
    charCode = str.charCodeAt(strIndex++)

    // handle surrogate pair
    if (isHighSurrogate(charCode)) {
      if (strIndex === strLength) {
        throw new Error('Invalid format')
      }

      charCode2 = str.charCodeAt(strIndex++)

      if (!isLowSurrogate(charCode2)) {
        throw new Error('Invalid format')
      }

      charCode = combineSurrogate(charCode, charCode2)
    }

    // convert charCode to UTF8 bytes
    if (charCode < 0x80) {
      // one byte
      bytes.push(charCode)
    } else if (charCode < 0x800) {
      // two bytes
      bytes.push(0xc0 | (charCode >> 6))
      bytes.push(0x80 | (charCode & 0x3f))
    } else if (charCode < 0x10000) {
      // three bytes
      bytes.push(0xe0 | (charCode >> 12))
      bytes.push(0x80 | ((charCode >> 6) & 0x3f))
      bytes.push(0x80 | (charCode & 0x3f))
    } else {
      // four bytes
      bytes.push(0xf0 | (charCode >> 18))
      bytes.push(0x80 | ((charCode >> 12) & 0x3f))
      bytes.push(0x80 | ((charCode >> 6) & 0x3f))
      bytes.push(0x80 | (charCode & 0x3f))
    }
  }

  return bytes
}

export function toByteStringUTF8(string) {
  if (string === '' || string === undefined) return ''
  const arr = stringToBytes(string)
  let result = ''
  for (const key of arr) {
    result += key
  }
  return result
}

