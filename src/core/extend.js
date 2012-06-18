if (!Function.prototype.extend) {
	Function.prototype.extend = function(Child, Extended) {
		var F = function() {
		};
		F.prototype = this.prototype;
		Child.prototype = new F();
		Child.prototype.constructor = Child;
		Child.prototype.parent = this.prototype;
		if (Extended && 'object' === typeof Extended) {
			var field;
			for (field in Extended){
				if (Extended.hasOwnProperty(field)) {
					Child.prototype[field] = Extended[field];
				}
			}
		}
		return Child;
	};
}

function extend(Child, Extended) {
	var field;
	for (field in Child){
		if (Child.hasOwnProperty(field) && typeof Extended[field] === 'undefined') {
			Extended[field] = Child[field];
		}
	}
	return Extended;
}