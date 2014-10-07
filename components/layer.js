Al.Com.Layer = Al.createClass('Layer', {
	construct: function(param){
		this.layer = $('<div class="alpha-com-layer">' + param.img + '<p>' + param.content + '</p></div>').css({
			position: 'absolute',
			width: '60%',
			height: '100px',
			left: '20%',
			top: '50%',
			marginTop: '-90px',
		}).appendTo(document.body).hide();
	},
	show: function(){
		this.layer.show();
	},
	hide: function(){
		this.layer.hide();
	}
});
