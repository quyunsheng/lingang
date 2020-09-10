
function myPicShow(src){
    jQuery("#vkDivMaskPicsShow").css("display","block");
    document.getElementById("vkDivMaskPicsShow").innerHTML="<div class='vkDivMaskCont' onclick='myPicHide()'>"+src+"</div>";
}
function myPicHide(){
    jQuery("#vkDivMaskPicsShow").css("display","none");
}
function myProcessBegin(vhtml){
    jQuery("#vkDivMaskPrc").css("display","block");
    document.getElementById("vkDivMaskContPrcLogo").className="vkDivMaskContPrcBegin";
    document.getElementById("vkDivMaskContPrcText").innerHTML=vhtml;
}
function myProcessShow(){
	jQuery("#vkDivMaskPrc").css("display","block");
	document.getElementById("vkDivMaskContPrcLogo").className="vkDivMaskContPrcBegin";
	var prcok=setTimeout('jQuery("#vkDivMaskPrc").css("display","none");',400);
}
function myProcessHide(){
    jQuery("#vkDivMaskPrc").css("display","none");
    document.getElementById("vkDivMaskContPrcText").innerHTML="";
}
function myProcessOk(url,vhtml){
	jQuery("#vkDivMaskPrc").css("display","block");
	document.getElementById("vkDivMaskContPrcLogo").className="vkDivMaskContPrcOk";
	document.getElementById("vkDivMaskContPrcText").innerHTML=vhtml;
	//var prcok=setTimeout('jQuery("#vkDivMaskPrc").css("display","none");',2000);
	var prcok=setTimeout(function(){
		jQuery("#vkDivMaskPrc").css("display","none");
		if(url.length>5){
			window.location.href=url;
		}
	},2500);
}
function myProcessErr(url,vhtml){
	jQuery("#vkDivMaskPrc").css("display","block");
	document.getElementById("vkDivMaskContPrcLogo").className="vkDivMaskContPrcErr";
	document.getElementById("vkDivMaskContPrcText").innerHTML=vhtml;
	var prcerr=setTimeout(function(){
		jQuery("#vkDivMaskPrc").css("display","none");
		if(url.length>5){
			window.location.href=url;
		}
	},1500);
}

function myAlertShow(vhtml){
    jQuery("body").append("<div class='vkDivMask'><div class='vkDivMaskCont' onclick='myAlertHide()'>"+vhtml+"</div></div>");
    jQuery(".vkDivMask").css("display","block");
}

function myAlertShowNo(vhtml){
    jQuery("body").append("<div class='vkDivMask'><div class='vkDivMaskCont' >"+vhtml+"</div></div>");
    jQuery(".vkDivMask").css("display","block");
}
// 隐藏层
function myAlertHide(){
	$(".vkDivMask").innerHTML="";
    jQuery(".vkDivMask").css("display","none");
}

function myPageOpen(url){
    jQuery("body").append("<div class='vkDivMask3'><iframe class='vkDivMaskCont3' src='"+url+"' frameborder='0' scrolling='no' ></iframe></div>");
    jQuery(".vkDivMask3").css("display","block");
}
function myPageHide(){
	$(".vkDivMask3").innerHTML="";
    jQuery(".vkDivMask3").css("display","none");
}

function showShare(){
    jQuery("body").append("<div class='vkDivMask' onclick='myAlertHide()'><img width='100%' src='/resources/nbd_m/images/showShare.png'></div>");
    jQuery(".vkDivMask").css("display","block");
}


function myInputShow(p_uuid,work_uuid,p_create_user_name){

    jQuery("body").append("<div class='vkDivMask2'><div class='vkDivMaskCont' ><textarea class='inputCont' id='inputCont' name='inputCont'></textarea><div class='vksubmit'> <input type='button' onclick='cancel()' value='取消' /><input type='button' onclick='mysubmit(\""+p_uuid+"\",\""+work_uuid+"\",\""+p_create_user_name+"\")' value='提交'></div></div></div>");
    jQuery(".vkDivMask2").css("display","block");
}
//隐藏层
function myAlertHide2(){
	$(".vkDivMask2").innerHTML="";
    jQuery(".vkDivMask2").css("display","none");
}

function myInputSubmit(v){
	v.submit();
}
function cancel(){
	myAlertHide2();
}
function mysubmit(p_uuid,work_uuid,p_create_user_name){
	var inputCont = document.getElementById("inputCont").value;
	if(inputCont.length>0){
		reply(p_uuid,work_uuid,p_create_user_name,inputCont);
	}else{
		alert("请输入内容");
	}
	
}


function show_standard(company_uuid,tt){

    jQuery("body").append("<div class='vkDivMaskStandard'><div class='vkDivStandardCont' >"+tt+"</div></div>");
    jQuery(".vkDivMaskStandard").css("display","block");
}
function show_order_control(sid,tt){

    jQuery("body").append("<div class='vkDivMaskStandard'><div class='vkDivStandardCont' >"+tt+"</div></div>");
    jQuery(".vkDivMaskStandard").css("display","block");
}

function hide_standard(company_uuid,tt){

    jQuery(".vkDivMaskStandard").css("display","none");
}
//隐藏层






function headchlover(v,k,a,iii){
	for(var i=1;i<=a;i++){
		document.getElementById(v+i).style.display="none";
		document.getElementById(k+i).className="cHeadChl";
	}
	
	document.getElementById(v+iii).style.display="block";
	document.getElementById(k+iii).className="cHeadChlNow";
	
	}
	