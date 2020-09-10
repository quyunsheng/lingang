var path = 'https://www.lingangsteel.com';
// var path = 'http://192.168.3.14:5555';
// 用户头像/商品分类/钢厂logo图片路径
var mageImg = 'https://www.lingangsteel.com/lingang/';
var photoPath = 'https://www.lingangsteel.com/lingang/upload/images/';
// 营业执照图片
var zzhPath = 'https://www.lingangsteel.com/lingang/upload/images/';
 function isEmpty(obj) {
  if (obj == '' || obj == 'null' || obj == 'undefined' || obj == undefined)
   return true;
  else
   return false;
 };
 // 购物车数量
 $(function(){
 	var tkn = getCookie(tk);
 	$.ajax({
 		url: path + '/linA/listgwc',
 		type:'GET',
 		data:{},
 		beforeSend: function (XMLHttpRequest) {
 			XMLHttpRequest.setRequestHeader("token", tkn);
 		},
 		dataType:'json', //后台返回的数据类型是json文本
 		success:function(result) {
 			if(result != "" && result.code == 1){
 				var shopCart = result.data;  //购物车商品
 				$('.fix-num').html(shopCart.length);
 			}
 		}
 	})
	
 });
 // 点击验证是否登录
  function uOnLine(url){
 	var tkn = getCookie(tk);
 	if(isEmpty(tkn)){
 		window.location.href = 'login.html';
 		return;
 	}
 	window.location.href = url;
  };
  $(function(){
 	 var tkn = getCookie(tk);
 	 if(!isEmpty(tkn)){
 	 	$.ajax({
 	 		url: path + '/linA/getyh',
 	 		type:'GET',
 	 		beforeSend: function (XMLHttpRequest) {
 	 			XMLHttpRequest.setRequestHeader("token", tkn);
 	 		},
 	 		data:{},
 	 		dataType:'json', //后台返回的数据类型是json文本
 	 		success:function(result) {
 	 			if(result != "" && result.code == 1){
 	 				$('.noLogin').addClass('hidden');
 	 				$('.rLogin').removeClass('hidden');
 	 				var btnType = result.user;
 	 				$('.rLogin span').html(btnType.cUsername);
 	 			}
 	 		}
 	 	})
 	 }
  })
 // 退出
  function logout() {
 	 delCookie(tk);
	 delCookie("lp");
	 delCookie("ls");
 	 // console.log(getCookie(tk))
 	 window.location.href = 'login.html';
  }
	setInterval(function(){
		var tkn = getCookie(tk);
		if (!isEmpty(tkn)) {
			$.ajax({
				url: path + '/ajax/countUnReadMessage',
				type: 'GET',
				beforeSend: function(XMLHttpRequest) {
					XMLHttpRequest.setRequestHeader("token", tkn);
				},
				data: {},
				dataType: 'json', //后台返回的数据类型是json文本
				success: function(result) {
					if (result != "" && result.code == 200) {
						console.log(result.data)
						if(result.data == 0){
							$('.cart-num2').hide()
						}else{
							$('.cart-num2').show()
						}
					}
				}
			})
		}
	}, 5000)