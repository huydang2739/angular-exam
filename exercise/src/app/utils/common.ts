import { v4 } from 'uuid'
import { IconFile } from '../types/constants'
import { camelCase, isArray, isObject, transform } from 'lodash'
export const removeAccent = (text: string) => {
  let str = text.trim().toLowerCase()
  str = str.replace(/[áàảãạâấầẩẫậăắằẳẵặ]/ig, 'a')
  str = str.replace(/[éèẻẽẹêếềểễệ]/ig, 'e')
  str = str.replace(/[iíìỉĩị]/ig, 'i')
  str = str.replace(/[óòỏõọơớờởỡợôốồổỗộ]/ig, 'o')
  str = str.replace(/[úùủũụưứừửữự]/ig, 'u')
  str = str.replace(/[yýỳỷỹỵ]/ig, 'y')
  str = str.replace(/[đ]/ig, 'd')
  return str
}

export const toEnglish = (objectName: string) => {
  objectName = objectName.toLowerCase()
  objectName = removeAccent(objectName)
  objectName = objectName.replace(/[^a-z0-9\d\s\-]/g, '')
  objectName = objectName.replace(/\s*\-\s*/g, '-')
  objectName = objectName.replace(/\s+/g, '-')
  return objectName.trim()
}

export const toFileName = (str: string) => {
  str = toEnglish(str)
  str = str.replace(/\s+/gi, '-')
  return str
}

export const formatFileSizeHumanReadable = (sizeInBytes: number, threshhold: number = 1024) => {
  if (Math.abs(sizeInBytes) < threshhold) {
    return sizeInBytes + ' B'
  }
  const units = threshhold === 1024 ?
    ['KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'] : ['KiB', 'MiB', 'GiB', 'TiB', 'PiB', 'EiB', 'ZiB', 'YiB']

  let u = -1

  do {
    sizeInBytes /= threshhold
    ++u
  }
  while (Math.abs(sizeInBytes) >= threshhold && u < units.length - 1)

  return sizeInBytes.toFixed(1) + ' ' + units[u]
}

export const getFileExtension = (fileName: string) => {
  if (fileName.indexOf('.') < -1) {
    return
  }
  return fileName.split('.').pop()
}

export const getResizedImage = (url: any, size: number) => {
  if (!url) {
    return
  }
  const match = url.match(/\?w\=(\d+)/gi)
  if (match && match.length > 0) {
    return url
  }
  return `${url}?w=${size}`
}

export const shorten = (text: string, numOfCharacters: number = 300): string => {
  if (text && text.length > 0) {
    text = text.replace(/(<([^>]+)>)/ig, '')
    text = text.replace(/\s+/g, ' ')
    if (text.length > numOfCharacters) {
      text = text.substr(0, numOfCharacters)
      const lastIndex = text.lastIndexOf(' ')
      text = text.slice(0, lastIndex) + '...'
    }
  }
  return text
}

export const ellipsis = (text: string, numOfCharacters: number, offset: number = 10): string => {
  if (text && text.length > numOfCharacters && numOfCharacters > offset) {
    const split1 = text.slice(0, numOfCharacters - offset)
    const split2 = text.slice(text.length - offset, text.length)
    return `${split1}...${split2}`
  }
  return text
}

export const stripHtml = (html: string): string => {
  if (html && html.length > 0) {
    html = html.replace(/(<([^>]+)>)/ig, '')
    html = html.replace(/\s+/g, ' ')
  }
  return html
}

export const getInitials = (lastName: string) => {
  if (!lastName) {
    return
  }
  if (lastName === '...') {
    return '···'
  }
  lastName = lastName.trim()
  lastName = lastName.replace('-', ' ').replace('_', ' ')
  const frags = lastName.split(/\s+/g)
  let initials = ''
  if (frags) {
    initials = frags[0][0]
    if (frags.length > 1) {
      initials = initials + frags[1][0]
    }
  }
  return `${initials}`
}

export const toUniqueFilename = (filename: string, fileExt: string = null) => {
  if (!fileExt || fileExt.length === 0) {
    fileExt = getFileExtension(filename)
  }
  const uuid = v4()
  filename = `${filename.replace(`.${fileExt}`, '')}-${uuid}.${fileExt}`
  return filename
}

export const downloadFile = (url: string, name?: string) => {
  const anchor = document.createElement('a')
  anchor.setAttribute('download', name)
  anchor.setAttribute('href', url)
  anchor.setAttribute('target', '_blank')
  anchor.click()
}

export const regexYouTube = new RegExp(/^http(?:s?):\/\/(?:www\.)?youtu(?:be\.com\/watch\?v=|\.be\/)([\w\-\_]*)(&(amp;)?‌​[\w\?‌​=]*)?/)
export const regexVimeo = new RegExp(/^(http|https)?:\/\/(www\.)?vimeo.com\/(?:channels\/(?:\w+\/)?|groups\/([^\/]*)\/videos\/|)(\d+)(?:|\/\?)/)

export const isYouTubeLink = (url: string) => {
  return regexYouTube.test(url)
}

export const isVimeoLink = (url: string) => {
  return regexVimeo.test(url)
}

export const isBrowserIE = () => {
  if (navigator.appName === 'Microsoft Internet Explorer'
    || !!(navigator.userAgent.match(/Trident/)
      || navigator.userAgent.match(/rv:11/))
    || !!navigator.userAgent.match(/Trident.*rv\:11\./)
  ) {
    return true
  }
  return false
}

export const download = (url: string, name?: string) => {
  const anchor = document.createElement('a')
  anchor.setAttribute('download', name)
  anchor.setAttribute('href', url)
  anchor.setAttribute('target', '_blank')
  anchor.click()
}

export const lightenDarkenColor = (color, percent) => {
  const num = parseInt(color.replace('#', ''), 16),
    amt = Math.round(2.55 * percent),
    R = (num >> 16) + amt,
    B = (num >> 8 & 0x00FF) + amt,
    G = (num & 0x0000FF) + amt
  return '#' + (0x1000000 + (R < 255 ? R < 1 ? 0 : R : 255) * 0x10000 + (B < 255 ? B < 1 ? 0 : B : 255) * 0x100 + (G < 255 ? G < 1 ? 0 : G : 255)).toString(16).slice(1)
}

export const convertHexToRGBA = (hex, opacity) => {
  const tempHex = hex.replace('#', '')
  const r = parseInt(tempHex.substring(0, 2), 16)
  const g = parseInt(tempHex.substring(2, 4), 16)
  const b = parseInt(tempHex.substring(4, 6), 16)

  return `rgba(${r},${g},${b},${opacity / 100})`
}

export const hexToRgb = (hex) => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null
}
export const hexToRgbString = (hex, alpha: number = 1) => {
  const value = hexToRgb(hex)
  if (value === null) {
    return null
  }

  return `rgba(${value.r}, ${value.g}, ${value.b}, ${alpha})`
}
export const getFileIcon = (file: string) => {
  if (file) {
    const extension = file.split('.').pop()
    const type = IconFile.find(item => item.name === extension.toLowerCase())
    return type || IconFile[0]
  }
  return
}
export const flatMap = (f, xs) => xs.map(f).reduce((x, y) => x.concat(y), [])


export const getFileNameFromUrl = (url: string) => {
  return url.split('/').pop().split('#')[0].split('?')[0]
}

export const getYoutubeID = (url: string) => {
  return url.split('v=')[1].split('&')[0]
}

export const isInViewport = (element) => {
  const rect = element.getBoundingClientRect()
  const html = document.documentElement
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || html.clientHeight) &&
    rect.right <= (window.innerWidth || html.clientWidth)
  )
}

export const isInViewportVideo = (element) => {
  const rect = element.getBoundingClientRect()
  const html = document.documentElement
  return (
    rect.top >= -200 &&
    rect.left >= 0 &&
    // rect.bottom <= (window.innerHeight || html.clientHeight) &&
    rect.right <= (window.innerWidth || html.clientWidth)
  )
}

export const letter = (charNumber: number) => {
  if (charNumber == null) {
    return
  }
  return String.fromCharCode(97 + charNumber).toUpperCase()
}

export const groupBy = (objects: Object[], propertyName: string) => {
  const newObjects = objects.reduce((prev, cur) => {
    if (!prev[cur[propertyName]]) {
      prev[cur[propertyName]] = [cur]
    } else {
      prev[cur[propertyName]].push(cur)
    }
    return prev
  }, {})

  return Object.keys(newObjects).map(key => ({ key, value: newObjects[key] }))
}

export const camelize = obj => transform(obj, (acc, value, key, target) => {
  const camelKey = isArray(target) ? key : camelCase(key.toString())

  acc[camelKey] = isObject(value) ? camelize(value) : value
})
