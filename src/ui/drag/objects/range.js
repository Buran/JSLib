/**
 * TODO: remove container from dependencies.
 */
var Range = function(element, options) {

	options = options || {};
	options.minSize = options.minSize || 0;
	options.position = options.position || 0;

	return new Controller(element, options.step, options.position, options.size);

	function Controller(element, step, position, size) {
		var
			presenter = new Presenter(element, step)
			, changeEvent = new Event()
		;
		presenter.setSize(size);
		presenter.setPosition(position);

		return {
			changeEvent: changeEvent,
			setPosition: function(value) {
				position = value;
				presenter.setPosition(value);
				changeEvent(position, size);
				return this;
			},
			getCorrectedSize: function (size) {
				if (options.minSize && size < options.minSize) {
					return options.minSize;
				}
				return size;
			},
			setSize: function(value) {
				size = this.getCorrectedSize(value);
				presenter.setSize(size);
				changeEvent(position, size);
				return this;
			},
			getSize: function() {
				return size;
			},
			getPosition: function() {
				return position;
			},
			getElement: function() {
				return presenter.getElement();
			}
		}

	}

	function Presenter(element, step) {
		var
			position = 0
			, size = 0
		;

		function render() {
			element.css({'left': position * step + 'px', width: size * step + 'px'});
		}

		return {
			setPosition: function(value) {
				position = value;
				render();
			},
			setSize: function(value) {
				size = value;
				render();
			},
			getElement: function() {
				return element;
			}
		}
	}

};
