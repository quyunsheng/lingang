document.write("<script type='text/javascript' src='js/ajaxfileupload.js'></script>");
//按钮事件
var form_open_flat = 0;

// function send_voice_btn() {
// 	$('#send_voice_btn').hide();
// 	$('#send_voice_btn_2').hide();
// 	$('#send_text_btn').show();
// 	$('#send_text_btn_2').show();
// }

function send_text_btn() {
    form_open_flat = 0;
    // $('#send_voice_btn').show();
    // $('#send_voice_btn_2').show();
    $('#send_text_btn').hide();
    $('#send_text_btn_2').hide();
}

function send_text_check(t) {
    // var c = $(t).val();
    // if (c) {
    //   $('#send_submit_btn').show();
    //   $('#send_form_btn').hide();
    // } else {
    //   $('#send_submit_btn').hide();
    //   $('#send_form_btn').show();
    // }
}

function send_form() {
    if (form_open_flat == 0) {
        // $('#send_voice').show();
        $('#send_text').hide();
        $('#send_form').show();
        form_open_flat = 1;
    } else {
        // $('#send_voice').show();
        $('#send_text').hide();
        $('#send_form').hide();
        form_open_flat = 0;
    }
}

function cancel_text() {
    $('#send_voice').show();
    $('#send_text').hide();
    $('#send_form').hide();
    form_open_flat = 0;
}

function send_text() {
    $('#send_voice').hide();
    $('#send_text').show();
    $('#send_form').hide();
}

//图片上传事件
$('.upload_img').bind('click', function (ev) {
    //console.log(ev.currentTarget.dataset.id)
    var index = ev.currentTarget.dataset.id;
    if (index == 1) {
        $('#file1').click();
        $('#file1').unbind().change(function (e) {
            var index = e.currentTarget.dataset.id;
            if ($('#file').val() == '') {
                return false;
            }
            var filePath = $(this).val();
            changeImg(e, filePath, index);
        })
    }
});


var loading2 = null;

//图片上传
function changeImg(e, filePath, index) {
    fileFormat = filePath.substring(filePath.lastIndexOf('.')).toLowerCase();
    //检查后缀名
    if (!fileFormat.match(/.png|.jpg|.jpeg/)) {
        layer.open({
            content: '文件格式必须为：png/jpg/jpeg',
            skin: 'msg',
            time: 2
        });
        return;
    }
    //获取并记录图片的base64编码
    var reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onloadend = function () {
        // 图片的 base64 格式, 可以直接当成 img 的 src 属性值
        var dataURL = reader.result;
        // console.log(dataURL)
        //ajax上传图片

        //图片压缩
        compress(dataURL, 1600, 0.5).then(function (val) {

            dataURL = val;

            var data = {
                'dataURL': dataURL
            }

            $('.mui-loading').show();

            var access_token = getCookie('access_token');

            var to_mid = getQueryVariable('to_mid');

            $.ajax({
                type: 'POST',
                url: host + '/api/message/sendimg?access_token=' + access_token + '&access_token_type=' + access_token_type +
                    '&to_mid=' + to_mid,
                data: data,
                dataType: 'json',
                success: function (res) {
                    mui.toast(res.msg, {
                        duration: '2000',
                        type: 'div'
                    });
                    load();
                    $('.mui-loading').hide();
                }
            });
        });

    };

}

//图片压缩
function compress(base64String, w, quality) {
    var getMimeType = function (urlData) {
        var arr = urlData.split(',');
        var mime = arr[0].match(/:(.*?);/)[1];
        // return mime.replace("image/", "");
        return mime;
    };
    var newImage = new Image();
    var imgWidth, imgHeight;

    var promise = new Promise(resolve => newImage.onload = resolve);
    newImage.src = base64String;
    return promise.then(() => {
        imgWidth = newImage.width;
        imgHeight = newImage.height;
        var canvas = document.createElement('canvas');
        var ctx = canvas.getContext('2d');
        if (Math.max(imgWidth, imgHeight) > w) {
            if (imgWidth > imgHeight) {
                canvas.width = w;
                canvas.height = w * imgHeight / imgWidth;
            } else {
                canvas.height = w;
                canvas.width = w * imgWidth / imgHeight;
            }
        } else {
            canvas.width = imgWidth;
            canvas.height = imgHeight;
        }
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(newImage, 0, 0, canvas.width, canvas.height);
        var base64 = canvas.toDataURL(getMimeType(base64String), quality);

        return base64;
    });
}

let http_ajax = 'http://101.201.220.183:8081/AMQ/';
let userId = '';
let adminNo = '';

//聊天页
function talkPage() {
    var tkn = getCookie(tk);
    if (!tkn == '') {
        $.ajax({
            xhrFields: {
                withCredentials: true
            },
            // url:  'http://192.168.3.14:8081/listMessageOnMemory',
            url: http_ajax + 'listMessageOnMemory',
            type: 'GET',
            dataType: 'json',
            beforeSend: function (XMLHttpRequest) {
                XMLHttpRequest.setRequestHeader('token', tkn);
            },
            success: function (data) {
               console.log(data, '获取全部消息');
                if (data.code === 200) {
                    console.log(data, '聊天页未读');
                    var talkLists = '';
                    for (var tl = 0; tl < data.data.length; tl++) {
                        var arrs = data.data;
                        if (tl == 0) {
                            adminNo = data.data[tl].adminNo;
                        }
                        if (arrs[tl].state === 1) {
                            if (arrs[tl].messageType !== 1) {
                                talkLists += '<li class="clearfix notice-left" style="display: flex;float: left;">' +
                                    '<span class="notic-head"><img src="img/head.jpg"></span>' +
                                    '<div class="" ' +
                                    'style="background-color: #fff;margin-right: 10px;padding: 5px;border-radius: 6px;">' +
                                    data.data[tl].summary + '</div>' +
                                    '</li><br><br>';
                            } else {
                                var fileFormats = arrs[tl].summary.substring(arrs[tl].summary.lastIndexOf('.')).substring();
                                if (!fileFormats.match(/.png|.jpg|.gif|.jpeg/)) {
                                    talkLists += '<li class="clearfix notice-right" style="display: flex;float: right;margin: 10px 0;"><a href="' + imgSrc +
                                        arrs[tl].summary + '" style="display: flex;float: right;">' +
                                        '<video class="" style="width:86%;height:100%;background-color: #fff;padding: 5px;margin-right:10px;border-radius: 6px;" src="' + imgSrc +
                                        arrs[tl].summary +
                                        '"></video>' +
                                        '<span class="notic-head"><img src="img/head.jpg"></span>' +
                                        '</a></li><br><br>';
                                } else {
                                    talkLists += '<li class="clearfix notice-right" style="display: flex;float: right;margin: 10px 0;"><a href="' + imgSrc +
                                        arrs[tl].summary + '" style="display: flex;float: right;">' +
                                        '<img class="" style="width:86%;height:100%;background-color: #fff;padding: 5px;margin-right:10px;border-radius: 6px;" src="' + imgSrc +
                                        arrs[tl].summary +
                                        '">' +
                                        '<span class="notic-head"><img src="img/head.jpg"></span>' +
                                        '</a></li><br><br>';
                                }
                            }
                        } else {
                            if (arrs[tl].messageType !== 1) {
                                talkLists += '<li class="notice-right"><div style="display: flex;float: right;margin: 10px 0;">' +
                                    '<div class="" ' +
                                    'style="background-color: #fff;padding: 5px;margin-left:10px;border-radius: 6px;">' +
                                    arrs[tl].summary + '</div>' +
                                    '<span class="notic-head"><img src="img/head.jpg"></span>' +
                                    '</div></li><br><br>';
                            } else {
                                var fileFormat = arrs[tl].summary.substring(arrs[tl].summary.lastIndexOf('.')).toLowerCase();
                                if (!fileFormat.match(/.png|.jpg|.gif|.jpeg/)) {
                                    talkLists += '<li class="clearfix notice-right" style="display: flex;float: right;margin: 10px 0;"><a href="' + imgSrc +
                                        arrs[tl].summary + '" style="display: flex;float: right;">' +
                                        '<video class="" style="width:86%;height:100%;background-color: #fff;padding: 5px;margin-right:10px;border-radius: 6px;" src="' + imgSrc +
                                        arrs[tl].summary +
                                        '"></video>' +
                                        '<span class="notic-head"><img src="img/head.jpg"></span>' +
                                        '</a></li><br><br>';
                                } else {
                                    talkLists += '<li class="clearfix notice-right" style="display: flex;float: right;margin: 10px 0;"><a href="' + imgSrc +
                                        arrs[tl].summary + '" style="display: flex;float: right;">' +
                                        '<img class="" style="width:86%;height:100%;background-color: #fff;padding: 5px;margin-right:10px;border-radius: 6px;" src="' + imgSrc +
                                        arrs[tl].summary +
                                        '">' +
                                        '<span class="notic-head"><img src="img/head.jpg"></span>' +
                                        '</a></li><br><br>';
                                }
                            }
                        }
                        $('.talk').html($('.talk').html() + talkLists);
                    }
                } else if (data.code === 20001) {
                }
            }
        });
    }
}

// 聊天发送
function talkListFun() {
    var tkn = getCookie(tk);
	console.log("======1======");
    if (!tkn == '') {
		console.log("======2======");
        if ($('#content').val() !== '') {
			console.log("======3======");
            $.ajax({
                xhrFields: {
                    withCredentials: true
                },
                url: http_ajax + 'sendMessage',
                type: 'POST',
                data: {
                    messageContent: $('#content').val(),
                    adminNo: adminNo,
                    adminName: ''
                },
                beforeSend: function (XMLHttpRequest) {
                    XMLHttpRequest.setRequestHeader('token', tkn);
                },
                dataType: 'json',
                success: function (data) {
                    console.log(data, '发送消息');
                    if (data.code === 20001) {
                        alert('需要登录哦！');
                        setTimeout(function () {
                            sessionStorage.setItem('password', 'password');
                            window.location.href = 'login.html';
                        }, 100);
                    } else if (data.code === 200) {
                        setTimeout(function () {
                            sessionStorage.setItem('password', 'password');
                            // window.location.href = 'user-data.html';
                        }, 100);
                    }
                }
            });
        }
    }
}
function talkListFuns(s) {

    var tkn = getCookie(tk);
    if (!tkn == '') {
        if (s !== '') {
            $.ajax({
                xhrFields: {
                    withCredentials: true
                },
                url: http_ajax + 'sendMessage',
                type: 'POST',
                data: {
                    messageContent: s,
                    adminNo: adminNo,
                    adminName: '',
                    messageType:1
                },
                beforeSend: function (XMLHttpRequest) {
                    XMLHttpRequest.setRequestHeader('token', tkn);
                },
                dataType: 'json',
                success: function (data) {
                    console.log(data, '发送消息');
                    if (data.code === 20001) {
                        alert('需要登录哦！');
                        setTimeout(function () {
                            sessionStorage.setItem('password', 'password');
                            window.location.href = 'login.html';
                        }, 100);
                    } else if (data.code === 200) {
                        setTimeout(function () {
                            sessionStorage.setItem('password', 'password');
                            // window.location.href = 'user-data.html';
                        }, 100);
                    }
                }
            });
        }
    }
}

// // 查看更多
// let pageNo = 0;
// // let adminNo = '';

// function moreTalks() {
// 	var query = window.location.search.substring(1).split('=');
// 	let id = query[1];
// 	$.ajax({
// 		xhrFields: {
// 			withCredentials: true
// 		},
// 		url: http_ajax + 'listMessageOnDataBase.html',
// 		type: 'GET',
// 		dataType: 'json',
// 		async: false,
// 		data: {
// 			recruitInfoId: id,
// 			pageNo: pageNo,
// 			pageSize: 10
// 		},
// 		success: function(data) {
// 			if (data.code === 200) {
// 				console.log(data, '-=-=-=-=-=-=-=');
// 				$('.seeMore')[0].innerText = '查看更多';
// 				console.log(data);
// 				var talkLists = '';
// 				if (pageNo === 0) {
// 					pageNo++;
// 					let arrs = data.data;
// 					for (var tls = arrs.length - 1; tls >= 0; tls--) {
// 						if (tls == 0 && adminNo == '') {
// 							adminNo = arrs[tls].adminNo;
// 						}
// 						if (arrs[tls].state === 1) {
// 							talkLists += '<li><div style="display: flex;">' +
// 								'<img src="img/phone-head.jpg" alt="">' +
// 								'<div class="" ' +
// 								'style="background-color: #fff;padding: 5px;margin-left:10px;border-radius: 6px;">' +
// 								arrs[tls].summary + '</div>' +
// 								'</div></li><br><br>';
// 						} else {
// 							talkLists += '<li><div style="display: flex;float: right;">' +
// 								'<div class="" ' +
// 								'style="background-color: #fff;padding: 5px;margin-left:10px;border-radius: 6px;">' +
// 								arrs[tls].summary + '</div>' +
// 								'<img src="img/phone-head.jpg" alt="">' +
// 								'</div></li><br><br>';
// 						}
// 					}
// 					$('.talk')[0].innerHTML = talkLists + $('.talk')[0].innerHTML;
// 				} else {
// 					pageNo++;
// 					if (pageNo > data.data.totalPages) {
// 						$('.seeMore')[0].innerText = '没有更多了!';
// 						$('.seeMore').attr('disabled', 'disabled');
// 					}
// 					let arr = data.data.content;
// 					for (var tl = arr.length - 1; tl >= 0; tl--) {
// 						if (arr[tl].state === 1) {
// 							talkLists += '<li><div style="display: flex;">' +
// 								'<img src="img/phone-head.jpg" alt="">' +
// 								'<div class="" ' +
// 								'style="background-color: #fff;padding: 5px;margin-right:10px;border-radius: 6px;">' +
// 								arr[tl].summary + '</div>' +
// 								'</div></li><br><br>';
// 						} else {
// 							talkLists += '<li><div style="display: flex;float: right;">' +
// 								'<div class="" ' +
// 								'style="background-color: #fff;padding: 5px;margin-right:10px;border-radius: 6px;">' +
// 								arr[tl].summary + '</div>' +
// 								'<img src="img/phone-head.jpg" alt="">' +
// 								'</div></li><br><br>';
// 						}
// 					}
// 					$('.talk')[0].innerHTML = talkLists + $('.talk')[0].innerHTML;
// 				}
// 			} else if (data.code === 20001) {
// 				alert('需要再次登录哦！');
// 				setTimeout(function() {
// 					sessionStorage.setItem('password', 'password');
// 					window.location.href = 'login.html';
// 				}, 100);
// 			}
// 		}
// 	});
// }
