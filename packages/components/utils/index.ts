/**
 * 时间对象生成器, 生成时间戳, 兼容苹果
 */
export function toTimer(timeStr: string) {
  return new Date(timeStr.replace(/\-/g, "/"));
}

/**
 * @description 时间格式化
 * @param dateTime { number | string } 时间戳或文本
 * @param fmt { string } 时间格式
 * @return { string }
 */
// yyyy:mm:dd|yyyy:mm|yyyy年mm月dd日|yyyy年mm月dd日 hh时MM分等,可自定义组合
export const timeFormat = (dateTime: number, fmt = "yyyy-mm-dd") => {
  // 如果为null,则格式化当前时间
  let date;
  let ret;
  if (!dateTime) {
    dateTime = Number(new Date());
  }
  const dtS = dateTime.toString();
  if (dtS.indexOf("-") > -1) {
    // 处理 2023-11-2 这种格式
    date = toTimer(dtS);
  } else {
    // 如果dateTime长度为10或者13，则为秒和毫秒的时间戳，如果超过13位，则为其他的时间格式
    if (dtS.length == 10) {
      dateTime *= 1000;
    }
    date = new Date(dateTime);
  }
  const opt: any = {
    "y+": date.getFullYear().toString(), // 年
    "m+": (date.getMonth() + 1).toString(), // 月
    "d+": date.getDate().toString(), // 日
    "h+": date.getHours().toString(), // 时
    "M+": date.getMinutes().toString(), // 分
    "s+": date.getSeconds().toString(), // 秒
  };
  for (const k in opt) {
    ret = new RegExp("(" + k + ")").exec(fmt);
    if (ret) {
      fmt = fmt.replace(
        ret[1],
        ret[1].length == 1 ? opt[k] : opt[k].padStart(ret[1].length, "0")
      );
    }
  }
  return fmt;
};

/** 是否图片格式
 * @param {Object} value
 */
export function testImage(value: string) {
    const newValue = value.split('?')[0]
    const IMAGE_REGEXP = /\.(jpeg|jpg|gif|png|svg|webp|jfif|bmp|dpg)/i
    return IMAGE_REGEXP.test(newValue)
}

/**
 * 是否视频格式
 * @param {Object} value
 */
export function testVideo(value: string) {
    const VIDEO_REGEXP = /\.(mp4|mpg|mpeg|dat|asf|avi|rm|rmvb|mov|wmv|flv|mkv|m3u8)/i
    return VIDEO_REGEXP.test(value)
}
