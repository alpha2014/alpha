Al.Com.Dragger = Al.createClass('Dragger', {
	construct: function(outer, direction){
		this.outer = $(outer).css({
			overflow: 'hidden'
		});
		this.inner = $(this.outer.children()[0]);
		this.diffX = $(outer).width() - $(this.inner).width();
		this.diffY = $(outer).height() - $(this.inner).height();
		this.dir = direction || 'both'; // x y or both

		this.init();
	},
	init: function(){
		var dir = this.dir;

		var tmpX = 0,
			tmpY = 0,
			allX = 0,
			allY = 0,
			x = 0,
			y = 0,
			deltaX,
			deltaY,
			diffX = this.diffX,
			diffY = this.diffY;

		var outer = this.outer[0];
		var $inner = this.inner;
		outer.addEventListener('touchstart', function( ev ){
			ev.preventDefault();
			var t = ev.touches[0];
			x = t.clientX;
			y = t.clientY;
		}, false);
		outer.addEventListener('touchmove', function( ev ){
			ev.preventDefault();

			var t = ev.touches[0];
			deltaX = t.clientX - x + tmpX;
			deltaY = t.clientY - y + tmpY;

			if(dir == 'x' || dir == 'both'){
				if( !(deltaX >= 0 || deltaX < diffX) ){
					allX = deltaX;
				}
			}

			if(dir == 'y' || dir == 'both'){
				if( !(deltaY >= 0 || deltaY < diffY) ){
					allY = deltaY;
				}
			}

			$inner.css({
				'-webkit-transition' : '0ms',
				'-webkit-transform' : 'translate3d(' + allX + 'px, ' + allY + 'px, 0)'
			});

		}, false);
		outer.addEventListener('touchend', function( ev ){
			ev.preventDefault();
			tmpX = allX;
			tmpY = allY;
		}, false);

	},
	
});