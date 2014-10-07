SVG.add('Polyline', Al.createClass('Polyline', {
	extend: SVG.Shape,
	construct: function(points){
		var p = points,
			l = p.length,
			coords = 'M ' + p[0][0] + ', ' + p[0][1],
			cur;
		
		for( var i = 1; i < l; i++ ){
			cur = p[i];
			coords += ' L ' + cur[0] + ', ' + cur[1];
		}

        var path = document.createElementNS(SVG.xmlns, 'path');
        path.setAttributeNS(null, 'd', coords);

        this.shape = this.path = path;

        this.clearStyle();
	},
}));
