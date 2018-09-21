'use strict';

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

var Toast =
/*#__PURE__*/
function () {
  /**
   * Create a new Toast instance.
   *
   * @param {string} message
   * @param {string} type
   */
  function Toast(message) {
    var type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
    var className = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';

    _classCallCheck(this, Toast);

    this.instance = Math.random().toString(36);
    this.element = null;
    this.timeout = null;
    this.create(message, type, className);
  }

  _createClass(Toast, [{
    key: "create",
    value: function create(message, type) {
      var className = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
      this.type = type;
      this.element = document.createElement('div');
      this.element.innerHTML = message;

      if (className) {
        this.element.className = className;
      }

      return this;
    }
  }, {
    key: "insert",
    value: function insert(container) {
      document.body.insertBefore(this.element, container);
    }
  }, {
    key: "close",
    value: function close(className, duration) {
      var _this = this;

      return new Promise(function (resolve, reject) {
        _this.element.className += ' ' + className;
        setTimeout(function () {
          _this.removeElement();

          resolve();
        }, duration);
      });
    }
  }, {
    key: "removeElement",
    value: function removeElement() {
      this.element.parentNode.removeChild(this.element);
      this.element = null;
    }
  }, {
    key: "remove",
    value: function remove() {
      var _this2 = this;

      return new Promise(function (resolve, reject) {
        _this2.removeElement();

        resolve();
      });
    }
  }]);

  return Toast;
}();

var Toasteo =
/*#__PURE__*/
function () {
  /**
   * Create a new Toasteo instance.
   *
   * @param {object} data
   */
  function Toasteo(options) {
    _classCallCheck(this, Toasteo);

    var defaultClasses = {
      container: 'toast-container',
      default: 'toast',
      closing: 'toast--closing',
      creating: 'toast--creating',
      success: 'toast--success',
      error: 'toast--error',
      warning: 'toast--warning',
      info: 'toast--info'
    };
    var defaultOptions = {
      prependTo: document.body.childNodes[0],
      duration: 4000,
      animateOnRemoving: true,
      animationRemovingDuration: 400,
      animateOnCreation: true,
      closeOnClick: true,
      classes: defaultClasses
    };
    var classes = defaultClasses;

    if (options && options.classes) {
      classes = options.classes;
    }

    for (var property in defaultClasses) {
      if (property in classes) {
        continue;
      }

      classes[property] = defaultClasses[property];
    }

    if (!options) {
      options = defaultOptions;
    } else {
      for (var property in defaultOptions) {
        if (property in options) {
          continue;
        }

        options[property] = defaultOptions[property];
      }
    }

    this.options = options;
    this.options.classes = classes;
    this.toasts = [];
  }

  _createClass(Toasteo, [{
    key: "create",
    value: function create(message, type, options) {
      this.container = this.createContainer();
      var toast = new Toast(message, type, this.getToastClass(type));
      var index = this.toasts.length + 1;
      var className = toast.element.className;

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
  }, {
    key: "getToastClass",
    value: function getToastClass(type) {
      var className = this.options.classes.default;

      if (type) {
        className += ' ' + this.options.classes[type];
      }

      return className;
    }
  }, {
    key: "handleCreationAnimation",
    value: function handleCreationAnimation(toast, className) {
      if (this.options.animateOnCreation) {
        setTimeout(function () {
          toast.element.className = className;
        }, 100);
      }
    }
  }, {
    key: "handleClick",
    value: function handleClick(toast) {
      if (this.options.closeOnClick) {
        toast.element.addEventListener('click', function () {
          this.closeOrRemoveToast(toast);
        }.bind(this, toast));
      }
    }
  }, {
    key: "handleDuration",
    value: function handleDuration(toast) {
      var _this = this;

      if (this.options.duration > 0) {
        toast.timeout = setTimeout(function () {
          _this.closeOrRemoveToast(toast);
        }, this.options.duration);
      }
    }
  }, {
    key: "closeOrRemoveToast",
    value: function closeOrRemoveToast(toast) {
      if (this.options.animateOnRemoving) {
        return this.closeToast(toast);
      }

      this.removeToast(toast);
    }
  }, {
    key: "closeToast",
    value: function closeToast(toast) {
      clearTimeout(toast.timeout);
      toast.close(this.options.classes.closing, this.options.animationRemovingDuration);
      this.toasts.splice(this.findToastIndex(toast), 1);
    }
  }, {
    key: "removeToast",
    value: function removeToast(toast) {
      clearTimeout(toast.timeout);
      toast.remove();
      this.toasts.splice(this.findToastIndex(toast), 1);
    }
  }, {
    key: "findToastIndex",
    value: function findToastIndex(toast) {
      for (var i = this.toasts.length - 1; i >= 0; i--) {
        if (toast.instance == this.toasts[i].instance) {
          return i;
        }
      }

      return null;
    }
  }, {
    key: "createContainer",
    value: function createContainer() {
      var container = document.querySelector('.' + this.options.classes.container);

      if (container) {
        return container;
      }

      container = document.createElement('div');
      container.className = this.options.classes.container;
      document.body.insertBefore(container, this.options.prependTo);
      return container;
    }
  }, {
    key: "success",
    value: function success(message, options) {
      return this.create(message, 'success', options);
    }
  }, {
    key: "error",
    value: function error(message, options) {
      return this.create(message, 'error', options);
    }
  }, {
    key: "warning",
    value: function warning(message, options) {
      return this.create(message, 'warning', options);
    }
  }, {
    key: "info",
    value: function info(message, options) {
      return this.create(message, 'info', options);
    }
  }, {
    key: "close",
    value: function close() {
      var type = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

      for (var i = this.toasts.length - 1; i >= 0; i--) {
        if (type !== null && this.toasts[i].type == type) {
          this.closeToast(this.toasts[i]);
          continue;
        }

        if (type == null) {
          this.closeToast(this.toasts[i]);
        }
      }
    }
  }, {
    key: "remove",
    value: function remove() {
      var type = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

      for (var i = this.toasts.length - 1; i >= 0; i--) {
        if (type !== null && this.toasts[i].type == type) {
          this.removeToast(this.toasts[i]);
          continue;
        }

        if (type == null) {
          this.removeToast(this.toasts[i]);
        }
      }
    }
  }]);

  return Toasteo;
}();

module.exports = Toasteo;
