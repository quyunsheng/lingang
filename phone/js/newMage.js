// 图片放大和关闭
function showPic(vhtml) {
	$('#vkDivMaskPrc').css('display', 'block');
	// document.getElementById('vkDivMaskContPrcLogo').className = "vkDivMaskContPrcOk";
	document.getElementById('vkDivMaskContPrcText').innerHTML = vhtml;
	document.getElementById('vkDivMaskContPrcText').style.width = '100%';
	$('#vkDivMaskContPrc').css('background-color', '#fff0');
	$('#vkDivMaskContPrc img').css('width', '100%', );
	$('#vkDivMaskContPrc img').css('padding', '0');
	document.getElementById('vkDivMaskPrc').onclick = function() {
		$('#vkDivMaskPrc').css('display', 'none');
	};
}
$('#mTalk').on('click', function() {
	let moreBoxClass = JSON.stringify($("#tags")[0].classList);
});
window.onload = function() {
	//聊天页
	getUser();
	// jobOffer();
	$('#mTalk').val('');
};
$(document).keypress(function(e) {
	if (e.shiftKey && e.which === 100) {
		talkListFun();
	}
});

// 翻到最下面
function gotoEnd() {
	$('html,body').animate({
		scrollTop: $('#last').offset().top
	}, 1);
}

let getInformation = setInterval(function() {
	var tkn = getCookie(tk);
	$.ajax({
		url: path + '/ajax/listMessageOnMemory',
		type: 'GET',
		dataType: 'json',
		data: {
			adminNo: $('.head-txt').attr('useId'),
		},
		beforeSend: function(XMLHttpRequest) {
			XMLHttpRequest.setRequestHeader("token", tkn);
		},
		success: function(data) {
			if (data.code === 200) {
				if (data.data.length !== 0) {
					gotoEnd();
					var talkLists = '';
					let arr = data.data;

					for (var tls = 0; tls < arr.length; tls++) {
						if (!arr[tls].adminpic || arr[tls].adminpic === null) {
							arr[tls].adminpic = photoPath + '2/2/0f552a82-a70e-4ad4-b9a9-1750c6302fec.jpg';
						}
						if (arr[tls].messageType !== 1) {
							talkLists += '<li style="margin-bottom: 10px;"><div style="display: flex;margin: 0  0 10px;">' +
								'<img src="' +photoPath + arr[tls].adminpic +
								'" alt="" class="userPic">' +
								'<div class="" ' +
								'style="background-color: #bbe2f3;padding: 5px;margin-left:10px;border-radius: 6px;word-wrap:break-word;word-break:break-all;">' +
								arr[tls].summary + '</div>' +
								'</div><p style="left: 35px;">' + CurentTime(new Date(arr[tls].createtime)) + '</p></li>';
						} else {
							let fileFormats = arr[tls].summary.substring(arr[tls].summary.lastIndexOf('.')).substring();
							if (!fileFormats.match(/.png|.jpg|.gif|.jpeg/)) {
								talkLists +=
									'<li style="overflow: hidden;"><div style="display: flex;margin: 0 0 10px;"><a href="javascript:;" style="display: flex;">' +
									'<img src="' +photoPath + arr[tls].adminpic +
									'" alt="" class="userPic">' +
									'<div style="width: 200px;box-sizing: border-box;margin-right: 10px;"><video controls="controls" controlsList="nofullscreen nodownload noremoteplayback"  style="width:100%;background-color:#fff;padding: 5px;box-sizing:border-box;border-radius: 6px;" ><source src="' +
									photoPath +
									arr[tls].summary +
									'" type="video/mp4"></source></video></div>' +
									'</a></div><p style="left: 35px;">' + CurentTime(new Date(arr[tls].createtime)) + '</p></li>';
							} else {
								talkLists += '<li style="overflow: hidden;"><div style="display: flex;margin: 0 0 10px;">' +
									'<img src="' +photoPath + arr[tls].adminpic +
									'" alt="" class="userPic">' +
									'<div style="text-align: right;width: 200px;box-sizing: border-box;margin-right: 10px;"><img class="newImg" style="width:100%;background-color:#fff;padding: 5px;box-sizing:border-box;border-radius: 6px;" src="' +
									mageImg + arr[tls].summary +
									'"' + 'onclick="showPic(this.outerHTML)"></div>' +
									'</div><p style="left: 35px;">' + CurentTime(new Date(arr[tls].createtime)) + '</p></li>';
							}
						}
						// }
					}
					$('.talk').append(talkLists);
					if(data.data[0].adminname != '' ){
						if($('.head-txt i').html() == '' || $('.head-txt i').html() != data.data[0].adminname ){
							$('.head-txt i').html(data.data[0].adminname)
						}
					}
				}
			} else if (data.code === 20001) {
				// layer.msg('需要再次登录哦！');
				setTimeout(function() {
					sessionStorage.setItem('password', 'password');
					window.location.href = 'login.html';
				}, 100);
			}
		}
	});
}, 5000);

// 发送消息
function typeFSClick() {
	if ($('#mTalk')[0].value.trim() !== '') {
		talkListFun($('#mTalk').val());
		// $('.center').scrollTop = $('.center').scrollHeight;
	} else {
		layer.msg('你什么都没有写哦!', function() {});
	}
	$('#mTalk').val('');
}
// 查看更多
function seeMoreFun() {
	var firstMage = $('.seeMore').text()
	if(firstMage == '查看更多消息'){
		$('#talk').html('')
	}
	$('.seeMore')[0].innerText = '...';
	$('.wd').hide();
	$('#tags').hide();
	moreTalks();
}
$('.closeMage').click(function() {
	clearInterval(getInformation)
	$('.pcW').hide()
})
let userPic = '';
let config = {};
let appPic = {
	user: {}
};
let adminNoTalk = '';
// 获取客服id
let consultNo = '';
var tkn = getCookie(tk);
// 获取头像
function getUser() {
	$.ajax({
		url: path + '/linA/getyh',
		type: 'GET',
		beforeSend: function(XMLHttpRequest) {
			XMLHttpRequest.setRequestHeader("token", tkn);
		},
		data: {},
		dataType: 'json', //后台返回的数据类型是json文本
		success: function(data) {
			if (data.code == 1) {
				appPic.user = data.user;
			}
		},
		error: function() {
			layer.msg('加载失败', function() {});
		}
	});
}
//直接读取浏览器url
function GetQueryString(name) {
	var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
	var r = window.location.search.substr(1).match(reg); //获取url中"?"符后的字符串并正则匹配
	var context = '';
	if (r != null)
		context = r[2];
	reg = null;
	r = null;
	return context == null || context == '' || context == 'undefined' ? '' : decodeURI(context);
}
/**
 * 初始化用户基本信息
 */
function initUser(user) {
	console.log(user)
	if (!user.cLogo || user.cLogo === 'default.jpg') {
		user.cLogo = photoPath + '2/2/0f552a82-a70e-4ad4-b9a9-1750c6302fec.jpg';
	}
	if (!user.adminpic || user.adminpic === 'default.jpg') {
		user.adminpic = photoPath + '2/2/0f552a82-a70e-4ad4-b9a9-1750c6302fec.jpg';
	}
	if (!user.realName) {
		user.realName = user.phone;
	}
}

// 提示框js
function showMessage(vhtml, className) {
	jQuery('#vkDivMaskPrc').css('display', 'block');
	document.getElementById('vkDivMaskContPrcLogo').className = className;
	document.getElementById('vkDivMaskContPrcText').innerHTML = vhtml;
	var prcerr = setTimeout(function() {
		jQuery('#vkDivMaskPrc').css('display', 'none');
	}, 2500);
}

function myProcessOk(vhtml) {
	showMessage(vhtml, 'vkDivMaskContPrcOk');
}

function myProcessErr(vhtml) {
	showMessage(vhtml, 'vkDivMaskContPrcErr');
}

function toLogin() {
	setTimeout(function() {
		sessionStorage.setItem('password', 'password');
		window.location.href = 'login.html';
	}, 100);
}

// 查看更多
let pageNo = 0;
let adminNo = '';

function moreTalks() {
	$('.seeMore')[0].innerText = '...';
	// let id = GetQueryString('id');
	$.ajax({
		xhrFields: {
			withCredentials: true
		},
		url: path + '/ajax/listMessageOnDataBase',
		type: 'GET',
		dataType: 'json',
		async: false,
		data: {
			// recruitInfoId: id,
			// recruitInfoId: consultNo,
			adminNo: $('.head-txt').attr('useId'),
			pageNo: pageNo,
			pageSize: 10
		},
		beforeSend: function(XMLHttpRequest) {
			XMLHttpRequest.setRequestHeader("token", tkn);
		},
		success: function(data) {
			console.log(data)
			if (data.code === 200) {
				$('.seeMore')[0].innerText = '查看更多';
				let talkLists = '';
				if (pageNo === 0) {
					pageNo++;
					if (data.data.length == 0) {
						moreTalks();
					}
					let arrs = data.data;
					for (let tls in arrs) {
						if (!arrs[tls].adminpic || arrs[tls].adminpic === null) {
							arrs[tls].adminpic = photoPath + '2/2/0f552a82-a70e-4ad4-b9a9-1750c6302fec.jpg';
						}
						if (tls == 0 && adminNo == '') {
							adminNo = arrs[tls].adminNo;
						}
						if (arrs[tls].state === 1) {
							if (arrs[tls].messageType != 1) {
								talkLists += '<li style="margin-bottom: 10px;"><div style="display: flex;">' +
									'<img src="' +photoPath + arrs[tls].adminpic +
									'" alt="" class="userPic">' +
									'<div class="" ' +
									'style="background-color: #bbe2f3;padding: 5px;margin-left:10px;border-radius: 6px;word-wrap:break-word;word-break:break-all;">' +
									arrs[tls].summary + '</div>' +
									'</div><p style="left: 35px;">' + CurentTime(new Date(arrs[tls].createtime)) + '</p></li>';
							} else {
								let fileFormats = arrs[tls].summary.substring(arrs[tls].summary.lastIndexOf('.')).substring();
								if (!fileFormats.match(/.png|.jpg|.gif|.jpeg/)) {
									talkLists +=
										'<li style="overflow: hidden;"><div style="display: flex;margin: 0 0 10px;"><a href="javascript:;" style="display: flex;">' +
										'<img src="' +photoPath + arrs[tls].adminpic +
										'" alt="" class="userPic">' +
										'<div style="width: 200px;box-sizing: border-box;margin-left: 10px;"><video controls="controls" controlsList="nofullscreen nodownload noremoteplayback"  style="width:100%;background-color: #fff;padding: 5px;box-sizing:border-box;border-radius: 6px;">' +
										'<source src="' + arrs[tls].summary + '" type="video/mp4"></source>' +
										'</video></div>' +
										'</a></div><p style="left: 35px;">' + CurentTime(new Date(arrs[tls].createtime)) + '</p></li>';
								} else {
									talkLists += '<li style="overflow: hidden;"><div style="display: flex;margin: 0 0 10px;">' +
										'<img src="' +photoPath + arrs[tls].adminpic +
										'" alt="" class="userPic">' +
										'<div style="max-width: 200px;box-sizing: border-box;margin-left: 10px;"><img class="newImg" style="width:100%;background-color: #fff;padding: 5px;box-sizing:border-box;border-radius: 6px;" src="' +
										mageImg + arrs[tls].summary +
										'"' + 'onclick="showPic(this.outerHTML)"></div>' +
										'</div><p style="left: 35px;">' + CurentTime(new Date(arrs[tls].createtime)) + '</p></li>';
								}
							}
						} else {
							if (arrs[tls].messageType != 1) {
								talkLists += '<li style="overflow: hidden;"><div class="fr" style="display: flex;margin: 0 0 10px;">' +
									'<div class=""' +
									'style="background-color:#bbe2f3;padding: 5px;margin-right:10px;border-radius: 6px;word-wrap:break-word;word-break:break-all;">' +
									arrs[tls].summary + '</div>' +
									'<img src="' +
									appPic.user.cLogo +
									'" alt="" class="userPic">' +
									'</div><p style="right: 35px;">' + CurentTime(new Date(arrs[tls].createtime)) + '</p></li>';
							} else {
								let fileFormat = arrs[tls].summary.substring(arrs[tls].summary.lastIndexOf('.')).toLowerCase();
								if (!fileFormat.match(/.png|.jpg|.gif|.jpeg/)) {
									talkLists +=
										'<li style="overflow: hidden;"><div style="display: flex;float: right;margin: 0 0 10px;"><a href="javascript:;" style="display: flex;">' +
										'<div style="width: 200px;box-sizing: border-box;margin-right: 10px;"><video controls="controls" controlsList="nofullscreen nodownload noremoteplayback"  style="width:100%;background-color: #fff;padding: 5px;box-sizing:border-box;border-radius: 6px;" ><source src="' +
										photoPath +
										arrs[tls].summary +
										'" type="video/mp4"></source></video></div>' +
										'<img src="' +
										appPic.user.cLogo +
										'" alt="" class="userPic">' +
										'</a></div><p style="right: 35px;">' + CurentTime(new Date(arrs[tls].createtime)) + '</p></li>';
								} else {
									talkLists +=
										'<li style="overflow: hidden;"><div style="display: flex;float: right;margin: 0 0 10px;word-wrap:break-word;word-break:break-all;">' +
										'<div style="max-width: 200px;box-sizing: border-box;margin-right: 10px;"><img class="newImg" style="width:100%;background-color: #fff;padding: 5px;box-sizing:border-box;border-radius: 6px;" src="' +
										mageImg + arrs[tls].summary +
										'"' + 'onclick="showPic(this.outerHTML)"></div>' +
										'<img src="' +
										appPic.user.cLogo +
										'" alt="" class="userPic">' +
										'</div><p style="right: 35px;">' + CurentTime(new Date(arrs[tls].createtime)) + '</p></li>';
								}
							}
						}
					}
					$('.talk')[0].innerHTML = talkLists + $('.talk')[0].innerHTML;
				} else {
					pageNo++;
					if (pageNo > data.data.totalPages) {
						$('.seeMore')[0].innerText = '没有更多了!';
						$('.seeMore').attr('disabled', 'disabled');
					}
					let arr = data.data.data;
					for (let tls in arr) {
						if (!arr[tls].adminpic || arr[tls].adminpic === null) {
							arr[tls].adminpic = photoPath + '2/2/0f552a82-a70e-4ad4-b9a9-1750c6302fec.jpg';
						}
						if (arr[tls].state === 1) {
							if (arr[tls].messageType != 1) {
								talkLists += '<li style="margin-bottom: 10px;"><div style="display: flex;">' +
									'<img src="' + photoPath +arr[tls].adminpic +
									'" alt="" class="userPic">' +
									'<div class="" ' +
									'style="background-color: #bbe2f3;padding: 5px;margin-left:10px;border-radius: 6px;word-wrap:break-word;word-break:break-all;">' +
									arr[tls].summary + '</div>' +
									'</div><p style="left: 35px;">' + CurentTime(new Date(arr[tls].createtime)) + '</p></li>';
							} else {
								let fileFormats = arr[tls].summary.substring(arr[tls].summary.lastIndexOf('.')).substring();
								if (!fileFormats.match(/.png|.jpg|.gif|.jpeg/)) {
									talkLists +=
										'<li style="overflow: hidden;"><div style="display: flex;margin: 0 0 10px;"><a href="javascript:;" style="display: flex;">' +
										'<img src="' +photoPath + arr[tls].adminpic +
										'" alt="" class="userPic">' +
										'<div style="width: 200px;box-sizing: border-box;margin-left: 10px;"><video controls="controls" controlsList="nofullscreen nodownload noremoteplayback"  style="width:100%;background-color: #fff;padding: 5px;box-sizing:border-box;border-radius: 6px;" ><source src="' +
										photoPath +
										arr[tls].summary +
										'" type="video/mp4"></source></video></div>' +
										'</a></div><p style="left: 35px;">' + CurentTime(new Date(arr[tls].createtime)) + '</p></li>';
								} else {
									talkLists += '<li style="overflow: hidden;"><div style="display: flex;margin: 0 0 10px;">' +
										'<img src="' + photoPath +arr[tls].adminpic +
										'" alt="" class="userPic">' +
										'<div style="text-align: right;max-width: 200px;box-sizing: border-box;margin-left: 10px;"><img class="newImg" style="width:100%;background-color: #fff;padding: 5px;box-sizing:border-box;border-radius: 6px;" src="' +
										mageImg + arr[tls].summary +
										'"' + 'onclick="showPic(this.outerHTML)"></div>' +
										'</div><p style="left: 35px;">' + CurentTime(new Date(arr[tls].createtime)) + '</p></li>';
								}
							}
						} else {
							if (arr[tls].messageType != 1) {
								talkLists += '<li style="overflow: hidden;"><div style="display: flex;float: right;margin: 0 0 10px;">' +
									'<div class=""' +
									'style="background-color: #bbe2f3;padding: 5px;margin-right:10px;border-radius: 6px;word-wrap:break-word;word-break:break-all;">' +
									arr[tls].summary + '</div>' +
									'<img src="' +
									appPic.user.cLogo +
									'" alt="" class="userPic">' +
									'</div><p style="right: 35px;">' + CurentTime(new Date(arr[tls].createtime)) + '</p></li>';
							} else {
								let fileFormat = arr[tls].summary.substring(arr[tls].summary.lastIndexOf('.')).toLowerCase();
								if (!fileFormat.match(/.png|.jpg|.gif|.jpeg/)) {
									talkLists +=
										'<li style="overflow: hidden;"><div  style="display: flex;float: right;margin: 0 0 10px;"><a href="javascript:;" style="display: flex;float: right;">' +
										'<div style="text-align: right;width: 200px;box-sizing: border-box;margin-right: 10px;"><video controls="controls" controlsList="nofullscreen nodownload noremoteplayback"  style="width:100%;background-color: #fff;padding: 5px;box-sizing:border-box;border-radius: 6px;" ><source src="' +
										photoPath +
										arr[tls].summary +
										'" type="video/mp4"></source></video></div>' +
										'<img src="' +
										appPic.user.cLogo +
										'" alt="" class="userPic">' +
										'</a></div><p style="right: 35px;">' + CurentTime(new Date(arr[tls].createtime)) + '</p></li>';
								} else {
									talkLists +=
										'<li style="overflow: hidden;"><div style="display: flex;float: right;margin: 0 0 10px;word-wrap:break-word;word-break:break-all;">' +
										'<div style="text-align: right;max-width: 200px;box-sizing: border-box;margin-right: 10px;"><img class="newImg" style="width:100%;background-color: #fff;padding: 5px;box-sizing:border-box;border-radius: 6px;" src="' +
										mageImg + arr[tls].summary +
										'"' + 'onclick="showPic(this.outerHTML)"></div>' +
										'<img src="' +
										appPic.user.cLogo +
										'" alt="" class="userPic">' +
										'</div><p style="right: 35px;">' + CurentTime(new Date(arr[tls].createtime)) + '</p></li>';
								}
							}
						}
					}
					$('.talk')[0].innerHTML = talkLists + $('.talk')[0].innerHTML;
				}
			} else if (data.code === 20001) {
				setTimeout(function() {
					sessionStorage.setItem('password', 'password');
					// window.location.href = 'login.html';
				}, 100);
			} else {
				layer.msg('加载失败', function() {});
			}
		},
		error: function() {
			layer.msg('加载失败', function() {});
		}
	});
}
//聊天页未读
function talkPage(id) {
	$.ajax({
		// async: false,
		xhrFields: {
			withCredentials: true
		},
		url: path + '/ajax/listMessageOnMemory',
		type: 'GET',
		data: {},
		beforeSend: function(XMLHttpRequest) {
			XMLHttpRequest.setRequestHeader("token", tkn);
		},
		dataType: 'json',
		success: function(data) {
			if (data.code === 200) {
				console.log(data, '聊天页未读');
				if (data.data.realName === null) {} else {
					let talkLists = '';
					if (data.data.length == 0) {
						moreTalks();
						$('html, body').animate({
							scrollTop: $('#talk').height()
						}, 'fast');
					}
					let arrs = data.data;
					for (let tl = 0; tl < arrs.length; tl++) {
						if (!arrs[tl].adminpic) {
							arrs[tl].adminpic = photoPath + '2/2/0f552a82-a70e-4ad4-b9a9-1750c6302fec.jpg';
						}
						if (tl == 0) {
							adminNo = data.data[tl].adminNo;
						}
						if (arrs[tl].messageType != 1) {
							talkLists += '<li style="overflow: hidden;"><div style="display: flex;margin: 0  0 10px;float: left;">' +
								'<img src="' + photoPath +
								arrs[tl].adminpic +
								'" alt="" class="userPic">' +
								'<div class="" ' +
								'style="background-color: #bbe2f3;margin-left: 10px;padding: 5px;border-radius: 6px;word-wrap:break-word;word-break:break-all;">' +
								arrs[tl].summary + '</div>' +
								'</div><p style="left: 35px;">' + CurentTime(new Date(arrs[tls].createtime)) + '</p></li>';
						} else {
							let fileFormats = arrs[tl].summary.substring(arrs[tl].summary.lastIndexOf('.')).substring();
							if (!fileFormats.match(/.png|.jpg|.gif|.jpeg/)) {
								talkLists +=
									'<li style="overflow: hidden;"><div style="display: flex;margin: 0 0 10px;"><a href="javascript:;" style="display: flex;float: right;">' +
									'<img src="' + photoPath + arrs[tl].userPic +
									'" alt="" class="userPic">' +
									'<div style="width: 200px;box-sizing: border-box;margin-left: 10px;"><video controls="controls" controlsList="nofullscreen nodownload noremoteplayback"  style="width:100%;background-color: #fff;padding: 5px;box-sizing:border-box;border-radius: 6px;" ><source src="' +
									photoPath +
									arrs[tl].summary +
									'" type="video/mp4"></source></video></div>' +
									'</a></div><p style="left: 35px;">' + CurentTime(new Date(arrs[tls].createtime)) + '</p></li>';
							} else {
								talkLists += '<li style="overflow: hidden;"><div style="display: flex;margin: 0 0 10px;"><a href="' +
									photoPath +
									arrs[tl].summary + '" style="display: flex;float: right;">' +
									'<img src="' + photoPath + arrs[tl].userPic +
									'" alt="" class="userPic">' +
									'<div style="max-width: 200px;box-sizing: border-box;margin-left: 10px;"><img class="newImg" style="width:100%;background-color: #fff;padding: 5px;box-sizing:border-box;border-radius: 6px;" src="' +
									mageImg + arrs[tl].summary +
									'"' + 'onclick="showPic(this.outerHTML)"></div>' +
									'</a></div><p style="left: 35px;">' + CurentTime(new Date(arrs[tls].createtime)) + '</p></li>';
							}
						}
						$('.wd').append(talkLists);
					}
				}
			}
		},
		error: function() {
			layer.msg('加载失败', function() {});
		}
	});
}

// 聊天发送
function talkListFun(news) {
	if ($('#mTalk')[0].value !== '') {
		let query = window.location.search.substring(1).split('=');
		let talkId = query[1];
		$.ajax({
			url: path + '/ajax/sendMessage',
			type: 'POST',
			data: {
				messageContent: $('#mTalk')[0].value,
				// recruitInfoId: talkId,
				recruitInfoId: consultNo,
				adminNo: $('.head-txt').attr('useId'),
				adminName:$('.head-txt i').html(),
				messageType: 0
			},
			dataType: 'json',
			beforeSend: function(XMLHttpRequest) {
				XMLHttpRequest.setRequestHeader("token", tkn);
			},
			success: function(data) {
				if (data.code === 200) {
					let talkList = '';
					talkList += '<li class="clearfix" style="margin-bottom: 10px;"><div style="display: flex;float: right;">' +
						'<div class="" ' +
						'style="background-color:#bbe2f3;padding: 5px;margin-right:10px;border-radius: 6px;word-wrap:break-word;word-break:break-all;">' +
						news + '</div>' +
						'<img src="' + appPic.user.cLogo + '" alt="" class="userPic">' +
						'</div><p style="right: 35px;">' + CurentTime(new Date()) + '</p></li>';
					$('.talk').append(talkList);
					// $(".talk :last-child").insertBefore($("#last"));
					gotoEnd();
				} else {
					layer.msg('发送失败1！', function() {});
				}
			},
			error: function() {
				layer.msg('发送失败2', function() {});
			}
		});
	}
}

// 聊天发送文件
function talkListFuns(msg) {
	let query = window.location.search.substring(1).split('=');
	let talkId = query[1];
	$.ajax({
		url: path + '/ajax/sendMessage',
		type: 'POST',
		data: {
			messageContent: msg,
			// recruitInfoId: talkId,
			recruitInfoId: consultNo,
			adminNo: $('.head-txt').attr('useId'),
			adminName:$('.head-txt i').html(),
			messageType: 1
		},
		dataType: 'json',
		beforeSend: function(XMLHttpRequest) {
			XMLHttpRequest.setRequestHeader("token", tkn);
		},
		success: function(data) {
			if (data.code === 200) {
				var imgs = '';
				var fileFormat = msg.substring(msg.lastIndexOf('.')).toLowerCase();
				if (!fileFormat.match(/.png|.jpg|.gif|.jpeg/)) {
					imgs +=
						'<li style="overflow: hidden;margin-bottom: 10px;"><div style="margin: 0 0 10px;float: right;display: flex;"><a href="javascript:;" style="display: flex;">' +
						'<div style="text-align:right;display:inline-block;width: 200px;box-sizing: border-box;margin-right: 10px;"><video controls="controls" controlsList="nofullscreen nodownload noremoteplayback" style="width:100%;background-color: #fff;padding: 5px;box-sizing:border-box;border-radius: 6px;"><source src="' +
						mageImg +
						msg +
						'" type="video/mp4"></source></video></div>' +
						'<img src="' + appPic.user.cLogo + '" alt="" class="userPic">' +
						'</a></div><p style="right: 35px;">' + CurentTime(new Date()) + '</p></li>';
					$('.talk').append(imgs);
				} else {
					imgs +=
						'<li style="overflow: hidden;margin-bottom: 10px;"><div style="margin: 0 0 10px;float: right;display: flex;">' +
						'<div style="text-align:right;display:inline-block;max-width: 200px;box-sizing: border-box;margin-right: 10px;"><img class="newImg" style="width:100%;background-color:#fff;padding: 5px;box-sizing:border-box;border-radius: 6px;" src="' +
						mageImg + msg +
						'"' + 'onclick="showPic(this.innerHTML)"></div>' +
						'<img src="' + appPic.user.cLogo + '" alt="" class="userPic">' +
						'</div><p style="right: 35px;">' + CurentTime(new Date()) + '</p></li>';
					$('.talk').append(imgs);
				}
				$('html,body').animate({
					scrollTop: $('#last').offset().top
				}, 1);
			} else {
				layer.msg('发送失败！', function() {});
			}
		},
		error: function() {
			layer.msg('发送失败', function() {});
		}
	});
}
function CurentTime(now) {
	// var now = new Date();

	var year = now.getFullYear(); //年
	var month = now.getMonth() + 1; //月
	var day = now.getDate(); //日

	var hh = now.getHours(); //时
	var mm = now.getMinutes(); //分
	var ss = now.getSeconds(); //秒

	var clock = year + "-";

	if (month < 10)
		clock += "0";

	clock += month + "-";

	if (day < 10)
		clock += "0";

	clock += day + " ";

	if (hh < 10)
		clock += "0";

	clock += hh + ":";
	if (mm < 10) clock += '0';
	clock += mm + ":";

	if (ss < 10) clock += '0';
	clock += ss;
	return (clock);
}
