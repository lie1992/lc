if(userAgent() == "android"){
	document.addEventListener('WebViewJavascriptBridgeReady', function(e) {
		var bridge = e.bridge;
		//分享
		$(".js-share").click(function(){
			var shareImg = $("#shareImg").val();
			var shareName = $("#shareName").val();
			var shareUrl = 'http://bettergoo.com/index.php/mobile/mobile/appdownload';//$("#shareUrl").val();
			var shareContent = $("#shareContent").val();

			var data = {
				img:shareImg,
				link:shareUrl,
				content:shareContent,
				title:shareName
			}
			window.WebViewJavascriptBridge.callHandler('JsToApp_share', data)
		});
		//登录
		$(".QQ-login").click(function(){
			window.WebViewJavascriptBridge.callHandler('JsToApp_qqLogin');
		});
		$(".WX-login").click(function(){
			window.WebViewJavascriptBridge.callHandler('JsToApp_wxLogin');
		});

		//通话
		$(".call").click(function(){
			var txt = $(this).find("span").text();
			window.WebViewJavascriptBridge.callHandler('JsToApp_call',txt);
		});

		//复制
		$("#cp,.cpCls").click(function(){
			var txt = $("#copyTxt").val();
		    if(!txt){
		        return false;
		    }
//		    alert(txt)
			window.WebViewJavascriptBridge.callHandler('JsToApp_fz', txt);
		});

		//打开微信
		$(".openwx").click(function(){
			window.WebViewJavascriptBridge.callHandler('JsToApp_openwx');
		});

		//购买支付 0
		$("#payNow").click(function(){
			window.WebViewJavascriptBridge.callHandler('JsToApp_Pay',0);
		});

		//充值 1
		$(".chargeNow").click(function(){
			window.WebViewJavascriptBridge.callHandler('JsToApp_charge',1);
		});

		//注册js方法，供客户端调用
		bridge.registerHandler("AppToJs_back", function(data) {
			if($("#currentPage").val()=="index"){
				window.WebViewJavascriptBridge.callHandler('JsToApp_close');
			}else{
				window.history.back(-1);
			}
		})

	}, false)

}else if(userAgent() == "ios"){
		//分享
		$(".js-share").click(function(){
			var shareImg = $("#shareImg").val();
			var shareName = $("#shareName").val();
			var shareUrl = $("#shareUrl").val();
			var shareContent = $("#shareContent").val();

			var data = {
				img:shareImg,
				link:shareUrl,
				content:shareContent,
				title:shareName
			}
			JsToApp_share(JSON.stringify(data));
		});

		//支付
		$(".js-payment").click(function(){
			JsToApp_pay();
		});
		//通话
		$(".call").click(function(){
			var txt = $(this).find("span").text();
			JsToApp_call(txt);
		});

		//保留
		//复制
		$("#cp,.cpCls").click(function(){
			var txt = $("#copyTxt").val();
			if(!txt){
                return false;
            }
			JsToApp_fz(txt);
//			alert(txt)
			$.PageDialog.ok("复制成功");
		});
}else{

}

//客户端参数
function userAgent(){
    var ua = navigator.userAgent.toLowerCase();
    var _ua = "";
    if (/iphone|ipad|ipod/.test(ua)) {
        _ua = "ios";
    } else if (/android/.test(ua)) {
        _ua = "android";
    }else{
        _ua = "web";
    }
    return _ua;
}
