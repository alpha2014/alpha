SVG.add('Circle', Al.createClass('Circle', {
	construct: function(cx, cy, radius){
		// var r = radius;
		// var coords = '';
		// coords += 'M' + (cx+r) + ' ' + cy + ' ';
		// coords += 'A30 50 0 0 1 160 160';

		// var circle = document.createElementNS(SVG.xmlns, 'path');
		// circle.setAttributeNS(null, 'd', coords);

		var circle = document.createElementNS(SVG.xmlns, 'circle');
		circle.setAttributeNS(null, 'cx', cx);
		circle.setAttributeNS(null, 'cy', cy);
		circle.setAttributeNS(null, 'r', radius);

		this.shape = this.circle = circle;
	},

	stroke : function( style ){
		var p = this.circle,
		s = style;
		p.setAttributeNS(null, 'stroke', s.color);
		p.setAttributeNS(null, 'fill', 'none');
		p.setAttributeNS(null, 'stroke-width', s.width);
		p.setAttributeNS(null, 'stroke-linejoin', s.linejoin || 'round');
		p.setAttributeNS(null, 'opacity', s.opacity || 1);

		s.resource && p.setAttributeNS(null, 'stroke', 'url(#' + s.resource + ')');
	},
	fill : function(){

	}
}));
