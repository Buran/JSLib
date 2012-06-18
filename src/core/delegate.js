if (!Function.prototype.createDelegate) {
	Function.prototype.createDelegate = function(obj, args, appendArgs){
		var method = this;
		return function() {
			var callArgs = args || arguments;
			if (appendArgs === true){
				callArgs = Array.prototype.slice.call(arguments, 0);
				callArgs = callArgs.concat(args);
			} else if ('number' === typeof appendArgs) {
				callArgs = Array.prototype.slice.call(arguments, 0); // copy arguments first
				var applyArgs = [appendArgs, 0].concat(args); // create method call params
				Array.prototype.splice.apply(callArgs, applyArgs); // splice them in
			}
			return method.apply(obj || window, callArgs);
		};
	};
}
