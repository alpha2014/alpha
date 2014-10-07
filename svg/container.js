/*
 * container子类必须拥有box属性，表示容器元素
 */

SVG.add('Container', Al.createClass('Container', {
	addShape : function( shape ){
		this.box.appendChild( shape.shape );
	}
}));