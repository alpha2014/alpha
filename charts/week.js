/*
 * TODO
 * 
 */
var week = AC.Week = Al.createClass('Week', {
	extend: AC.Chart,
	construct: function(container, param){
		this.callBase(container, param);
	},

	buildStyle: function(obj){
		var s = '';
		for(var i in obj){
			s += i + ':' + obj[i] + ';';
		}
		return s;
	},
	addGrid: function(){
		var gridContainer = $('<div class="grid-container"></div>').css({
			'width': '5px',
			'float': 'left',
			'height': '100%',
			'margin-right': '1px'
		}).appendTo(this.container);

		var grid = this.param.grid;
		var i = 1, l = grid.length;
		var unit = this.unit = this.outerHeight/(l-1);
		var css;
		for(; i<l; i++){
			css = {
				'border-right': '#efefef 1px solid',
				'border-bottom': '#efefef 1px solid',
				'height': unit-(i==1?2:1) + 'px'
			};
			if(i==1){
				css['border-top'] = '#efefef 1px solid';
			}
			$('<div></div>').css(css).appendTo(gridContainer);
		}
	},
	addGridLabel: function(){
		var labelContainer = $('<div class="grid-label"></div>').css({
			'position': 'relative',
			'width': 'auto',
			'float': 'left',
			'height': '100%',
			'margin-right': '5px'
		}).appendTo(this.container);

		var format = this.param.gridFormat;
		var grid = this.param.grid;
		var i = 0, l = grid.length;
		var unit = this.unit = this.outerHeight/(l-1);
		var widths = [], label, val;
		for(; i<l; i++){
			val = grid[i];
			val = format? format(val) : val;
			label = $('<div class="label">' + val + '</div>').css({
				'position': 'absolute',
				'font-size': '12px',
				'top': unit*(l-1-i) + 'px',
				'color': '#efefef',
				'text-align': 'right',
				'margin-top': '-6px'
			}).appendTo(labelContainer);
			widths.push(label.width());
		}

		var max = this.gridLabelWidth = widths.max();
		labelContainer.width(max);
		$('.label', labelContainer[0]).width(max);
	},
	addBar: function(){
		var container = this.container;
		var param = this.param;
		var i = 0;
		var l = param.label.length;
		var width = this.outerWidth - (this.gridLabelWidth+5+5+2);
		var barWidth = width/l;
		var barContainer = $('<div class="bar-container"></div>').css({
			width: width + 'px',
			height: '100%',
			float: 'left',
			overflow: 'hidden'
		}).appendTo(container);

		var bar;
		for(; i < l; i++){
			bar = $('<div class="bar"></div>').css({
				'position': 'relative',
				'background-color': param.backColor[i],
				'width': barWidth + 'px',
				'height': '100%',
				'float': 'left',
				'font-size': '12px',
				'text-align': 'center',
				'color': '#efefef',
				// 'overflow': 'hidden',
				'-webkit-transform-origin': '100% 100%',
				'-webkit-transform': 'rotate(-90deg)'
			}).appendTo(barContainer).append($('<span class="text">' + param.label[i] + '</span>').css({
				'margin-top': '7px',
				'display': 'inline-block',
				'position': 'relative',
				'z-index': 2
			})).append($('<div class="inner"></div>').css({
				position: 'absolute',
				top: 0,
				width: '100%',
				height: '100%',	
				'background-color': param.frontColor[i],
				'z-index': 1,
				'-webkit-transform': 'translate3d(0, 200%, 0)'
			}));
		}

		var anim = param.animation;
		var dur = anim.duration;

		var bars = $('.bar', container[0]);
		var len = bars.length;
		setTimeout(function(){
			bars.each(function(i, bar){
				$(bar).css({
					'-webkit-transition': dur + 'ms ' + (anim.ease||'ease') + ' ' + (dur/2*(len-1-i)) + 'ms',
					'-webkit-transform': 'rotate(0deg)'
				});
			});
		}, 0);
		this.barsTime = len*dur/2;
	},
	grow: function(){
		var param = this.param;
		var val = param.value, unit = param.unit;
		
		var totals = parseInt(val/unit);
		var remain = val%unit/unit*100;
		
		var inner = $('.inner', this.container[0]);
		$($('.bar', this.container[0])[totals]).css({
			'z-index': 100
		});
		this.addValue(inner[totals]);

		var anim = param.animation;
		var dur = anim.duration;
		var self = this;
		setTimeout(function(){
			inner.each(function(i, fill){
				if(i <= totals){
					var per = i < totals? 0: 100-remain;
					$(fill).css({
						'-webkit-transition': dur + 'ms ' + (anim.ease||'ease') + ' ' + (dur*i) + 'ms',
						'-webkit-transform': 'translate3d(0,' + per + '%,0)'
					});
				}
				self.valueLabel.css('opacity', 1);
			});
		}, this.barsTime + dur);
	},
	addValue: function(bar){
		var val = this.param.value;
		var format = this.param.valueFormat;
		var label = format? format(val): val;

		var l = this.valueLabel = $('<div>' + label + '</div>').css({
			position: 'absolute',
			width: '200px',
			color: '#f1a019',
			'text-align': 'left',
			'font-family': 'PTDINCond',
			'font-size': '25px',
			'text-indent': '3px',
			'opacity': 0
		}).appendTo(bar);

		l.css('top', -l[0].clientHeight + 'px');
	},
	update: function(){
		this.addGridLabel();
		this.addGrid();
		this.addBar();
		this.grow();
	}
});