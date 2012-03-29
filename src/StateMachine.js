var JSLib = (function(module) {
	module.StateMachine = function(stateCheckHandler, states) {
		var currentState = false;
		states = states || [];
		if (typeof states === 'string') {
			states = states.split(' ');
		}

		stateCheckHandler && states.some(function(state) {
			if (stateCheckHandler(state)) {
				currentState = state;
				return true;
			}
		});

		return {
			state: function(newState) {
				if (arguments.length === 0) {
					return currentState;
				}
				newState = newState || false;
				if (currentState === newState) {
					return;
				}
				if (newState && !states.some(function(state) {
					return newState === state;
				})) {
					states.push(newState);
				}
				currentState/* && this.publish('unset', currentState)*/;
				newState/* && this.publish('set', newState)*/;
				currentState = newState;
				return this;
			}.interface([String, Boolean]).interface(),

			clear: function() {
				return this.state(false);
			}
		};
	};
	return module;
}(JSLib || {}));
