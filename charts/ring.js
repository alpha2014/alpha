AC.Ring = Alpha.createClass('Ring', {
    extend: AC.Chart,
    construct : function(container, param){
        this.callBase(container, param);

        this.centerX = this.outerWidth/2;
        this.centerY = this.outerHeight/2;

        this.initComponent();
    },

    initComponent: function(){
        this.addContainer();
        this.addSVG();
        this.addBackRing();
        this.addFrontRing();
        this.addLabel();
    },

    addContainer: function(){
        this.innerContainer = $('<div class="ring-container"></div>').css({
            position: 'relative',
            width: this.outerWidth + 'px',
            height: this.outerHeight + 'px'
        }).css({
            'display': '-webkit-box',
            '-webkit-box-pack': 'center',
            '-webkit-box-align': 'center'
        }).appendTo(this.container);
    },

    addSVG: function(){
        this.svg = new SVG.Paper(this.innerContainer[0]);
    },

    addLabel: function(){
        new Al.Com.CenterLabel({
            container: this.innerContainer,
            html: this.param.label,
            style: this.param.labelStyle
        });
    },

    addRing: function(color){
        var param = this.param;
        this.radius = param.radius || (this.outerWidth/2-param.width);
        var circle = this.circle = new Al.SVG.Circle(this.centerX, this.centerY, this.radius);
        circle.stroke({
            color : color,
            width : param.width
        });

        return circle;
    },

    addBackRing: function(){
        this.backRing = this.addRing(this.param.backColor);
        this.svg.addShape( this.backRing );
    },

    addFrontRing: function(){
        var param = this.param;
        var circle = this.FrontRing = this.addRing(param.color);

        var length = this.radius * Math.PI * 2;
        circle.shape.style.strokeDasharray = length + ' ' + length; 
        circle.shape.style.strokeDashoffset = length;

        var anim = param.animation;
        circle.shape.getBoundingClientRect();
        circle.shape.style.webkitTransition = 'stroke-dashoffset ' + anim.duration + 'ms ' + ( anim.ease || 'ease' ) + ' ' + (anim.delay||0) + 'ms';

        this.svg.addShape( circle );  

        circle.shape.addEventListener('webkitTransitionEnd', function(ev){
            ev.stopPropagation();
            anim.onAnimationEnd();
        }, false);
    },

    update : function(){
        this.circle.shape.style.strokeDashoffset = Math.PI * (360 - this.param.angle)/360 * 2 * this.radius;
    }
});