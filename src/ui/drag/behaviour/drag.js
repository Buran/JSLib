Namespace('Behaviour').Drag = function(elements, document, element) {
	var
		startX = false,
		startY = false,
		active = false,
		self = this
	;

	self.changePositionEvent = new Event();
	self.startDragEvent = new Event();
	self.finishDragEvent = new Event();

	function handleBehaviour(e) {
		var dx, dy;
		dx = e.pageX - startX;
		dy = e.pageY - startY;
		startX = e.pageX;
		startY = e.pageY;
		self.mousemove(dx, dy);
		e.preventDefault();
		e.stopPropagation();
	}

	function finishBehaviour() {
		active = false;
		self.finishDragEvent();
		elements.reset();
		document.unbind('mouseup blur', finishBehaviour);
		document.unbind('mousemove', handleBehaviour);
	}

	function startBehaviour(e) {
		if (!elements.activeElement()) {
			elements.activeElement(element.filter(e.target));
			active = true;
			startX = e.pageX;
			startY = e.pageY;
			self.startDragEvent(startX, startY, e.pageX, e.pageY);
			e.preventDefault();
			document.bind('mouseup blur', finishBehaviour);
			document.bind('mousemove', handleBehaviour);
		}
	}

	element.bind('mousedown', startBehaviour);

	this.mousemove = function(dx, dy) {
		self.changePositionEvent(dx, dy);
	};

};
