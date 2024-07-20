/**
 * 将ISO 8601格式的日期时间字符串转换为自定义格式
 * @param {string} isoString - ISO 8601格式的日期时间字符串
 * @returns {string} 自定义格式的日期时间字符串
 */
export function formatDateTime(isoString: string) {
  // 创建一个Date对象
  const date = new Date(isoString)

  // 获取各个时间部分
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0') // 月份是从0开始的，需要加1
  const day = String(date.getDate()).padStart(2, '0')
  const hours = String(date.getHours()).padStart(2, '0')
  const minutes = String(date.getMinutes()).padStart(2, '0')
  const seconds = String(date.getSeconds()).padStart(2, '0')
  const milliseconds = String(date.getMilliseconds()).padStart(3, '0')

  // 自定义格式化
  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}.${milliseconds}`
}


