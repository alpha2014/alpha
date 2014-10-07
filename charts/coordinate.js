/*
 * 
 * 
 */

var Coordinate = AC.Coordinate = Alpha.createClass('Coordinate', {
	extend : AC.Chart,
	construct : function(container, param){
		this.callBase(container, param);
	},

	bindAnimationEnd : function(callback){
		var args = [].slice.call(arguments, 0);
		this.container[0].addEventListener('webkitTransitionEnd', function(ev){
			callback.apply(args);
		}, false);
	},

	setContainer : function(){
		var c = this.container;
		if( [ 'absolute', 'relative' ].indexOf( c.css('position') ) < 0 ){
			c.css('position', 'relative');
		}

		c.css('font-family', 'Arial');
	},

	setOrigin : function( x, y ){
		this.origin = {
			x : x,
			y : y
		};
	},

	getOrigin : function(){
		return this.origin;
	},

	addInnerContainer : function(){

		var left = this.yLabelWidth + 5;

		var x = left,
			h2 = this.yLabelHeight/2,
			height = this.outerHeight - h2,
			width = this.outerWidth - left;

		this.setOrigin( x, this.outerHeight - this.yLabelHeight );


		this.innerContainer = $('<div class="inner-container"></div>').css({
			'position' : 'absolute',
			'width' : width + 'px',
			'height' : height + 'px',
			'left' : x + 'px',
			'top' : h2 + 'px',
			'overflow' : 'hidden'
		}).appendTo( this.container );

		this.plotWidth = this.param.plotOptions.box && this.param.plotOptions.box.width || width;
	},

	addPlot : function(axis, pos){
		var style = {
			'position' : 'absolute',
			'width' : this.plotWidth + 'px',
			'height' : this.innerContainer.height() - this.yLabelHeight + 'px',
			'overflow' : 'hidden'
		};

		style['border-' + (pos||'bottom')] = axis.color + ' ' + axis.width + 'px solid';
		this.plot = $('<div class="plot"></div>').css(style).appendTo( this.plotContainer );
	},

	addPlotContainer : function(){
		this.plotContainer = $('<div class="plot-container"></div>').css({
			'position' : 'absolute',
			'width' : this.plotWidth + 'px',
			'height' : this.innerContainer.height() + 'px'
		}).appendTo( this.innerContainer );
	},

	addXLabel : function(){
		var categories = this.param.xAxis.categories,
			l = categories.length,
			xlabel = this.param.xAxis.label,
			style = xlabel.style,
			format = xlabel.format,
			self = this,
			origin = this.getOrigin(),
			pace = this.plotWidth / l,
			pace2 = pace / 2,
			label;

		this.xPaces = [];
		categories.forEach(function( val, i ){
			var txt = format ? format(val) : val;
			style.position = 'absolute';
			label = $('<div></div>').html( txt ).css( style ).appendTo( self.plotContainer );

			var pos = pace2 + pace*i;
			label.css({
					'top' : origin.y - label.height()/2 + 'px',
					'left' : pos - label.width()/2 + 'px'
				});
			self.xPaces.push(pos);
		});

	},

	addYLabel : function(values, labels, withXAxis){
		var ylabels = this.param.yAxis.label,
			grid = values,
			style = ylabels.style,
			format = ylabels.format;

		var self = this;
		var arr = [],
			label;
		this.yLabelContainer = $('<div class="label-container"></div>').css({
			height: '100%',
			position: 'absolute'
		}).appendTo(this.container);

		labels.forEach(function(txt, i){
			// var txt = format ? format(val) : val;
			label = $('<div class="yLabel"></div>').html( txt ).css( style ).css('position', 'absolute').appendTo( self.yLabelContainer );
			arr.push( label.width() );
		});

		var w = label.width(),
			h = label.height(),
			h2 = h / 2;

		this.yLabelWidth = Math.max.apply( {}, arr );
		this.yLabelHeight = h;

		var posArr = this.calGrid( grid, this.outerHeight - h*1.5, 100 );

		this.yLabelContainer.width(this.yLabelWidth);
		$('.yLabel', this.container[0]).each(function( i, label ){
			$(label).css({
				'top' : posArr[ i ] + 'px',
				'width' : '100%',
				'text-align' : 'right'
			});
		});
	},

	calGrid : function( grid, height ){
		this.yRuler = new AC.Ruler(grid, height, 0);
		return this.yRuler.map;
	},

	measure : function( val ){
		var r = this.yRuler;
		return ( val - r.min ) / r.dur * r.length
	},

	bindMove : function(){
		var plotContainerWidth = this.plotContainer.width(),
			innerContainerWidth = this.innerContainer.width(),
			diff = innerContainerWidth - plotContainerWidth;

		if( diff < 0 ){
			var plot = this.innerContainer[0],
				self = this,
				tmp = 0,
				all = 0,
				x = 0,
				delta;

			plot.addEventListener('touchstart', function( ev ){
				ev.preventDefault();
				x = ev.touches[0].clientX;
			}, false);
			plot.addEventListener('touchmove', function( ev ){
				ev.preventDefault();
				delta = ev.touches[0].clientX - x + tmp;

				if( delta >= 0 || delta < diff ) return;

				all = delta;
				self.plotContainer.css({
					'-webkit-transition' : '0ms',
					'-webkit-transform' : 'translate3d(' + all + 'px, 0, 0)'
				});
			}, false);
			plot.addEventListener('touchend', function( ev ){
				ev.preventDefault();
				tmp = all;
			}, false);

			var auto = this.param.animation.autoScroll;
			if( auto ){
				tmp = diff;
				self.plotContainer.css({
					'-webkit-transition' : '-webkit-transform ' + auto.duration + 'ms ' + ( auto.ease || 'ease' ) + ' ' + auto.delay + 'ms',
					'-webkit-transform' : 'translate3d(' + diff + 'px, 0, 0)'
				});
			}
		}
	},

	addUnit : function(){
		var t = this.param.yAxis.label.unit;
		if(!t){
			return;
		}
		var label = $('.yLabel:last-child');
		var unit = label.clone().html(t).appendTo(label.parent());
		unit.css({
			top : parseInt(unit.css('top'))-label.height() + 'px'
		})
	},

	update : function(){
		this.setContainer();

		var yLabel = this.param.yAxis.label;
		var grid = yLabel.grid;
		var labels = grid.map(yLabel.format);
		this.addYLabel(grid, labels, true);

		this.addUnit();
		this.addInnerContainer();
		this.addPlotContainer();
		this.addXLabel();

		var axis = this.param.xAxis.axis;
		this.addPlot(axis);

		this.bindMove();
	}
});
