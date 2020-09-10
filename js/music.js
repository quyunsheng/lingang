var ap3 = new APlayer({
	element: document.getElementById('audioPly'),//样式1
	narrow: false,
	autoplay: false,
	showlrc: true,
	music: {
		title: '你的答案',
		author: '阿冗',
		url: 'video/yourAnswer.mp3',
		pic: 'img/index/music.gif'
	}
});
ap3.init();
$('.aplayer-pause').click(function(){
	$('.aplayer-box').removeClass('aplayer-show').addClass('aplayer-hide');
	$('.aplayer-name').show(1000);
});
$('.aplayer-play').click(function(){
	$('.aplayer-box').removeClass('aplayer-hide').addClass('aplayer-show');
	$('.aplayer-name').hide(1000);
});