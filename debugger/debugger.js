if(window.location.href.indexOf('_d')>0){
	window.onerror = function(e){
		alert(e);
	}
}