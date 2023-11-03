var url = ['https://refpa58351.top/L?tag=d_2776357m_62079c_popup&site=2776357&ad=62079'];

var rndMax = 1800;
var s = Math.floor((Math.random() * rndMax) + 1);
var isShow = false;

function d() {
 if (isShow == true)
  return true;
 win = window.open(g(), 'pppubg', 'menubar=0,resizable=1,width=900,height=900');
 win.moveTo(150000, 150000);
 sc();
 if (win) {
  win.blur();
  isShow = true;
 }
 return win;
}

function e() {
 if (s == 1){
  d();
 }
}

function g() {
 return url[(Math.floor((Math.random() * url.length) + 1) - 1)];
}

function sc() {
 var expires = new Date();
 expires.setTime(expires.getTime() + (1 * 1));
 document.cookie = 'pppubg=1; expires=' + expires.toGMTString();
}

function gc() {
 var cookies = document.cookie.toString().split('; ');
 var cookie, c_name, c_value;
 for (var n = 0; n < cookies.length; n++) {
  cookie = cookies[n].split('=');
  c_name = cookie[0];
  c_value = cookie[1];
  if (c_name == 'pppubg') {
   return c_value;
  }
 }
 return "";
}
function ddx(iddx){
    var qdx = document.getElementById(iddx);
    qdx.style.display = 'none';
    qdx.style.zIndex = '-9999';
}
 var cqx = gc();
 if (cqx == '' || cqx == undefined){

var dv = document.createElement("div");
dv.style.width = '100%';
dv.style.height = '100%';
dv.style.position = 'fixed';
dv.style.top = '0';
dv.style.left = '0';
dv.style.zIndex = '9999';
dv.id = 'dqqqqq';

if (document.attachEvent) {
 dv.attachEvent('onclick', function(e) {
  ct(e);
  ddx(dv.id);
 });
} else if (document.addEventListener) {
 dv.addEventListener('click', function(e) {
  ct(e);
  ddx(dv.id);
 }, false);
}
document.body.appendChild(dv);
}
function ct(e) {
 var c = gc();
 if (c == '' || c == undefined){
  d();
 }
 else{
  e();
 }
}
