/* @flow */

/**
 * Check if a string starts with $ or _
 */
export function isReserved (str: string): boolean {
  //检查字符串是否是以 $ 或者 _ 开始的
  const c = (str + '').charCodeAt(0) //返回index为0的字符unicode码,无参数时默认为0，index>=0
  return c === 0x24 || c === 0x5F
}

/**
 * Define a property.
 */
export function def (obj: Object, key: string, val: any, enumerable?: boolean) {
  Object.defineProperty(obj, key, {
    value: val,
    enumerable: !!enumerable,
    writable: true,
    configurable: true
  })
}

/**
 * Parse simple path.
 */
// 用.判断子属性分割
const bailRE = /[^\w.$]/
export function parsePath (path: string): any {
  if (bailRE.test(path)) {
    return
  }
  const segments = path.split('.')
  return function (obj) {
    for (let i = 0; i < segments.length; i++) {
      if (!obj) return
      obj = obj[segments[i]]
    }
    return obj
  }
}
