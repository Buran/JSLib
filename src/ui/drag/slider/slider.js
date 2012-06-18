var Slider = function(element, width, step) {
	var
		ranges = [],
		binding = 'left'
	;
	element.css('width', width * step + 'px');

	/**
	 * Откорректировать размер элемента, чтобы он не перекрывал, соседний справа элемент.
	 */
	function correctSize(range, size) {
		var
			i = ranges.indexOf(range)
			, nextRangeDistance
		;
		if (i !== ranges.length - 1) {
			nextRangeDistance = ranges[i + 1].getPosition() - range.getPosition();
			if (nextRangeDistance < size) {
				size = nextRangeDistance;
			}
		}
		return size;
	}

	/**
	 * Откорректировать левую координату элемента, чтобы она не перекрывала соседний слева элемент.
	 */
	function correctPosition(range, position) {
		var i = ranges.indexOf(range);
		if (i > 0 && ranges[i - 1].getPosition() + ranges[i - 1].getSize() > position) {
			position = ranges[i - 1].getPosition() + ranges[i - 1].getSize();
		}
		if (i >= 0 && i < ranges.length - 1 && ranges[i + 1].getPosition() < position + range.getSize()) {
			position = ranges[i + 1].getPosition() - range.getSize();
		}
		return position;
	}

	return {
		addRange: function(range) {
			var i, l;
			for (i = 0, l = ranges.length; i < l; i++) {
				if (ranges[i].getPosition() > range.getPosition()) {
					i = i - 1;
					break;
				}
			}
			ranges.splice(i < 0 ? 0 : i, 0, range);
		},
		bindRight: function() {
			binding = 'right';
		},
		bindLeft: function() {
			binding = 'left';
		},
		setRangeSize: function(range, size) {

			var correctedSize = size
				, position
				, correctedPosition
			;

			if (binding === 'right') {
				if (range.getSize() + range.getPosition() >= size) {
					position = range.getSize() + range.getPosition() - size;
				} else {
					position = 0;
					correctedSize = range.getSize() + range.getPosition();
				}
				correctedPosition = correctPosition(range, position);
				size = correctedSize + (position - correctedPosition);
				range.setSize(size).setPosition(correctedPosition);
			} else {
					if (size + range.getPosition() > width) {
					size = width - range.getPosition();
				}
				range.setSize(correctSize(range, size));
			}
		},
		setRangePosition: function(range, position) {
			if (position < 0) {
				position = 0;
			} else if (range.getSize() + position > width) {
				position = width - range.getSize();
			}
			range.setPosition(correctPosition(range, position));
		}
	};
};