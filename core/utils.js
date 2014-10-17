Alpha.Utils = {
    mix: function(t) {
        var a = arguments,
            isBoolean = typeof a[a.length - 1] == 'boolean',
            notCover = isBoolean ? a[a.length - 1] : false,
            len = isBoolean ? a.length - 1 : a.length;
        for (var i = 1; i < len; i++) {
            var x = a[i];
            for (var k in x) {
                if (!notCover || !t.hasOwnProperty(k)) {
                    t[k] = x[k];
                }
            }
        }
        return t;
    },

    parseURL: function(url){
        var param = (url || location.search).substr(1);
        var arr = param.split('&');
        var tmp, obj = {};
        for(var i = arr.length - 1; i >= 0; i--) {
            tmp = arr[i].split('=');
            obj[tmp[0]] = tmp[1];
        }
        return obj;
    },

    copyJSON: function(json){
        return JSON.parse(JSON.stringify(json));
    }
};

Array.prototype.sum = function(attr){
    var sum = 0;
    for (var i = 0, l = this.length; i < l; i++) {
        sum += attr ? this[i][attr] : this[i];
    }
    return sum;
}

Array.prototype.max = function(){
    return Math.max.apply({}, this);
}

Array.prototype.min = function(){
    return Math.min.apply({}, this);
}