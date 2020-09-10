//默认登陆
var lp=getCookie("lp");
var ls=getCookie("ls");
var tkn = getCookie(tk);
var rf="";
if(window.location.href.indexOf("ref")>0){
	rf=window.location.href.split("|")[1];
}

if(lp != "" && ls != "" && tkn != "" && lp != undefined && lp != 'undefined' && lp != null && lp != 'null'){
	var json = JSON.stringify({
		password: ls,
		phone: lp
	})
	$.ajax({
		url: path + '/linU/login',
		type:'POST',  //提交方法是POST
		data:json, //以JSON字符串形式把 user 传到后台
		contentType: 'application/json;charset=utf-8',
		dataType:'json', //后台返回的数据类型是json文本
		error:function(){  //请求失败的回调方法
			// $(".login-tip").css("color","red");
			delCookie(tk);
			delCookie("lp");
			delCookie("ls");
			window.location.href=window.location.href;
		},
		success:function(result){	//请求成功的回调方法
			if(result != "" && result.code == 1){
				addCookie(tk, result.token, 72);
				addCookie("lp", lp, 24*30);
				addCookie("ls", ls, 24*30);
					//跳转到个人信息"/user-person.html"
					if(!isEmpty(rf)){
						window.location.href=rf;
					}else{
						window.location.href='./phone.html';	
					}
			}else{
				myProcessErr(result.msg);
			}
		}
	});
}
$(".lgBtn").click(function(){
	var user = new Object();
	 // $.trim删除字符串开始末尾的空格
	logPhone = $.trim($(".lgPhone").val());
	logPass = $.trim($(".lgPass").val());
	var mylog = /^[1][3,4,5,6,7,8,9][0-9]{9}$/;
	var mypass = /^[a-zA-Z0-9_-]{6,16}$/;
	//前台的非空验证
	if(logPhone == "" || logPhone == null){
		$(".logPhone").focus;
		myProcessErr("对不起，登录账号不能为空。");
	}else if(!mylog.test(logPhone)){
		myProcessErr("对不起，请填写正确的手机号。");
	}else if(logPass == "" ||logPass == null){
		$(".logPass").focus;
		myProcessErr("对不起，登录密码不能为空。");
	}else if(!mypass.test(logPass)){
		myProcessErr("请输入6~16位密码");
	}else{
		//如果账号和密码都不为空，就进行 ajax 异步提交
		var json = JSON.stringify({
			// username: "",
			password: logPass,
			// code: "",		//验证码
			phone: logPhone,
			openid:$("#openid").val(),
			access_token:$("#access_token").val(),
			bindType:'qq'
		})
		// console.log(json)
		$.ajax({
			url: path + '/linU/login',
			type:'POST',  //提交方法是POST
			data:json, //以JSON字符串形式把 user 传到后台
			contentType: 'application/json;charset=utf-8',
			dataType:'json', //后台返回的数据类型是json文本
			error:function(){  //请求失败的回调方法
				// $(".login-tip").css("color","red");
				$(".login-tip").html("登录失败！请重试。");
			},
			success:function(result){	//请求成功的回调方法
				if(result != "" && result.code == 1){
					if($('#logLogin').is(':checked')) {
						addCookie(tk, result.token, 24*30);
						addCookie(logPhone, logPhone, 24*30);
						addCookie(logPass, logPass, 24*30);
						addCookie("lp", logPhone, 24*30);
						addCookie("ls", logPass, 24*30);
					}else{
						delCookie(tk);
						delCookie("lp");
						delCookie("ls");
						addCookie(tk, result.token, 72);
					}
					if(!isEmpty(rf)){
						window.location.href=rf;
					}else{
						window.location.href='./phone.html';	
					}
				}else{
					myProcessErr(result.msg);
				}
			}
		});
	}
});
// 找回密码
$(".newBtn").click(function(){
	var user = new Object();
	 // $.trim删除字符串开始末尾的空格
	logPhone = $.trim($(".newPhone").val());
	newPass = $.trim($(".newPass").val());
	codeNum =  $.trim($(".newCode").val());
	var mylog = /^[1][3,4,5,6,7,8,9][0-9]{9}$/;
	var mypass = /^[a-zA-Z0-9_-]{6,16}$/;
	//前台的非空验证
	
	if(logPhone == "" || logPhone == null){
		myProcessErr("对不起，登录账号不能为空。");
	}else if(!mylog.test(logPhone)){
		myProcessErr("对不起，请填写正确的手机号。");
	}else if(codeNum == "" ||codeNum == null){
		myProcessErr("对不起，请填写验证码。");
	}else if(!mypass.test(newPass)){
		myProcessErr("请输入6~16位密码");
	}else if(newPass == "" || newPass == null){
		myProcessErr("对不起，请填写新密码。");
	}else{
		//如果账号和密码都不为空，就进行 ajax 异步提交
		var json = JSON.stringify({
			// username: "",
			password: newPass,
			code: codeNum,		//验证码
			phone: logPhone
		})
		// console.log(json)
		$.ajax({
			url: path + '/linU/findPassword',
			type:'POST',  //提交方法是POST
			data:json, //以JSON字符串形式把 user 传到后台
			contentType: 'application/json;charset=utf-8',
			dataType:'json', //后台返回的数据类型是json文本
			error:function(){  //请求失败的回调方法
				myProcessErr("设置失败！请重试。");
			},
			success:function(result){	//请求成功的回调方法
				// console.log(result)
				if(result != "" && result.code == 1){
						window.location.href='./login.html';	
				}else{
					$(".login-tip").show();
					$(".login-tip").html(result.msg);
				}
			}
		});
	}
});



// 获取验证码
function yzm(thiz){
	var myreg=/^[1][3,4,5,6,7,8,9][0-9]{9}$/;
	regPhone = $.trim($(thiz).parent().prev('.login-ipt').val());
	if(regPhone == "" || regPhone == "undefined" || regPhone == null || regPhone == "null" || !myreg.test(regPhone)){
		myProcessErr("请填写正确的手机号");
	}else{
		$.ajax({
			type:'POST',
			url:path + "/linU/sendCode",
			data:{
				phone: regPhone
			}, //以JSON字符串形式把 user 传到后台
			dataType:'json', //后台返回的数据类型是json文本
			error:function(){  //请求失败的回调方法
				// $(".login-tip").css("color","red");
				myProcessErr("验证码发送失败!");
			},
			success:function(result){
					if(result != "" && result.code == 1){
						var time = 60;
						var timer = setInterval(function(){
						    time--;
						   $(thiz).html(time+"秒重发");
							$(thiz).css({'background':'#ccc','pointer-events':'none'});
							if(time==0){
						        clearInterval(timer);
								$(thiz).html("获取验证码");
								$(thiz).css({'background':'#6aaff7','pointer-events':'auto'});
							}
						},1000);				//若登录成功，跳转到"/main.html"
					}else{
						myProcessErr(result.msg);
					}
			}
		})
	}
	
}
// 注册
$('.regBtn').click(function(){
	var myreg=/^[1][3,4,5,6,7,8,9][0-9]{9}$/;
	var mypass =/^[a-zA-Z0-9_-]{6,16}$/;
	var user = new Object();
	regPhone = $.trim($(".regPhone").val());
	regPass = $.trim($(".regPass").val());
	regPass2 = $.trim($(".regPass2").val());
	codeNum =  $.trim($(".regNote").val());
	postJl =  $.trim($(".postJl").val());
	//前台的非空验证
	if(regPhone == "" || regPhone == "undefined" || regPhone == null || regPhone == "null"){
		$(".regPhone").focus;
		myProcessErr("对不起，账号不能为空!");
	}else if(regPass != regPass2){
		myProcessErr("两次密码输入不一致!");
	}else if(codeNum == "" ||codeNum == null){
		myProcessErr("对不起，请填写验证码!");
	}else if(!myreg.test(regPhone)){
		myProcessErr("对不起，请填写正确的手机号!");
	}else if(regPass == "" ||regPass == null){
		$(".regPass").focus;
		myProcessErr("对不起，密码不能为空!");
	}else if(!mypass.test(regPass)){
		myProcessErr("对不起，密码格式错误!");
	}else if(!$("#helpNote").prop('checked')){
		myProcessErr("请勾选服务协议!");
	}else{
		var json = JSON.stringify({
			phone: regPhone,
			code: codeNum,		//验证码
			password: regPass,
			createUser:postJl
		});
		$.ajax({
			type:'POST',
			url:path + "/linU/register",
			data:json, //以JSON字符串形式把 user 传到后台
			contentType: 'application/json;charset=utf-8',
			dataType:'json', //后台返回的数据类型是json文本
			error:function(){  //请求失败的回调方法
				myProcessErr("注册失败请重试!");
			},
			success:function(result){
					if(result != "" && result.code == 1){
						myProcessOk(result.msg)
						window.location.href='./login.html';				//若登录成功，跳转到"/main.html"
					}else{
						myProcessErr(result.msg);
					}
			}
		})
	}
})

