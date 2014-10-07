/*
 * TODO
 * 
 */

var SimpleBar = AC.SimpleBar = Alpha.createClass('SimpleBar', {
	extend: AC.Chart,
	construct: function(container, param){
		this.callBase(container, param);
		this.addYLabel();
		this.addBar();
	},
	addYLabel: function(){
		var yAxis = this.param.yAxis;
		var categories = yAxis.categories;
		var widthes = [];
		var self = this;
		categories.forEach(function(txt, i){
			var row = $('<div class="row"></div>').css({
				padding: '5px 0',
				overflow: 'auto',
				'text-align': 'right'
			}).appendTo(self.container)[0];

			var h = self.param.plotOptions.bar.width;
			var w = $('<div class="label">'+txt+'</div>').css(yAxis.label.style).css({
				float: 'left',
				'line-height': (h+2) + 'px',
				color: self.param.color[i]
			}).appendTo(row).width();

			widthes.push(w+10);
		});

		this.yLabelWidth = widthes.max();
		$('.label', this.container[0]).width(this.yLabelWidth);
	},
	addBar: function(){
		var param = this.param;
		var self = this;
		var h = param.plotOptions.bar.width;
		$('.row', this.container).each(function(i, row){

			$('<div class="bar"></div>').css({
				'margin-left': (self.yLabelWidth + 5) + 'px',
				'background-color': param.backColor,
				'border-radius': '1px',
				height: h + 'px',
				overflow: 'hidden'
			}).append($('<div class="inner"></div>').css({
				height: '100%',
				width: '100%',
				'background-color': self.param.color[i],
				'-webkit-transform': 'translate3d(-150%,0,0)'
			}).append($('<div class="label"></div>').css(param.xAxis.label.style))).appendTo(row);

		});

	},
	update: function(){
		var param = this.param;
		var self = this;
		setTimeout(function(){
			var anim = param.animation;
			var innerBars = $('.inner', self.container);
			var data = param.series[0].data;
			var max = param.xAxis.max || data.max();
			var format = param.xAxis.label.format;
			innerBars.each(function(i, inner){
				var d = data[i];
				$(inner).css({
					'-webkit-transition': anim.duration + 'ms ' + (anim.ease||'ease') + (anim.delay*i) + 'ms',
					'-webkit-transform': 'translate3d(-'+((1-d/max)*100)+'%,0,0)'
				}).find('.label').html(format? format(d): d);
			});

		}, 300);

	}
});