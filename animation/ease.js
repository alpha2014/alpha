Al.Ease = {
    easeOutQuart: function(t, b, c, d) {
        return -c * ((t = t / d - 1) * t * t * t - 1) + b;
    },
    easeOutBack: function(t, b, c, d, s) {
        if (s == undefined) s = 1.70158;
        return c * ((t = t / d - 1) * t * ((s + 1) * t + s) + 1) + b;
    },
    ease: function(t, b, c, d) {
        return Al.Ease.easeInOutCubic(t, b, c, d);
    },
    easeInOutCubic: function(t, b, c, d) {
        if ((t /= d / 2) < 1) return c / 2 * t * t * t + b;
        return c / 2 * ((t -= 2) * t * t + 2) + b;
    },
};