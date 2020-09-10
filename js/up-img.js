function upImg(thisImg,upBtn){
	// thisImg==上传图片显示容器
	// upBtn==input按钮
	//获取到预览框
	var imgObjPreview = document.getElementById(thisImg);
	$('#'+upBtn).change(function() {
		//获取到file的文件
		var docObj = this;
		//获取到文件名和类型（非IE，可一次上传1张或多张）
		if(docObj.files && docObj.files[0]) {
			imgObjPreview.src = window.URL.createObjectURL(docObj.files[0]);



			var formData = new FormData();
			// console.log(docObj.files[0])
			formData.append("file", docObj.files[0]);
			formData.append("name", "123")
			// console.log(formData)
			// console.log(JSON.stringify(formData))
		}
		//IE（只能一次上传1张）
		else {
		//使用滤镜
			docObj.select();
			var imgSrc = document.selection.createRange().text;
				imgObjPreview.src = imgSrc;
				document.selection.empty();
		}
		return true;
	})
}
