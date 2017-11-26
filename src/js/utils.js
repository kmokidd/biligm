// 分钟转小时
export function formatHour(min) {
  let time = '';
  if(min/60 > 1) {
    time = parseInt(min/60) + '小时';
  }
  time = time + min%60 + '秒';
  return time;
}

// 时间戳转 月/日/年
export function formatDate(ts) {
  let d =  new Date(parseInt(ts) * 1000).toLocaleString().replace(/年|月/g, "-").replace(/日/g, " ").toString();
  return d.split(',')[0];
}