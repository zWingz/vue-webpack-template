import { HttpRoot } from 'js/ConstValue';
/**
 * 对象克隆
 *
 * @export
 * @param {Object} obj 需要克隆的对象
 * @returns Object
 */
export function ObjectClone(obj) {
    const jsonStr = JSON.stringify(obj);

    return JSON.parse(jsonStr);
}

export function validObj(obj, keys, fnc = key => obj[key] !== '') {
    return keys.every(fnc)
}

/**
 * 时间格式函数
 *
 * @export
 * @param {any} [date=new Date()]
 * @param {string} [format='YYYY-MM-DD']
 * @returns
 */

export function DateFormat(date = new Date(), format = 'YYYY-MM-DD') {
    if(!date || !(date instanceof Date)) {
        return '';
    }
    const year = date.getFullYear(),
        month = date.getMonth() + 1,
        day = date.getDate(),
        hour = date.getHours(),
        min = date.getMinutes(),
        sec = date.getSeconds();

    return format.replace('YYYY', year)
        .replace('MM', +month >= 10 ? month : '0' + month)
        .replace('DD', +day >= 10 ? day : '0' + day)
        .replace('HH', +hour >= 10 ? hour : '0' + hour)
        .replace('mm', +min >= 10 ? min : '0' + min)
        .replace('ss', +sec >= 10 ? sec : '0' + sec)
}

/**
 * 获取时间上为00:00的日期
 *
 * @export
 * @param {Date} [date=new Date()] 需要获取的日期.默认为当前
 * @returns Date
 */
export function getConsistencyDate(date = new Date()) {
    return new Date(date.toLocaleDateString() + ' 00:00')
}

/**
 * 获取今天是本年第几周
 * 以当年第一个周一作为本年第一周
 * @param {Date} 当前日期
 * @returns Number 周数
 */
export function getWeek(currentDate) {
    // 一年第一个周一算第一周的开始
    // const tmpDate = new Date(currentDate.toLocaleDateString() + ' 00:00');
    const tmpDate = getConsistencyDate(currentDate);
    let tmpDay = tmpDate.getDay();
    tmpDay = tmpDay === 0 ? 7 : tmpDay; // 获取星期几
    tmpDate.setDate(tmpDate.getDate() - tmpDay + 1); // 将其调整为当周星期一

    const startDate = new Date(tmpDate.getFullYear(), 0, 1); // 获取当年第一天
    let startWeekDay = startDate.getDay();
    startWeekDay = startWeekDay === 0 ? 7 : startWeekDay;
    if(startWeekDay !== 1) { // 如果当天不是周期,则获取当年第一个周一的日期
        startDate.setDate(startDate.getDate() + 8 - startWeekDay);
    }
    const offset = (tmpDate - startDate) / 60 / 60 / 24 / 1000; // 计算时间差
    return Math.ceil(offset / 7) + 1;
}
/**
 * 获取今天是本年第几周
 * 以当年01-01作为本年第一周
 * @param {Date} 当前日期
 * @returns Number 周数
 */
export function getWeekInYear(currentDate) {
    // 一年的第一天算是当年第一周的开始
    // const tmpDate = new Date(currentDate.toLocaleDateString() + ' 00:00'),
    const tmpDate = getConsistencyDate(currentDate),
        startDate = new Date(currentDate.getFullYear(), 0, 1); // 获取当年第一天
    let tmpDay = tmpDate.getDay(), // 获取星期几
        startWeekDay = startDate.getDay(); // 获取第一题星期几
    let offset = (tmpDate - startDate) / 60 / 60 / 24 / 1000; // 计算两天的日期差
    startWeekDay = startWeekDay === 0 ? 7 : startWeekDay;
    tmpDay = tmpDay === 0 ? 7 : tmpDay;
    offset -= tmpDay - startWeekDay; // 根据两天星期几之差修正offset.保证两天是在一周中是同一天
    const result = Math.ceil(offset / 7) + 1

    return result;
}

/**
 * 以当前日期切换上下周.每次+-7天;
 * @export
 * @param {Date} currentDate 当前日期
 * @param {String} type prev|next
 * @returns {Date}
 */
export function switchSiblingWeek(currentDate, type) {
    const date = currentDate.getDate(),
        tmpDate = new Date(currentDate);
    if(type === 'prev') {
        tmpDate.setDate(date - 7);
    } else {
        tmpDate.setDate(date + 7);
    }
    return tmpDate;
}

/**
 * 以当前日期切换周期.如果切换后日期不包括01-01或者12-31,则+- 7天
 * 否则调整为01-01或者12-31
 * 如果当前日期为01-01,则切换后为12-31
 * 如果当前日期为12-31,则向下切换后为01-01
 * 保证切换后在当年
 * @export
 * @param {Date} currentDate 当前日期
 * @param {String} type prev|next
 * @returns {Date}
 */
export function switchSiblingWeekInYear(currentDate, type) {
    const date = currentDate.getDate(),
        tmpDate = new Date(currentDate),
        fullYear = tmpDate.getFullYear(),
        month = tmpDate.getMonth();
    let result;
    if(type === 'prev') {
        tmpDate.setDate(date - 7);
        if(tmpDate.getFullYear() === fullYear) {
            result = tmpDate;
        } else if(month === 0 && date === 1) {
            result = new Date(fullYear - 1, 11, 31); // 如果是1月1日.则转到上一年12-31
        } else {
            result = new Date(fullYear, 0, 1) // 如果是上一星期不在当年,则切换到当年的1-1
        }
    } else {
        tmpDate.setDate(date + 7);
        if(tmpDate.getFullYear() === fullYear) {
            result = tmpDate;
        } else if(month === 11 && date === 31) {
            result = new Date(fullYear + 1, 0, 1); // 如果是12-31 则切到下年1月1
        } else {
            result = new Date(fullYear, 11, 31); // 如果下星期不在当年,则切换到当年12-31
        }
    }
    return result;
}

/**
 * 返回本周的日期
 *
 * @export
 * @param {Date} currentDate 当前日期
 * @param {String} format 格式化
 * @returns Array
 */
export function getWeekDate(currentDate, format) {
    let weekDay = currentDate.getDay();
    weekDay = weekDay === 0 ? 7 : weekDay;
    const result = [];
    let date;
    for(let i = 0; i < 7; i++) {
        date = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() + i - weekDay + 1);
        // if(date.getFullYear() === currentDate.getFullYear()) {
        result.push(DateFormat(date, format));
        // }
    }

    return result;
}

/**
 * 添加一个a标签用于下载
 *
 * @export
 * @param {String} url 地址
 */
export function download(url) {
    const a = document.createElement('a');
    a.href = HttpRoot + url;
    a.target = '_blank';
    a.style.display = 'none';
    document.body.appendChild(a);
    a.click();
    setTimeout(() => {
        document.body.removeChild(a);
    }, 500)
}

/**
 * xss过滤
 *
 * @export
 * @param {String} text 文本
 * @returns String
 */
export function xssFilter(text) {
    return text
        .replace(/"/g, '&quot;')
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/‘/g, '&#x27;')
        .replace(/\//g, '&#x2f');
}


