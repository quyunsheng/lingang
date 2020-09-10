// var path = 'http://192.168.3.14:5555';
var path = 'https://www.lingangsteel.com';
// 用户头像/商品分类/钢厂logo图片路径
var mageImg = 'https://www.lingangsteel.com/lingang/';
var photoPath = 'https://www.lingangsteel.com/lingang/upload/images/';
// 营业执照图片
var zzhPath = 'http://localhost:8081/upload/license';
$(function(){

	var $obj=$('.rightBox');
	$obj.find('li').on('mouseenter',function(){
		$(this).find('.right-mage').show();
		$(this).find('.right-mage').stop(true).animate({right:'49px',opacity:'1'});
		$(this).find('.cart-num').stop(true).animate('left','-90px');
	});
	$obj.find('li').on('mouseleave',function(){
		$(this).find('.right-mage').hide();
		$(this).find('.right-mage').stop(true).animate({right:'0',opacity:'0'});
		$(this).find('.cart-num').stop(true).animate('left','-8px');
	});
});
$(function(){
	var height=$(window).height();
	//scroll() 方法为滚动事件
	$(window).scroll(function(){
		if ($(window).scrollTop()>height){
			$('.right-top').removeClass('hidden');
		}else{
			$('.right-top').addClass('hidden');
		}
	});
	$('.right-top').click(function(){
		$('html,body').animate({scrollTop:0},400);
	})
});
// 点击发送验证码
function sendText(tableText){
	$(tableText).click(function () {
	    var time = 60;
	    var timer = setInterval(function(){
	        time--;
	       $(tableText).html(time+"秒重发");
			$(tableText).css({'background':'#ccc','pointer-events':'none'});
			if(time==0){
	            clearInterval(timer);
				$(tableText).html("获取验证码");
				$(tableText).css({'background':'#6aaff7','pointer-events':'auto'});
			}
	    },1000);
	});
};
// 在线客服
// $('.head-contact img').click(function(){
// 	$('.dialog-box').hide();
// });
// $('.right-man').click(function(){
// 	$('.dialog-box').show();
// });

