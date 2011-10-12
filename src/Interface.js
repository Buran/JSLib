(function() {
	'use strict';
	var
		//String, Number, Boolean, Array, Function, RegExp
		standardObjects = ['', 0, true, [], function(){}, /foo/],

		checkVariable = function (v, type) {
			var standardObject,
				i = 0,
				l = standardObjects.length,
				standardType = (v === null || typeof v === 'undefined') && v;
			if (!(type instanceof Array)) {
				type = [type];
			}
			while (standardType === false && i < l) {
				standardObject = standardObjects[i++];
				if (v.constructor === standardObject.constructor) {
					standardType = standardObject.constructor;
				}
			}
			return type.some(function(el) {
				return standardType !== false ? standardType === el : v instanceof el;
			});
		},

		checkInterface = function (iface, args) {
			var argsCnt = args.length, i, l;
			// Removed checking arguments count to allow optional parameters
			/*if (argsCnt !== iface.length) {
				return new TypeError('interface arguments count and passed arguments mismatch');
			}*/
			for (i = 0; i < argsCnt; i++) {
				if (!checkVariable(args[i], iface[i])) {
					return new TypeError('argument (' + i + ') type and interface type mismatch');
				}
			}
		}
	;

	Function.prototype.interface = function() {
		var newFunc;
		if (this.__interface) {
			this.__interface.push(arguments);
			return this;
		}
		newFunc = function() {
			var i, l, err;
			for (i = 0, l = newFunc.__interface.length; i < l; i++) {
				err = checkInterface(newFunc.__interface[i], arguments);
				if (!(err instanceof TypeError)) {
					return newFunc.__originalFunc.apply(this, Array.prototype.splice(arguments, 0));
				}
			}
			throw err;
		}
		;
		newFunc.__interface = [arguments];
		newFunc.__originalFunc = this;
		return newFunc;
	};

})();
