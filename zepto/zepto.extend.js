/*
 * get dom rect even when dom is not in document
 */
$.fn.getRect = function(){
	var w, h;
	if( this.parents('body').length ){
		w = this.width();
		h = this.height();
	}else{
		var tmp = this.appendTo( document.body );
		w = tmp.width();
		h = tmp.height();

		tmp.remove();
	}

	return {
		width : w,
		height : h
	};
}

/*
 * get dom rect even when dom is not in document
 */
$.fn.animClass = function(className){
	var self = this.removeClass(className);
	setTimeout(function(){
		self.addClass(className);
	}, 10);
	return this;
}

/*
 * stop transition bubble
 */
$.fn.stopTransitionBubble = function(){
	this.each(function(i, elem){
		elem.addEventListener('webkitTransitionEnd', function(ev){
			ev.stopPropagation();
		}, false);

		elem.addEventListener('webkitAnimationEnd', function(ev){
			ev.stopPropagation();
		}, false);
	});

	return this;
}