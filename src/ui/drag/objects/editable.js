var EditableRange = function(body, slider, range, options) {

	slider.addRange(range);

	var move = new Behaviour.Move(
			elements,
			$(window.document),
			range.getElement(),
			{
				stepX: options.step,
				stepY: 0
			}
		)
		, resize = new Behaviour.Resize(move, range.getElement())
	;

	return new Controller(move, resize, slider, range);

	function Controller(move, resize, slider, range) {
		var
			overflowPosition = 0,
			overflowSize = 0
		;

		move.startDragEvent(function() {
			if (!resize.isActive()) {
				overflowPosition = overflowSize = 0;
				body.addClass('drag');
			}
		});

		move.changePositionEvent(function(dx, dy) {
			if (!resize.isActive()) {
				var newPosition = range.getPosition() + dx + overflowPosition;
				slider.setRangePosition(range, newPosition);
				overflowPosition = newPosition - range.getPosition();
			}
		});

		move.finishDragEvent(function() {
			if (!resize.isActive()) {
				body.removeClass('drag');
			}
		});

		resize.hResizeEvent(function(hResize, d) {
			hResize === Behaviour.WEST ? slider.bindRight() : slider.bindLeft();
			var newSize = range.getSize() + d * hResize + overflowSize;
			slider.setRangeSize(range, range.getCorrectedSize(newSize));
			overflowSize = newSize - range.getSize();
		});
	}
};
