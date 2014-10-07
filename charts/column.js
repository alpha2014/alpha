/*
 * TODO
 * 1. series多组数据
 */

var Column = AC.Column = Alpha.createClass('Column', {
	extend : AC.Coordinate, 
	construct : function(container, param){
		this.callBase(container, param);
		this.updated = false;
		this.columns = [];
	},
	updateColumn : function(){
		var self = this,
			param = this.param,
			series = param.series,
			sl = series.length,
			colors = param.color,
			columnHeight = this.plot.height(),
			l = param.xAxis.categories.length,
			pace = this.plotWidth / l,
			pace2 = pace / 2,
			anim = param.animation;

		var columnWidth = this.param.plotOptions.column.width;
		series.forEach(function( entry, i ){
			var data = entry.data;
			data.forEach(function( val, j ){
				var p = {
						'position' : 'absolute',
						'background-color' : val.color || colors[ i ],
						'width' : columnWidth + 'px',
						'height' : columnHeight + 'px',
						'top' : columnHeight + 'px',
						'left' : ( pace2 + pace * j - columnWidth * (sl/2-i) ) + 'px',
						'-webkit-transform' : 'translate3d(0px, 0px, 0px)'
					};

				var col;
				if(!self.updated){
					col = $('<div class="column"></div>').appendTo( self.plot );
					self.columns.push(col);
				}else{
					col = self.columns[i*sl+j];
				}
				col.css( p );
				
				var translate = 'translate3d(0px, ' + self.measure( val.value || val ) + 'px, 0px)';
				if( anim.enabled ){
					setTimeout(function(){
						col.css({
							'-webkit-transition' : '-webkit-transform ' + anim.duration + 'ms ' + ( anim.ease || 'ease' ) + ' ' + ( (anim.delay||0) * j ) + 'ms',
							'-webkit-transform' : translate
						});
					}, 0);
				}else{
					col.css({
						'-webkit-transform' : translate
					});
				}

			});
		});
		self.updated = true;
	},
	update : function(){
		!this.updated && this.callBase();
		this.updateColumn();
	}
});