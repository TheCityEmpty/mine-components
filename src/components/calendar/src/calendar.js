import { handleValue, handleTime } from '../../../utils/tools.js'
import { calendar } from './getLunar.js'

export function getLunar (date) {
  let dd = handleTime(date).split('/')
  return calendar.solar2lunar(dd[0], dd[1], dd[2]).IDayCn
}
// 获取当月第一天 是礼拜几
export function getFirstDay (y, m) {
  let currentMonth = m - 1
  return new Date(y, currentMonth, 1).getDay()
}

// 获取当月最后一天
export function getLastDate (y, m) {
  let nexMonth = m
  if (nexMonth > 11) {
    y++
  }
  return new Date(new Date(y, nexMonth, 1).getTime() - 24 * 60 * 60 * 1000).getDate()
}

// 获取当月最后一天 是礼拜几
export function getLastDay (y, m) {
  let currentMonth = m - 1
  return new Date(y, currentMonth, getLastDate(y, m)).getDay()
}

// 获取 指定年月 日期数据
export function getDateArray (y, m) {
  // 总数据
  let dateArray = []
  // 每一行数据
  let rowData = []
  let firstDay = getFirstDay(y, m)
  let lastDate = getLastDate(y, m)
  let lastDateDay = getLastDay(y, m)
  let prevLastDate = getLastDate(y, m - 1)
  let date = null

  // 获取第一行数据
  for (let i = 1; i <= 7; i++) {
    if (i <= firstDay) {
      date = new Date(y, m - 1, i - firstDay).getTime()
      rowData.push({
        dateStr: y + '/' + handleValue(m - 1) + '/' + handleValue(prevLastDate - (firstDay - i)),
        date: date,
        value: prevLastDate - (firstDay - i),
        enable: false,
        lunar: getLunar(date),
        oper: {}
      })
    } else {
      date = new Date(y, m - 1, i - firstDay).getTime()
      rowData.push({
        dateStr: y + '/' + handleValue(m) + '/' + handleValue(i - firstDay),
        date: new Date(y, m - 1, i - firstDay).getTime(),
        value: i - firstDay,
        enable: true,
        lunar: getLunar(date),
        oper: {}
      })
    }
  }
  dateArray.push(rowData)

  rowData = [] // 清空
  let count = 0
  for (let i = (7 - firstDay + 1); i <= lastDate; i++) {
    if (count < 7) {
      date = new Date(y, m - 1, i).getTime()
      rowData.push({
        dateStr: y + '/' + handleValue(m) + '/' + handleValue(i),
        date: new Date(y, m - 1, i).getTime(),
        value: i,
        enable: true,
        lunar: getLunar(date),
        oper: {}
      })
    } else {
      dateArray.push(rowData)
      rowData = []
      date = new Date(y, m - 1, i).getTime()
      rowData.push({
        dateStr: y + '/' + handleValue(m) + '/' + handleValue(i),
        date: new Date(y, m - 1, i).getTime(),
        value: i,
        enable: true,
        lunar: getLunar(date),
        oper: {}
      })
      count = 0
    }
    if (i === lastDate && count === 6) {
      dateArray.push(rowData)
    }
    count++
  }
  // 获取最后一行
  rowData = []
  if (lastDateDay < 6) {
    for (let i = 0; i <= 6; i++) {
      if (i <= lastDateDay) {
        date = new Date(y, m - 1, lastDate - (lastDateDay - i)).getTime()
        rowData.push({
          dateStr: y + '/' + handleValue(m) + '/' + handleValue(lastDate - (lastDateDay - i)),
          date: new Date(y, m - 1, lastDate - (lastDateDay - i)).getTime(),
          value: lastDate - (lastDateDay - i),
          enable: true,
          lunar: getLunar(date),
          oper: {}
        })
      } else {
        date = new Date(y, m - 1, lastDate - (lastDateDay - i)).getTime()
        rowData.push({
          dateStr: y + '/' + handleValue(m + 1) + '/' + handleValue(i - lastDateDay),
          date: new Date(y, m - 1, lastDate - (lastDateDay - i)).getTime(),
          value: i - lastDateDay,
          enable: false,
          lunar: getLunar(date),
          oper: {}
        })
      }
    }
    dateArray.push(rowData)
  }
  return dateArray
}
