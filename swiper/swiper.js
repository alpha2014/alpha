/*
 * Swiper
 * Created: 2014-09-07
 * Author: Ronny Zhang
 * Funtion: swipe up or down to slide
 * Support: webkit
 */

(function() {

	var Swiper = Alpha.Swiper = Alpha.createClass('Swiper', {
		construct: 	function(param){
			var container = param.container;
			this.width = container[0].clientWidth;
			this.height = container[0].clientHeight;
			this.container = container;
			this.wrapper = container.children();
			this.curIndex = 0;
			this.slides =  container.children().children();

			this.param = param;
			this.isHorizon = param.direction == 'horizon';

			this.init();
			this.bindSwipe();

			var f;
			if( f = this.param.onSlideChangedEnd ){
				this.bindSlideChangedEnd( f );
			}
		},
		init: function(){
			var slides = this.slides;
			slides.height(this.height);
			slides.width(this.width);

			var len = slides.length;
			var wrapper = this.wrapper;
			if(this.isHorizon){
				wrapper.width(this.width * len);
				wrapper.height(this.height);
				this.prevAct = 'swiperight';
				this.nextAct = 'swipeleft';
				this.slides.css('float', 'left');
			}else{
				wrapper.width(this.width);
				wrapper.height(this.height * len);
				this.prevAct = 'swipedown';
				this.nextAct = 'swipeup';
			}

			this.slides.stopTransitionBubble();
		},
		setWrapperTranslate: function( x, y ){
			this.wrapper.css({
				'-webkit-transition' : (this.param.duration || 350) + 'ms' + ' ' + (this.param.ease||''),
				'-webkit-transform' : 'translate3d(' + x + 'px, ' + y + 'px, 0)'
			});
		},
		swipeNext: function(){
			this.curIndex++;
			this.swipeTo( this.curIndex );
		},
		swipePrev: function(){
			this.curIndex--;
			this.swipeTo( this.curIndex );
		},
		swipeTo: function(index){
			var i = this.constrain( index );
			if( i != index ) return;

			if(this.isHorizon){
				this.setWrapperTranslate( -i * this.width, 0 );
			}else{
				this.setWrapperTranslate( 0, -i * this.height );
			}
		},
		constrain: function( index ){
			if( index < 0 ) index = 0;
			var l = this.slides.length;
			if( index >= l ) index = l - 1;
			this.curIndex = index;
			return index;
		},
		bindSwipe: function(){
			var swiper = this.container.hammer();
			var self = this;

			this.container[0].addEventListener('touchmove', function(ev){
				ev.preventDefault();
			}, false);

			var sg = this.param.stopGuesture;
			if(sg != 'both'){
				sg != 'next' && swiper.on(this.nextAct, function(ev){
					ev.gesture.stopPropagation()
					self.swipeNext();
				});	
					
				sg != 'prev' && swiper.on(this.prevAct, function(ev){
					ev.gesture.stopPropagation()
					self.swipePrev();
				});
			}
		},
		getSlides: function(){
			return this.slides;
		},
		bindSlideChangedEnd: function( func ){
			var self = this;
			this.wrapper[0].addEventListener('webkitTransitionEnd', function(ev){
				ev.preventDefault();
				func.call( self, self.curIndex );
			}, false);
			
		}
	});

	$.fn.swipe = function( param ){
		param = param || {};
		param.container = this;
		return new Swiper( param );
	}

})();
