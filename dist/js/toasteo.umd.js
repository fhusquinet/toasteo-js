(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global.Toasteo = factory());
}(this, (function () { 'use strict';

    class Toast {

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

    class Toasteo {

        /**
         * Create a new Toasteo instance.
         *
         * @param {object} data
         */
        constructor(options) {
            let defaultClasses = {
                container: 'toast-container',
                default: 'toast',
                closing: 'toast--closing',
                creating: 'toast--creating',
                success: 'toast--success',
                error: 'toast--error',
                warning: 'toast--warning',
                info: 'toast--info'
            };
            let defaultOptions = {
                prependTo: document.body.childNodes[0],
                duration: 4000,
                animateOnRemoving: true,
                animationRemovingDuration: 400,
                animateOnCreation: true,
                closeOnClick: true,
                classes: defaultClasses
            };

            let classes = defaultClasses;
            if ( options && options.classes ) {
                classes = options.classes;
            }

            for ( var property in defaultClasses ) {
                if ( property in classes ) { continue; }
                classes[property] = defaultClasses[property];
            }

            if ( ! options ) {
                options = defaultOptions;
            } else {
                for ( var property in defaultOptions ) {
                    if ( property in options ) { continue; }
                    options[property] = defaultOptions[property];
                }
            }

            this.options = options;
            this.options.classes = classes;

            this.toasts = [];
        }

        create(message, type, options) {
            this.container = this.createContainer();

            let toast = new Toast(message, type, this.getToastClass(type));
            let index = this.toasts.length + 1;

            let className = toast.element.className;
            if (this.options.animateOnCreation) {
                toast.element.className = toast.element.className + ' ' + this.options.classes.creating;
            }
            this.container.prepend(toast.element);

            this.handleCreationAnimation(toast, className);
            this.handleClick(toast);
            this.handleDuration(toast);

            this.toasts.push(toast);

            return toast;
        }

        getToastClass(type) {
            let className = this.options.classes.default;
            if ( type ) {
                className += ' ' + this.options.classes[type];
            }
            return className;
        }

        handleCreationAnimation(toast, className) {
            if (this.options.animateOnCreation) {
                setTimeout(() => {
                    toast.element.className = className;
                }, 100);
            }
        }

        handleClick(toast) {
            if (this.options.closeOnClick) {
                toast.element.addEventListener('click', function() {
                    this.closeOrRemoveToast(toast);
                }.bind(this, toast));
            }
        }

        handleDuration(toast) {
            if (this.options.duration > 0) {
                toast.timeout = setTimeout(() => {
                    this.closeOrRemoveToast(toast);
                }, this.options.duration);
            }
        }

        closeOrRemoveToast(toast) {
            if (this.options.animateOnRemoving) {
                return this.closeToast(toast);
            }
            
            this.removeToast(toast);
        }

        closeToast(toast) {
            clearTimeout(toast.timeout);
            toast.close(this.options.classes.closing, this.options.animationRemovingDuration);
            this.toasts.splice(this.findToastIndex(toast), 1);
        }

        removeToast(toast) {
            clearTimeout(toast.timeout);
            toast.remove();
            this.toasts.splice(this.findToastIndex(toast), 1);
        }

        findToastIndex(toast) {
            for (let i = this.toasts.length - 1; i >= 0; i--) {
                if ( toast.instance == this.toasts[i].instance ) {
                    return i;
                }
            }
            return null;
        }

        createContainer() {
            let container = document.querySelector('.' + this.options.classes.container);

            if (container) {
                return container;
            }

            container = document.createElement('div');
            container.className = this.options.classes.container;
            document.body.insertBefore(container, this.options.prependTo);
            return container;
        }

        success(message, options) {
            return this.create(message, 'success', options);
        }

        error(message, options) {
            return this.create(message, 'error', options);
        }

        warning(message, options) {
            return this.create(message, 'warning', options);
        }

        info(message, options) {
            return this.create(message, 'info', options);
        }

        close(type = null) {
            for (let i = this.toasts.length - 1; i >= 0; i--) {
                if ( type !== null && this.toasts[i].type == type ) {
                    this.closeToast(this.toasts[i]);
                    continue;
                }
                if ( type == null ) {
                    this.closeToast(this.toasts[i]);
                }
            }
        }

        remove(type = null) {
            for (let i = this.toasts.length - 1; i >= 0; i--) {
                if ( type !== null && this.toasts[i].type == type ) {
                    this.removeToast(this.toasts[i]);
                    continue;
                }
                if ( type == null ) {
                    this.removeToast(this.toasts[i]);
                }
            }
        }

    }

    return Toasteo;

})));
