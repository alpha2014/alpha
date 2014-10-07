AC.Ruler = Al.createClass('Ruler', {
	construct: function(values, from, to){
		
		var l = values.length,
			min = values[ 0 ],
			max = values[ l - 1 ];
		var dur = max - min;
		var len = to - from;
		var unit = len / dur;



		var map = values.map(function( val, i ){
			return unit * ( val - min ) + from;
		});

		var start = map[ 0 ],
			end = map[ map.length - 1 ];

		this.values = values;
		this.map = map;
		this.max = max;
		this.min = min;
		this.dur = dur;
		this.from = from;
		this.to = to;
		this.length = len;
	}
});