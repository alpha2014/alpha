SVG.add('Arc', Al.createClass('Arc', {
	extend: SVG.Shape,
	__after: function(){
		this.callBase();
	},
	construct: function(ox, oy, R, startAngle, endAngle){
		var PI = Math.PI,
			sin = Math.sin,
			cos = Math.cos;

		var rs = startAngle/180*PI;
		var re = endAngle/180*PI;

		var x1 = cos(rs) * R + ox;
		var y1 = sin(rs) * R + oy;
		var x2 = cos(re) * R + ox;
		var y2 = sin(re) * R + oy;

		var coords = 'M' + x1 + ',' + y1 + ' A' + R + ', ' + R + ' 0 0,1 ' + x2 + ' ' + y2;
		// console.log(coords);
        var arc = document.createElementNS(SVG.xmlns, 'path');
        arc.setAttributeNS(null, 'd', coords);

        this.shape = this.arc = arc;
	},

	update: function(){
		setTimeout((function(){
	        this.shape.getBoundingClientRect();
	        this.shape.style.webkitTransition = '2000ms ease';
	        this.shape.getBoundingClientRect();
	        var coords = 'M150,100 A50, 50 0 0,1 150 153';
	        this.shape.getBoundingClientRect();
	        this.shape.setAttributeNS(null, 'd', coords);
	        this.shape.setAttributeNS(null, 'stroke', '#00F');
		}).bind(this), 100);

	}
}));