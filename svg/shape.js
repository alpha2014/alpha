/*
 * container子类必须拥有box属性，表示容器元素
 */

SVG.add('Shape', Al.createClass('Shape', {
	update: function(){
		/* to be implemented */
	},
	__after: function(){
		this.clearStyle();
	},
	stroke : function( style ){
		var p = this.shape,
			s = style;

        p.setAttributeNS(null, 'stroke', s.color);
        p.setAttributeNS(null, 'stroke-width', s.width);
        p.setAttributeNS(null, 'stroke-linejoin', s.linejoin || 'round');
        p.setAttributeNS(null, 'opacity', s.opacity || 1);

        s.resource && p.setAttributeNS(null, 'stroke', 'url(#' + s.resource + ')');

        return this;
	},

	fill : function(color){
		this.shape.setAttributeNS(null, 'fill', color);
		return this;
	},

	clearStyle: function(){
		this.shape.setAttributeNS(null, 'fill', 'none');
		this.shape.setAttributeNS(null, 'stroke', 'none');

		return this;
	}
}));