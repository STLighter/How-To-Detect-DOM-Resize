class ResizeObserverHiddenObject extends EventEmitter {
	constructor(el) {
		super();
		this.el = el;
		this._setStyle();
		this._injectHiddenObject();
	}
	destroy() {
		this._removeHiddenObject();
		this.el = null;
	}
	_setStyle() {
		const el = this.el;
		const style = window.getComputedStyle(el);
		if(style.position === 'static') {
			el.style.position = 'relative';
		}
	}
	_injectHiddenObject() {
		const el = this.el;
		const CSS = 'display: block; position: absolute; top: 0; left: 0; width: 100%; height: 100%; padding: 0; margin: 0; border: none; opacity: 0; visibility: hidden; z-index: -1000; pointer-events: none;';
		const obj = this.obj = document.createElement('object');
		obj.style.cssText = CSS;
		obj.tabIndex = -1;
        obj.type = "text/html";
        obj.onload = () => {
        	obj.contentWindow.onresize = () => {
        		this.emit('resize');
        	}
        }
        el.appendChild(obj);
	}
	_removeHiddenObject() {
		const el = this.el, obj = this.obj;
		el.removeChild(obj);
		this.obj = null;
	}
}