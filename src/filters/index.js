/* 密码显示为* */
export function passwordDeal(string) {
  let showPassword = '';
  for(let i=0; i<string.length; i++){
    showPassword = showPassword + '*';
  }
  return showPassword;
}