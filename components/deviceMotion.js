Al.Com.DeviceMotion = Al.createClass('DeviceMotion', {
	construct: function(callback){

		function deviceMotionHandler(eventData) {
			var acceleration = eventData.accelerationIncludingGravity;
			if (Math.abs(acceleration.x) < 2 && Math.abs(acceleration.y) < 2) {
				return false;
			}

			callback && callback(acceleration);
		}

		window.addEventListener('devicemotion', deviceMotionHandler, false);
	}
});

Al.Com.DeviceMotion.test = function(){
	return !!window.DeviceMotionEvent;
}