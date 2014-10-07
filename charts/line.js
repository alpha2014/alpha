/*
 * TODO
 * 1. series多组数据
 */
var Line = AC.Line = Alpha.createClass('Line', {
	extend : AC.Coordinate, 
	construct : function(container, param){
		this.callBase(container, param);
	},

	addSVG : function(container){
		var SVG = Al.SVG;
		this.svg = new SVG.Paper(container);

		var gradient = new SVG.Gradient( 'horizon' );
		gradient.addStop( 0, '#08d7c3' );
		gradient.addStop( 30, '#fdcf24' );
		gradient.addStop( 100, '#ee5567' );
		this.svg.addDef( gradient );
	},

	drawLine : function(points){
		var path = new Al.SVG.Polyline(points);
		path.stroke({
			color : '#F00',
			width : 10,
			resource : 'gradient'
		});

		this.svg.addShape(path);

		this.grow(path);
	},

	grow : function(path){
		path = path.path;
		var length = path.getTotalLength(); 

		path.style.strokeDasharray = length + ' ' + length; 
		path.style.strokeDashoffset = length;

		// Trigger a layout so styles are calculated & the browser 
		// picks up the starting position before animating 
		path.getBoundingClientRect();
		var scroll = this.param.animation.autoScroll;

		$(path).stopTransitionBubble();

		path.style.webkitTransition = 'stroke-dashoffset ' + scroll.duration + 'ms ' + (scroll.ease || 'ease') + ' ' + scroll.delay + 'ms'; 
		path.style.strokeDashoffset = '0';
	},

	addLine : function(){
		var series = this.param.series;

		var entry,
			data,
			line,
			h = this.plot.height(),
			y;

		for(var i = 0; i < series.length; i++){
			entry = series[i];
			data = entry.data;
			line = [];
			for(var j = 0; j < data.length; j++){
				y = this.measure(data[j]);
				line.push([this.xPaces[j], h+y]);
			}
			this.drawLine(line);
		}
		
	},
	update : function(){
		this.callBase();
		this.addSVG(this.plot[0]);
		this.addLine();
	}
});