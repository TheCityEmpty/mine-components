
/**
 * @desc 取一个范围内随机数
 */

export const getRandom = (start, end) => {
  const diffVal = end - start
  return Math.floor(Math.random() * (diffVal + 1) + start)
}
/**
 * @desc 补0
 * @param { Number } n 传入的数
 */
export function handleValue (n) {
  return n < 10 ? `0${n}` : n
}
/**
 * @param {Number} timeStamp 传入的时间
 * @returns {String} 返回年月日格式
 * @param {Boolean} local 不是中文则返回true ，否则为false
 */
export const handleTime = (time, delimiter) => {
  const d = new Date(time)
  const year = d.getFullYear().toString()
  const month = handleValue((d.getMonth() + 1).toString())
  const date = handleValue(d.getDate().toString())
  const arr = [year, month, date]
  if (!delimiter && (delimiter === null || delimiter === undefined)) {
    delimiter = '/'
  }
  return arr.join(delimiter)
}
