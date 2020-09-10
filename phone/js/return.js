var backbutton_count = 0;
/*
mui.init({
	tap:true,
	keyEventBind: {
	backbutton: true, //鍏抽棴back鎸夐敭鐩戝惉
});

mui.back = function() {
	var webview = plus.webview.currentWebview();
	backbutton_count++;
	if(window.location.pathname == '/'){
		if(backbutton_count >= 2){
    		webview.close();
            plus.runtime.quit();
		}
	}else if(e.canBack) {
		webview.back();
	}
}
*/

document.addEventListener('plusready', function() {
    var webview = plus.webview.currentWebview();
    plus.key.addEventListener('backbutton', function() {
        webview.canBack(function(e) {
            backbutton_count++;
            if(window.location.pathname == '/'){
                if(backbutton_count >= 2){
                    webview.close();
                    plus.runtime.quit();
                }
            }else if(e.canBack) {
                webview.back();
                return false;
            }
            return false;
        })
    });
});