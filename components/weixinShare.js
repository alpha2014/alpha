// {
//     img_width: 300,
//     img_height: 300,
//     img_url: 'http://shushuo.baidu.com/act/webtrend/img/weixin_pic.jpg',
//     link: 'http://shushuo.baidu.com/act/webtrend/',
//     desc: '2014Q2百度移动互联网发展趋势报告',
//     title: '2014Q2百度移动互联网发展趋势报告'
// }
Al.Com.WeixinShare = Al.createClass('WeixinShare', {

    construct: function(param){
        this.param = param;
        var self = this;
        document.addEventListener('WeixinJSBridgeReady', function(e){
            self.share();
        });
    },

    setParam: function(param){
        this.param = param;
    },

    shareTo: function(des, invoke){
        var self = this; 
        WeixinJSBridge.on('menu:share:' + des, function(){
            WeixinJSBridge.invoke(invoke, self.param, self.execShareCallback);
        });
    },

    share: function(){
        this.shareTo('timeline', 'shareTimeline');
        this.shareTo('appmessage', 'sendAppMessage');
    },

    addShareCallback: function(func){
        var cb = this.shareCallback = this.shareCallback || [];
        cb.push(func);
    },

    execShareCallback: function(){
        this.shareCallback.forEach(function(f, i){
            f();
        });
    }

});