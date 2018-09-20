class EventEmitter {
	constructor() {
		this.eventHub = {};
	}
	emit(eventName, ...args) {
		const listeners = this.eventHub[eventName];
		if(listeners) {
			listeners.forEach(listener => {
				listener(...args);
			});
		}
	}
	on(eventName, fn) {
		let listeners = this.eventHub[eventName]
		if(!listeners) {
			this.eventHub[eventName] = listeners = [];
		}
		listeners.push(fn);
	}
	off(eventName, fn) {
		const listeners = this.eventHub[eventName];
		let idx;
		if(listeners && (idx = listeners.indexOf(fn)) >= 0) {
			listeners.splice(idx, 1);
		}
	}
}
