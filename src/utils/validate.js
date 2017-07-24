/* 是否是公司邮箱*/
export function isHwEmail(str) {
    const reg = /^[a-z0-9](?:[-_.+]?[a-z0-9]+)*@hanwang\.com\.cn$/i;
    return reg.test(str.trim());
}