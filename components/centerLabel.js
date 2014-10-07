Al.Com.CenterLabel = Al.createClass('CenterLabel', {
	construct: function(param){
        var con = param.container;
        var w = con.width();
        var h = con.height();

        var l = this.label = $('<div>' + param.html + '</div>').css('position', 'absolute').css(param.style||{}).appendTo(con);

        this.label.css({          
            left: ((w - l.width()) / 2) + 'px',
            top: ((h - l.height()) / 2) + 'px'
        });

        if(param.className){
            this.label.addClass(param.className);
        }
	},
	getLabel: function(){
		return this.label;
	}
});