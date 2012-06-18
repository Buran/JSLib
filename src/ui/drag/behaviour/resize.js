Namespace('Behaviour').Resize = function(dragging, element) {

	var
		self = this,
		hResize = false,
		vResize = false
	;

	this.resizeEvent = new Event();
	this.hResizeEvent = new Event();
	this.vResizeEvent = new Event();

	element.mousemove(function(e) {
		if (elements.activeElement()) {
			return;
		}
		var
			pos = element.offset(),
			x = e.pageX - pos.left,
			y = e.pageY - pos.top
		;

		if (x <= 10 || x >= element.outerWidth() - 10) {
			hResize = x <= 10 ? Behaviour.WEST : Behaviour.EAST;
			//todo: move to event
			$('html').addClass('resizeX');
		} else {
			hResize = false;
			//todo: move to event
			$('html').removeClass('resizeX');
		}
	});
	element.mouseout(function(e) {
		if (elements.activeElement()) {
			return;
		}
		//todo: move to event
		$('html').removeClass('resizeX');
	});

	dragging.changePositionEvent(function(dx, dy) {
		if (hResize !== false) {
			self.hResizeEvent(hResize, dx);
		}
		if (vResize !== false) {
			self.vResizeEvent(vResize, dy);

			if (vResize !== false) {
				self.resizeEvent(hResize, vResize, dx, dy);
			}

		}
	});

	this.isActive = function() {
		return hResize !== false || vResize !== false;
	};

};
Behaviour.WEST = Behaviour.NORTH = -1;
Behaviour.EAST = Behaviour.SOUTH = 1;
