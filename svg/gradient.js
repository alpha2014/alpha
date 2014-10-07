SVG.add('Gradient', Al.createClass('Gradient', {
	construct: function(type){
        var grad = document.createElementNS(SVG.xmlns, 'linearGradient');
        grad.setAttributeNS(null, 'id', 'gradient');
        grad.setAttributeNS(null, 'x1', '0%');
        grad.setAttributeNS(null, 'y1', '0%');

        if( type == 'horizon' ){
	        grad.setAttributeNS(null, 'x2', '100%');
	        grad.setAttributeNS(null, 'y2', '0%');	
        }else{
	        grad.setAttributeNS(null, 'x2', '0%');
	        grad.setAttributeNS(null, 'y2', '100%');
        }

        this.resource = this.gradient = grad;
	},
	addStop : function( pos, color ){
        var stopTop = document.createElementNS(SVG.xmlns, 'stop');
        stopTop.setAttributeNS(null, 'offset', pos + '%');
        stopTop.setAttributeNS(null, 'stop-color', color);
        this.gradient.appendChild(stopTop);
	}
}));
