var Namespace = function(namespace) {
	var o = window, undef;
	namespace.split('.').forEach(function(el) {
		//window.console && console.log(o[el]);
		if (o[el] !== undef && (typeof o[el] !== 'object' || !(o[el] instanceof Object))) {
			throw new Error('Attempt create namespace over existed variable');
		} else {
			if (o[el] === undef) {
				o[el] = {};
			}
			o = o[el];
		}
	});
	//window.console && console.log(o);
	return o;
};
