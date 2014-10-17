AC.Pie = Alpha.createClass('Pie', {
    construct : function(container, param){

        this.container = container;

        this.param = {
            pie : {
                innerRadius : 0,
                radius : 0,
                increment : 0
            },
            animation : {
                duration : 0,
                components : {
                    delay : 50, //扇形动画间隔
                    backwards : true //是否逆时针播放
                }
            },
            series: []
        };

        this.param = Al.Utils.mix(this.param, param||{});
        this.param.animation.duration = 0;
        
        this.innerContainer = $('<div></div>')[0];
        this.pieCanvas = $('<canvas></canvas>')[0];

        var containerWidth = this.container.clientWidth;
        var containerHeight = this.container.clientHeight;

        $(this.innerContainer).css({
            width : containerWidth + 'px',
            height : containerHeight + 'px'
        });

        this.container.appendChild(this.innerContainer);
        this.sideLength = Math.min(containerWidth, containerHeight);

        var sideLength = this.sideLength;
        var canvas = this.pieCanvas;
        canvas.width = canvas.height = sideLength*2;
        this.pieCTX = canvas.getContext("2d");
        $(canvas).css({
            width: sideLength + 'px',
            height: sideLength + 'px'
        });

        var ctx = this.pieCTX;
        ctx.translate(this.sideLength, this.sideLength);
        ctx.rotate(-Math.PI/2);
        this.innerContainer.appendChild(this.pieCanvas);
    },

    fixSeries: function(afterParam, beforeParam){
        var delta = afterParam.series.length - beforeParam.series.length;
        if(delta > 0){
            for(var i = 0; i < delta; i++){
                beforeParam.series.push({
                    name: '',
                    data: []
                });
            }
        }
    },

    update : function(param){

        var beforeParam = this.param;
        var afterParam = this.afterParam = Al.Utils.copyJSON(param||beforeParam);

        this.fixSeries(afterParam, beforeParam);

        this.calAttrs(beforeParam);
        this.calAttrs(afterParam);

        var animation = afterParam.animation;
        var list = [];
        var self = this;
        afterParam.series.forEach(function(afterSerie, k){

            for (var i = afterSerie.data.length - 1; i >= 0; i--) {
                
                list.push({
                    from: {
                        innerRadius: beforeParam.pie.renderInnerRadius || 0,
                        radius: beforeParam.pie.renderRadius || 0,
                        increment: beforeParam.pie.renderIncrement || 0,
                        radian: beforeParam.series[k].data[i]&&beforeParam.series[k].data[i].radian || 0
                    },
                    to: {
                        innerRadius: afterParam.pie.renderInnerRadius,
                        radius: afterParam.pie.renderRadius,
                        increment: afterParam.pie.renderIncrement,
                        radian: afterSerie.data[i].radian
                    },
                    dur: animation.duration,
                    delay : animation.components.delay||0,
                });

            }

        });

        if(animation.duration > 0){
            var anim = new Al.Anim({
                list: list,
                backwards : animation.components.backwards,
                render : this.draw.bind(this)
            });
            anim.start();
        }else{
            var map = list.map(function(p){
                return p.to;
            });
            this.draw(map);
        }


        this.param = afterParam;
    },

    draw : function(params){
        var ctx = this.pieCTX;

        ctx.clearRect(-2000, -2000, 4000, 4000);

        var fan, radian, p, arr, startRadian = 0, series = this.afterParam.series;
        var innerRadius, outerRadius, increment;
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
                increment = p.increment;
                radian = p.radian;

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

    calAttrs : function(param){
        var pie = param.pie;

        pie.renderInnerRadius = pie.innerRadius * 2;
        pie.renderRadius = pie.radius * 2;
        pie.renderIncrement = pie.increment * 2;

        var arr = param.series;
        var ring;
        var sum;
        var fan;
        var i, j, l;

        for(i = 0; i < arr.length; i++){
            ring = arr[i].data;
            sum = ring.sum('data');
            for (j = 0, l = ring.length; j < l; j++) {
                 fan = ring[j];
                 fan.percent = fan.data/sum;
                 fan.angle = fan.percent * 360;
                 fan.radian = fan.percent * Math.PI * 2;
            }
        }

    }

});