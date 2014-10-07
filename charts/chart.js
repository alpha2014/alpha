window.AC = Alpha.Charts = Alpha.Charts || {
	name : 'Alpha Charts',
	version : '1.0.0'
};

AC.Chart = Al.createClass('Chart', {
	construct: function(container, param){
		this.container = $(container);
		this.param = param = param || {};
		this.outerWidth = container.clientWidth;
		this.outerHeight = container.clientHeight;

		this.container.stopTransitionBubble();
	}
});