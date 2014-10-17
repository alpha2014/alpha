window.requestAnimFrame = (function(){
    return  window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        function( callback ){
        window.setTimeout(callback, 1000 / 60);
    };
})();

// list elements
// {
//     from : {},
//     to : {},
//     dur : 500,
//     delay : 200 || 0
// }

Al.Anim = Alpha.createClass('Anim', {
    construct : function(param){
        this.param = param;

        this.backwards = !!param.backwards;
        this.render = param.render;
        this.easeFunc = param.ease || Al.Ease.ease;

        this.count = param.list.length;

        this.longest = param.list.map(function(entry, i){
            return entry.delay + entry.dur;
        }).max();
        this.stopped = false;
    },

    start : function(){
        var self = this;
        this.startTime = +new Date();

        var frame = function(){
            var curTime = +new Date() - self.startTime;

            var params = [], param;
            var attr, i, f, d, tmp,
                count = self.count;
            var list = self.param.list;

            for(i = 0; i < count; i++){
                tmp = list[i];

                if( curTime > tmp.delay && curTime < tmp.delay+tmp.dur ){
                    param = {};
                    for(attr in tmp.to){
                        f = tmp.from[attr];
                        param[attr] = self.easeFunc(curTime-tmp.delay, f, (tmp.to[attr] - f), tmp.dur);
                    }
                }else if(curTime <= tmp.delay){
                    param = tmp.from;
                }else{
                    param = tmp.to;
                }

                params.push(param);
            }

            if( curTime > self.longest ){
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