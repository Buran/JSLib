var elements = (function() {
	var
		activeElement,
		list = []
	;
	return {
		activeElement: function(element) {
			if (!arguments.length) {
				return activeElement;
			}
			if (list.indexOf(element[0]) !== -1) {
				activeElement = element;
			}
		},
		reset: function() {
			activeElement = false;
		},
		add: function(element) {
			if (!element || !element.length) {
				return;
			}
			element.each(function() {
				var element = this;
				!list.some(function(el) {
					return el === element;
				}) && list.push(element);
			});
		},
		remove: function(element) {
			var i = list.indexOf(element[0]);
			if (i === -1) {
				list.splice(i, 1);
			}
		}
	};
})();
