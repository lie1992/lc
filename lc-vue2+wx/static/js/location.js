function initialize() {
    var geolocation = new BMap.Geolocation();
	geolocation.getCurrentPosition(function(r){
		if(this.getStatus() == BMAP_STATUS_SUCCESS){
			var mk = new BMap.Marker(r.point);
            window.sessionStorage.lng = r.point.lng;
            window.sessionStorage.lat = r.point.lat;
            console.log(window.sessionStorage.lng,window.sessionStorage.lat)
		}
		else {
			// alert('failed'+this.getStatus());
		}
	}, {enableHighAccuracy: true})
}

function loadScript() {
    var script = document.createElement("script");
    script.src = "http://api.map.baidu.com/api?v=2.0&ak=X3KQeIPEZ1s8e50o9sQbssnqg8whsn5l&callback=initialize"
    // http://api.map.baidu.com/api?v=1.4&ak=您的密钥&callback=initialize"; //此为v1.4版本及以前版本的引用方式
    document.body.appendChild(script);
}

window.onload = function(){
    loadScript()
};
