import { isObject } from '@vueuse/core'

export const isEmpty = (val: unknown) => !(val ? typeof val === 'object' ? Array.isArray(val) ? !!val.length : !!Object.keys(val).length : true : false)

/**
 * 转换为千分位
 * showDecimal: 是否显示小数位
 */
export function transformNumber(num: number | string | null | undefined,
  placeholder: string,
  showDecimal = true): string {
  const numStr = `${num}`
  if (placeholder && (num === null || num === undefined || num === '')) 
    return placeholder
  
  // 默认值为-
  if (num === null || num === undefined || num === '') 
    return '-'
  
  if (['0', '0.00', '0.', '0.0'].includes(numStr)) 
    return showDecimal ? '0.00' : '0'
  
  num = Number.parseFloat(`${num}`)
  const reg = /(\d)(?=(\d{3})+\.)/g
  // 避免出现-0.00的情况
  const finalNum = Number.parseFloat(num.toFixed(2)) + 0
  if (showDecimal) 
    return finalNum.toFixed(2).replace(reg, '$1,')
  
  // 取整
  return finalNum.toFixed(0)
}

/** 根据字符串读取对象属性值，比如：obj['a.b.c'] */
export function getProp(obj: any, value: string) {
  if (!value.includes('.')) 
    return obj[value] || null
  const keys = value.split('.')
  let tmp = obj
  for (let i = 0; i < keys.length; i++) {
    const key = keys[i]
    if (isObject(tmp[key])) 
      tmp = tmp[key]
    else 
      return tmp[key]
    
  }
  return null
}

/** 将map转换为list */
export function mapToList(map: any): Array<any> {
  const list = []
  for (const [key, value] of Object.entries(map)) {
    if (key === 'toString') 
      continue
    const name = map.toString(value)
    list.push({
      value, name, label: name,
    })
  }
  return list
}

/** 获取问号?参数 */
export function getQueryString(url: string, params: string): string {
  const res = new RegExp(`(?:&|/?)${params}=([^&$]+)`).exec(url)
  return res ? res[1] : ''
}

/** 获取url参数 */
export const getURLParam = (key: string, href = window.location.href): string => getQueryString(href, key)

/** 密码加密 */
export function encodePwd(x: string): string {
  if (!x) 
    return ''

  const v = Array(x.length)
    .fill(0)
    .flatMap((z, i) => {
      const c = x.charCodeAt(i)
      if (c < 0x80) 
        return [c]
      
      if (c < 0x800) 
        return [0xC0 | (c >> 6), 0x80 | (c & 0x3F)]
      
      return [0xE0 | (c >> 12), 0x80 | ((c >> 6) & 0x3F), 0x80 | (c & 0x3F)]
    })
    .map(v => String.fromCharCode(v ^ 0xCF))
    .join('')

  return window.btoa(v)
}

/** 获取promise状态 */
export function getPromiseState(p: Promise<any>): Promise<any> {
  const t = {
  }
  return Promise.race([p, t]).then(v => (v === t) ? 'pending' : 'fulfilled', () => 'rejected')
}

/** 获取解码后的字符串，如果报错就返回原字符串 */
export function getDecodeStr(str: string): string {
  let res
  try {
    res = decodeURIComponent(str)
  }
  catch (error) {
    res = str
  }
  return res
}
