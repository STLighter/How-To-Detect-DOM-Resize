class MutationResizeObserver extends EventEmitter {
	constructor(el) {
        super();
        this.el = el;
        this.width = el.offsetWidth;
        this.height = el.offsetHeight;
        this.detect = this.detect.bind(this);
        this.mutationsObserver = new MutationObserver(this.detect);
        this.mutationsObserver.observe(document, {
            attributes: true,
            childList: true,
            characterData: true,
            subtree: true
        });
        document.addEventListener('transitionend', this.detect);
        window.addEventListener('resize', this.detect);
    }
    detect() {
        const { offsetWidth, offsetHeight } = this.el;
        if(offsetWidth !== this.width || offsetHeight !== this.height) {
            this.width = offsetWidth;
            this.height = offsetHeight;
            this.emit('resize');
        }
    }
	destroy() {
        document.removeEventListener('transitionend', this.detect);
        window.removeEventListener('resize', this.detect);
        this.mutationsObserver.disconnect();
        this.mutationsObserver = null;
		this.el = null;
	}
}