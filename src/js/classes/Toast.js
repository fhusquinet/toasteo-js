export default class Toast {

    /**
     * Create a new Toast instance.
     *
     * @param {string} message
     * @param {string} type
     */
    constructor(message, type = null, className = '') {
        this.instance = Math.random().toString(36);
        this.element = null;
        this.timeout = null;

        this.create(message, type, className);
    }

    create(message, type, className = '') {
        this.type = type;
        this.element = document.createElement('div');
        this.element.innerHTML = message;
        if ( className ) {
            this.element.className = className;
        }

        return this;
    }

    insert(container) {
        document.body.insertBefore(this.element, container);
    }

    close(className, duration) {
        return new Promise((resolve, reject) => {
            this.element.className += ' ' + className;
            setTimeout(() => {
                this.removeElement();
                resolve();
            }, duration);
        });
    }

    removeElement()
    {
        this.element.parentNode.removeChild(this.element);
        this.element = null;
    }

    remove() {
        return new Promise((resolve, reject) => {
            this.removeElement();
            resolve();
        });
    }

}