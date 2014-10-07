AC.Pie = Alpha.createClass('Pie', {
    construct : function(container, param){
        this.innerRadius = param.pie.innerRadius*2;
        this.radius = param.pie.radius*2;
        this.increment = param.pie.increment*2;

        this.container = container;
        this.param = param;
        
        this.innerContainer = $('<div></div>')[0];
        this.pieCanvas = $('<canvas></canvas>')[0];
    },
    update : function( param ){
        this.container.innerHTML = '';
        param = param || this.param;
        var containerWidth = this.container.clientWidth;
        var containerHeight = this.container.clientHeight;

        $(this.innerContainer).css({
            width : containerWidth + 'px',
            height : containerHeight + 'px'
        });
        this.container.appendChild(this.innerContainer);
        this.sideLength = Math.min(containerWidth, containerHeight);

        this.init();
    },
    init : function(){
        var sideLength = this.sideLength;
        var canvas = this.pieCanvas;
        canvas.width = canvas.height = sideLength*2;
        $(canvas).css({
            width : sideLength + 'px',
            height : sideLength + 'px'
        });
        var ctx = this.pieCTX = canvas.getContext("2d");
        ctx.translate(sideLength, sideLength);
        ctx.rotate(-Math.PI/2);

        this.ctx = ctx;
        this.calAttrs(this.param.series);

        this.innerContainer.appendChild(canvas);
        var animation = this.param.animation;

        var series = this.param.series;
        var count = 0;
        for(var i=0; i<series.length; i++){
            count += series[i].data.length;
        }

        this.angles = this.param.series.map(function(entry, i){
            return entry.radian;
        });

        var anim = new Al.Anim({
            from : {
                innerRadius : 0,
                radius : 0,
                radian : 0
            },
            to : {
                innerRadius : this.innerRadius,
                radius : this.radius
            },
            dur : animation.duration,
            delay : animation.components.delay,
            backwards : animation.components.backwards,
            componentsCount : count,
            render : this.draw.bind(this)
        });

        anim.start();
    },
    draw : function(params){
        var ctx = this.ctx;
        // ctx.strokeStyle = '#FFF';
        // ctx.lineWidth = 1;

        ctx.clearRect(-2000, -2000, 4000, 4000);

        var fan, radian, p, arr, startRadian = 0, series = this.param.series;
        var innerRadius, outerRadius, increment = this.increment;
        for(var i = 0; i < series.length; i++){
            arr = series[i].data;
            startRadian = 0;
            for(var j = 0; j < arr.length; j++){
                ctx.save();

                fan = arr[j];
                radian = fan.radian;
                
                ctx.rotate(startRadian);

                ctx.beginPath();

                p = params[j];
                innerRadius = p.innerRadius;
                outerRadius = p.radius;

                innerRadius = (i == 0)? p.innerRadius : p.radius;
                outerRadius = (i == 0)? p.radius : p.radius + increment;

                ctx.arc(0, 0, innerRadius, 0, radian, false);
                ctx.arc(0, 0, outerRadius, radian, 0, true);
                // ctx.closePath();

                ctx.fillStyle = fan.color;
                ctx.fill();
                // ctx.stroke();
                startRadian += radian;
                ctx.restore();
            }
        }

    },
    calAttrs : function(arr){
        var ring;
        var sum;
        var fan;
        var i, j, l;
        for(i=0; i<arr.length; i++){
            ring = arr[i].data;
            sum = ring.sum('data');
            for (j = 0, l = ring.length; j < l; j++) {
                 fan = ring[j];
                 fan.percent = fan.data/sum;
                 fan.angle = fan.percent * 360;
                 fan.radian = fan.percent * Math.PI * 2;
            }
        }
    },
    // getAngles : function(){
    //     return this.angles;
    // }
});