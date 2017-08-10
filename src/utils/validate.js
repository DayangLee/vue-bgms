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

/* 验证是否为正确的邮箱格式 */ 
export function isEmail(s){
    var reg = /^[\S]+@[\S]+[\.][\S]+$/
    if(s == '' || s == null || !reg.test(s)){
        return false
    } else {
        return true
    }
}

/* 验证是否为正确的手机格式 */ 
export function isPhone(s){
    var reg = /(^(13\d|14[57]|15[^4,\D]|17[678]|18\d)\d{8}|170[059]\d{7})$/
    if(s == '' || s == null || !reg.test(s)){
        return false
    } else {
        return true
    }
}