Al.Com.WeixinShareLayer = Al.createClass('WeixinShareLayer', {
	construct: function(src, show){

		src = src || 'http://shushuo.baidu.com/act/webtrend/img/share.png';

		this.mask = $('<div></div>').css({
			position: 'fixed',
			top: 0,
			left: 0,
			right: 0,
			bottom: 0,
			background: 'rgba(0, 0, 0, 0.7)',
			zIndex: 1000
		}).appendTo(document.body).append($('<img alt="" src="' + src + '" />').css({
			position: 'absolute',
			width: '114px',
			right: '20px',
			top: '10px'
		}));

		if(show !== true){
			this.mask.hide();
		}

		var self = this;
		this.mask.hammer().on('tap', function(){
			self.hide();
		});
	},

	show: function(){
		this.mask.show();
	},

	hide: function(){
		this.mask.hide();
	},
});