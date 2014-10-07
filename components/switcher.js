Al.Com.Switcher = Al.createClass('Switcher', {
	construct: function(param){
		var t1 = param.text[0];
		var t2 = param.text[1];
		this.param = param;

		var sw = this.switcher = $('<div class="switcher"><div class="button"></div><div class="text">'+t1+'</div><div class="text">'+t2+'</div></div>');
		var self = this;
		this.button = $(this.switcher).find('.button');
		sw.on('touchstart', function(ev){			
			var button = self.button;
			if( button.hasClass('right') ){
				self.switchToLeft();
			}else{
				self.switchToRight();
			}

		});

		var w = [];
		var texts = this.switcher.find('.text');
		texts.each(function(i, text){
			w.push($(text).clone().css({
				position: 'absolute'
			}).getRect().width+30);
		});
		var max = w.max();
		this.switcher.width(max*2);

		sw[0].addEventListener('webkitTransitionEnd', function(ev){
			ev.stopPropagation();
			var pos = $(this).find('.button').hasClass('left')? 'left' : 'right';
			param.onselect(pos);
		}, false);
	},

	switchToLeft: function(){
		this.button.removeClass('right').addClass('left');
		this.moveButton(0);
	},

	switchToRight: function(){
		this.button.removeClass('left').addClass('right');
		var x = this.switcher.width() / 2 - 4;
		this.moveButton(x);
	},

	moveButton: function(x){
		this.button.css({
			'-webkit-transition': this.param.duration + 'ms',
			'-webkit-transform': 'translate3d(' + x + 'px, 0, 0)'
		});
	},

	switch: function(side){
		side = side || (this.button.hasClass('right') ? 'Left': 'Right');
		this['switchTo' + side]();
	}
});