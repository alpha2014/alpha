Alpha.Feature = {
    isWeiXin: function(){
    	var self = Alpha.Feature.isWeiXin;
        return self.attach = ('attach' in self) ? self.attach : (navigator.userAgent.toLowerCase().indexOf('micromessenger') >= 0);
    },
    shareWeibo: function(content, img){
    	var ch = (location.href.indexOf('?') > 0) ? '&' : '?';
		var url = location.href + ch + 'from=weibo';
		content = content || '';
		var pic = img? '&pic=' + img : '';
		location.href = 'http://service.weibo.com/share/share.php?url='+ encodeURIComponent(url) + '&title=' + content + pic;
    },
};