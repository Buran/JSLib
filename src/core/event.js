function Event() {
	var handlers = [];
	return function(handler) {
		var args;
		if (typeof handler === 'function') {
			handlers.push(handler);
		} else {
			args = arguments;
			handlers.forEach(function(handler) {
				handler.apply(this, Array.prototype.slice.call(args));
			});
		}
	};
}
