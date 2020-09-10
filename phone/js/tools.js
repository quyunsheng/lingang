var tk = 'TOKEN';
//添加cookie 
function addCookie(objName, objValue, objHours) {
	var str = objName + "=" + escape(objValue);
	//为0时不设定过期时间，浏览器关闭时cookie自动消失 
	if (objHours > 0) {
		var date = new Date();
		// 毫秒
		var ms = objHours * 3600 * 1000;
		date.setTime(date.getTime() + ms);
		str += "; expires=" + date.toGMTString();
	}
	document.cookie = str;
}

//获取指定名称的cookie的值 
function getCookie(objName) {
	var arrStr = document.cookie.split("; ");
	for (var i = 0; i < arrStr.length; i++) {
		var temp = arrStr[i].split("=");
		if (temp[0] == objName) return unescape(temp[1]);
	}
}

//读取出来所有的cookie字筗串了 
function allCookie() { //读取所有保存的cookie字符串 
	var str = document.cookie;
	if (str == "") {
		str = "没有保存任何cookie";
		return "fail";
	}
	return str;
}

//为了删除指定名称的cookie，可以将其过期时间设定为一个过去的时间 
function delCookie(name) {
	var date = new Date();
	date.setTime(date.getTime() - 10000);
	document.cookie = name + "=a; expires=" + date.toGMTString();
}

//添加cookie 
function addPathCookie(name, value, expires, path, domain) {
	var str = name + "=" + escape(value);
	if (expires != "") {
		var date = new Date();
		var ms = objHours * 3600 * 1000;
		date.setTime(date.getTime() + ms);
		str += ";expires=" + date.toGMTString();
	}
	if (path != "") {
		str += ";path=" + path; //指定可访问cookie的目录 
	}
	if (domain != "") {
		str += ";domain=" + domain; //指定可访问cookie的域 
	}
	document.cookie = str;
}


function myProcessOk(vhtml){
	jQuery("#vkDivMaskPrc").css("display","block");
	document.getElementById("vkDivMaskContPrcLogo").className="vkDivMaskContPrcOk";
	document.getElementById("vkDivMaskContPrcText").innerHTML=vhtml;
	//var prcok=setTimeout('jQuery("#vkDivMaskPrc").css("display","none");',2000);
	var prcok=setTimeout(function(){
		jQuery("#vkDivMaskPrc").css("display","none");		
	},2000);
}
function myProcessErr(vhtml){
	jQuery("#vkDivMaskPrc").css("display","block");
	document.getElementById("vkDivMaskContPrcLogo").className="vkDivMaskContPrcErr";
	document.getElementById("vkDivMaskContPrcText").innerHTML=vhtml;
	var prcerr=setTimeout(function(){
		jQuery("#vkDivMaskPrc").css("display","none");
	},2500);
}