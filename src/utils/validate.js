/* 是否是公司邮箱*/
export function isHwEmail(str) {
    const reg = /^[a-z0-9](?:[-_.+]?[a-z0-9]+)*@hanwang\.com\.cn$/i;
    return reg.test(str.trim());
}

/* 是否为中文字符 */
export function isChinese(s){
    var ret = true
    for(var i=0; i<s.length; i++)
    ret = ret && (s.charCodeAt(i) >= 10000)
    return ret
}
