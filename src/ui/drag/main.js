$ && $(document).ready(function() {

	var
		step = 10
		, container = $('#slider')
		, options = {
			step: step,
			position: 0,
			size: 5,
			minSize: 3
		}
		, slider = new Slider(container, 15 * 2, step)
		, range1 = new Range($('<li><span></span><span></span><strong></strong></li>'), options)
		//, range2 = new Range($('<li><span></span><span></span></li>'), extend(options, {position: 10}))
	;

	$('#slider ul').append(range1.getElement())//.append(range2.getElement());

	range1.changeEvent(function (position, size) {
		var day = Math.floor((position + 8) / 24);

		var halfHourFrom = position % 2
			, hourFrom = 8 + (position - halfHourFrom) / 2
			, halfHourTo = (position + size) % 2
			, hourTo = 8 + ((position + size) - halfHourTo) / 2
		;

		range1.getElement().find('strong').html(hourFrom + ':' + (halfHourFrom ? '30' : '00') + '&ndash;' + hourTo + ':' + (halfHourTo ? '30' : '00'));
	})
//	range2.changeEvent(function (position, size) {
//		var day = Math.floor((position + 8) / 24);
//		$('#log').html('day: ' + day + ' ' + position + ':' + (size + position));
//	})

	elements.add(range1.getElement());
	//elements.add(range2.getElement());

	var editableRange1 = new EditableRange($(document.body), slider, range1, {
		step: step
	});
//	var editableRange2 = new EditableRange($(document.body), slider, range2, {
//		step: step
//	});

//	range2.getElement().css('background', 'red');

	drawTicks(15 * 2, step);
	function drawTicks(count, step) {
		var container = $('#slider')
			, tick = $('<div class="tick"></div>');
		for (var i = 0; i < count; i++) {
			container.append(tick.clone().css({left: i * step + 'px'}));
		}
	}

});
