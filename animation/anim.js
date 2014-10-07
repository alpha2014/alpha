window.requestAnimFrame = (function(){
    return  window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        function( callback ){
        window.setTimeout(callback, 1000 / 60);
    };
})();


Al.Anim = Alpha.createClass('Anim', {
    construct : function(param){
        this.param = param;

        
        this.from = param.from;
        this.to = param.to;
        this.backwards = !!param.backwards;
        this.render = param.render;
        this.easeFunc = param.ease || Al.Ease.easeOutBack;

        this.componentsCount = param.componentsCount;
        this.dur = param.dur;
        this.delay = param.delay || 0;
        
        this.stopped = false; 
    },

    init: function(){
        var a = this.timeLength = this.param.map(function(obj){
            return obj.dur + obj.delay;
        }).max();
        console.log(a);
    },

    start : function(){
        var self = this;
        this.startTime = +new Date();

        var frame = function(){
            var curTime = +new Date() - self.startTime;

            var params = [], param;
            var attr, i, f, d,
                count = self.componentsCount;

            for(i = 0; i < count; i++){
                if( curTime > (d=self.delay * (self.backwards?count-i-1:i)) && curTime < d+self.dur ){
                    param = {};
                    for(attr in self.to){
                        f = self.from[attr];
                        param[attr] = self.easeFunc(curTime-d, f, (self.to[attr] - f), self.dur);
                    }
                }else if(curTime < d){
                    param = self.from;
                }else{
                    param = self.to;
                }

                params.push(param);
            }

            if( curTime >= self.dur + (count-1) * self.delay ){
                self.stopped = true;
            }

            self.render(params);
        }

        function loop(){
            if(!self.stopped){
                requestAnimFrame(loop);
                frame();
            }
        }
        loop();
    }
});