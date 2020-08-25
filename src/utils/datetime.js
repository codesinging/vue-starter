
const padding = (n) => {
    return n < 10 ? '0' + n : '' + n
}

/**
 * Transform a time (second) to a human-reading string
 * @param seconds
 * @returns {string}
 */
export const timeStr = (seconds)=>{
    let s = parseInt(seconds)
    let m = 0
    let h = 0
    if (s > 60) {
        m = Math.floor(s / 60)
        s = s % 60
        if (m > 60) {
            h = Math.floor(m / 60)
            m = m % 60
        }
    }
    let result = ''

    result = padding(s)

    result = padding(m) + ':' + result

    if (h > 0) {
        result = padding(h) + ':' + result
    }

    return result;
}

export const dateFormat = (date, format='Y-m-d H:i:s') => {
    let objects = {
        "Y": date.getFullYear(),
        "m": padding(date.getMonth() + 1),
        "d": padding(date.getDate()),
        "H": padding(date.getHours()),
        "i": padding(date.getMinutes()),
        "s": padding(date.getSeconds()),
    };
    for (let p in objects) {
        if (format.indexOf(p) > -1) {
            format = format.replace(new RegExp("(" + p + ")"), objects[p]);
        }
    }
    return format;
}
