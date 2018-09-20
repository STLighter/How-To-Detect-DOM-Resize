class NativeResizeObserver extends EventEmitter {
	constructor(el) {
		super()
		this.el = el;
		this.observer = new ResizeObserver(entries => {
			const targetEntry = this.entryFilter(entries);
			if(targetEntry) {
				this.emit('resize', targetEntry.contentRect);
			}
		});
		this.observer.observe(this.el);
	}
	entryFilter(entries) {
		return entries.filter(entry => entry.target === this.el)[0];
	}
	destroy() {
		this.observer.unobserve(this.el);
		this.observer.disconnect();
		this.observer = null;
		this.el = null;
	}
}