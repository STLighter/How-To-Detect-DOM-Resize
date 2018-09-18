class ScrollResizeObserver extends EventEmitter {
	constructor(el) {
		super();
		this.el = el;
		this._setStyle();
		this._injectObserver();
	}
	destroy() {
		this._removeObserver();
		this.el = null;
	}
	_setStyle() {
		const el = this.el;
		const style = window.getComputedStyle(el);
		if(style.position === 'static') {
			el.style.position = 'relative';
		}
	}
	_injectObserver() {
		const el = this.el;
		const containerCSS = 'display: block; position: absolute; top: 0; left: 0; width: 100%; height: 100%; padding: 0; margin: 0; overflow: scroll; opacity: 0; visibility: hidden; z-index: -1000; pointer-events: none;';
		const triggerCSS = 'display: block; position: absolute; top:0; left: 0;';
		const expandContainer = this.expandContainer = document.createElement('div');
		const shrinkContainer = this.shrinkContainer = document.createElement('div');
		expandContainer.style.cssText = shrinkContainer.style.cssText = containerCSS;
		const expandTrigger = this.expandTrigger = document.createElement('div');
		const shrinkTrigger = this.shrinkTrigger = document.createElement('div');
		expandTrigger.style.cssText = shrinkTrigger.style.cssText = containerCSS;
		shrinkTrigger.style.width = shrinkTrigger.style.height = '200%';
		expandContainer.appendChild(expandTrigger);
		shrinkContainer.appendChild(shrinkTrigger);
        el.appendChild(expandContainer);
        el.appendChild(shrinkContainer);
		this._resetTrigger();
		expandContainer.onscroll = () => {
        	this.emit('resize');
        	this._resetTrigger();
        }
        shrinkContainer.onscroll = () => {
        	this.emit('resize');
        	this._resetTrigger();
        }
	}
	_removeObserver() {
		const el = this.el,
		expandContainer = this.expandContainer,
		shrinkContainer = this.shrinkContainer;
		el.removeChild(expandContainer);
		el.removeChild(shrinkContainer);
		this.el = this.expandContainer = this.shrinkContainer = this.expandTrigger = this.shrinkTrigger = null;
	}
	_resetTrigger() {
		const expandContainer = this.expandContainer,
		shrinkContainer = this.shrinkContainer,
		expandTrigger = this.expandTrigger;
		const esw = expandContainer.scrollWidth,
		esh = expandContainer.scrollHeight,
		eow = expandContainer.offsetWidth,
		eoh = expandContainer.offsetHeight,
		ssw = shrinkContainer.scrollWidth,
		ssh = shrinkContainer.scrollHeight;

		console.log('reset', esw, esh, eow, eoh, ssw, ssh);
		expandContainer.scrollLeft = esw;
		expandContainer.scrollTop = esh;
		expandTrigger.style.width = eow + 1 + 'px';
		expandTrigger.style.height = eoh + 1 + 'px';
		shrinkContainer.scrollLeft = ssw;
		shrinkContainer.scrollTop = ssh;
	}
}