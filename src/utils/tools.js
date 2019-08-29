
/**
 * @desc 取一个范围内随机数
 */

export const getRandom = (start, end) => {
  const diffVal = end - start
  return Math.floor(Math.random() * (diffVal + 1) + start)
}
