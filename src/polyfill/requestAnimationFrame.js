/*
requestAnimationFrame polyfill

http://paulirish.com/2011/requestanimationframe-for-smart-animating/
*/
(function() {
	var lastTime = 0, vendors = 'ms moz webkit o'.split(' '), i;
	for (i = 0; i < vendors.length && !window.requestAnimationFrame; ++i) {
		window.requestAnimationFrame = window[vendors[i] + 'RequestAnimationFrame'];
		window.cancelRequestAnimationFrame = window[vendors[i] + 'CancelRequestAnimationFrame'];
	}

	if (!window.requestAnimationFrame) {
		window.requestAnimationFrame = function(callback, element) {
			var
			currTime = new Date().getTime(),
			timeToCall = Math.max(0, 16 - (currTime - lastTime)),
			id = window.setTimeout(function() {
				callback(currTime + timeToCall);
			}, timeToCall)
			;
			lastTime = currTime + timeToCall;
			return id;
		};
	}
	if (!window.cancelAnimationFrame) {
		window.cancelAnimationFrame = function(id) {
			clearTimeout(id);
		};
	}
}());
