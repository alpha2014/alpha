SVG.add('Paper', Al.createClass('Paper', {
	extend: SVG.Container,
	construct: function(container){
        this.ns = SVG.xmlns;
        this.container = container;
        var width = container.clientWidth;
        var height = container.clientHeight;

        this.init( width, height );
        this.def();
	},
	init : function( width, height ){
        var svg = this.box = this.svg = document.createElementNS( this.ns, 'svg' );
        this.setRect( width, height );
        this.container.appendChild(svg);
	},

	setRect : function( width, height ){
		var svg = this.svg;
        svg.setAttributeNS( null, 'viewBox', '0 0 ' + width + ' ' + height );
        svg.setAttributeNS( null, 'width', width );
        svg.setAttributeNS( null, 'height', height );
	},

	addShape : function( shape ){
		this.box.appendChild( shape.shape );
	},

	def : function(){
    	this.defs = document.createElementNS(this.ns, 'defs');
    	this.svg.appendChild(this.defs);
	},

	addDef : function(def){
		this.defs.appendChild( def.resource );
	}
}));