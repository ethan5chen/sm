//获取url参数
// let url="http://123.58.39.29:8080/AutoFlow/MainServlet";
//let url = "https://easy-mock.com/mock/5c9627a9a2a865620c156c3d/mes/";
//let url="http://ip:8080/AutoFlow";
// let url="http://123.58.39.29:8081/AutoFlow";WebUploadServlet
let url="http://47.98.223.167:8080/sModelNew/WebMainServlet";
let url2="http://47.98.223.167:8080/sModelNew/WebUploadServlet";
//http://123.58.39.29:8081/AutoFlow/template/getRelation.action?str1=1&str2=inOut
//let url2="https://www.easy-mock.com/mock/5d14258323814619b952ba12";

//http://192.168.2.104:8080/AutoFlow/template/getRelation.action?str1=1&str2=inOut


function getQueryString(name) {
  let reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
  let r = window.location.search.substr(1).match(reg);
  if(r!=null)return  unescape(r[2]); return null;
}