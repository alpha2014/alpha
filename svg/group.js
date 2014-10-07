SVG.add('Group', Al.createClass('Group', {
	construct: function(){
		var g = document.createElementNS(SVG.xmlns, 'g');
		this.group = this.box = this.shape = g;
	},
	addShape : function( shape ){
		this.box.appendChild( shape.shape );
	}
}));