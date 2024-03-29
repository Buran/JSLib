var elements = (function(jQuery) {
	var
		activeElement = false,
		list = []
	;
	return {

		activeElement: function() {
			return activeElement;
		}.overload(function(element) {
			list.some(function(el) {
				return el === element[0];
			}) && (activeElement = element[0]);
		}),

		reset: function() {
			activeElement = false;
		},

		add: function(element) {
			if (!element || !element.length) {
				return;
			}
			!list.some(function(el) {
				return el === element[0];
			}) && list.push(element[0]);
		}.interface(jQuery),

		remove: function(element) {
			var i = list.indexOf(element[0]);
			if (i === -1) {
				list.splice(i, 1);
			}
		}.interface(jQuery)

	};
})(jQuery);
