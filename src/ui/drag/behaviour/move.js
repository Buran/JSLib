Namespace('Behaviour').Move = Behaviour.Drag.extend(function(elements, document, element, options) {
	var self = new this.parent.constructor(elements, document, element)
		, accumulatedX = 0
		, accumulatedY = 0
	;

	self.startDragEvent(function() {
		accumulatedX = accumulatedY = 0;
	});

	self.mousemove = function(dx, dy) {
		accumulatedX += dx;
		accumulatedY += dy;
		if (Math.abs(accumulatedX) > options.stepX || Math.abs(accumulatedY) > options.stepY) {
			dx = Math.round(accumulatedX / options.stepX);
			dy = Math.round(accumulatedY / options.stepY);
			self.changePositionEvent(dx,  dy);
			accumulatedX -= dx * options.stepX;
			accumulatedY -= dy * options.stepY;
		}
	}.interface(Number, Number);

	return self;
}.interface(Object, jQuery, jQuery, Object));
