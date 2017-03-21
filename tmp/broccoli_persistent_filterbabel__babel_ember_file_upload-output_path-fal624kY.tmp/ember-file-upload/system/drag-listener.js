define('ember-file-upload/system/drag-listener', ['exports', 'ember'], function (exports, _ember) {
  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

  var assert = _ember['default'].assert;
  var bind = _ember['default'].run.bind;

  var _default = (function () {
    function _default() {
      _classCallCheck(this, _default);

      this._listeners = _ember['default'].A();
      this._entered = 0;
    }

    _createClass(_default, [{
      key: 'beginListening',
      value: function beginListening() {
        var handlers = this._handlers = {
          dragenter: bind(this, 'dragenter'),
          dragleave: bind(this, 'dragleave'),
          dragover: bind(this, 'dragover'),
          drop: bind(this, 'drop')
        };

        var body = document.body;
        body.addEventListener('dragenter', handlers.dragenter, {
          passive: true
        });
        body.addEventListener('dragleave', handlers.dragleave, {
          passive: true
        });
        body.addEventListener('dragover', handlers.dragover, {
          passive: false
        });
        body.addEventListener('drop', handlers.drop, {
          passive: false
        });
      }
    }, {
      key: 'endListening',
      value: function endListening() {
        var body = document.body;
        var handlers = this._handlers;
        body.removeEventListener('dragenter', handlers.dragenter, {
          passive: true
        });
        body.removeEventListener('dragleave', handlers.dragleave, {
          passive: true
        });
        body.removeEventListener('dragover', handlers.dragover, {
          passive: false
        });
        body.removeEventListener('drop', handlers.drop, {
          passive: false
        });
      }
    }, {
      key: 'addEventListeners',
      value: function addEventListeners(selector, handlers) {
        if (this._listeners.length === 0) {
          this.beginListening();
        }

        // Listeners are ordered by most specific to least specific
        var insertAt = this._listeners.length;

        for (var i = 0, len = this._listeners.length; i < len; i++) {
          var listener = this._listeners[i];
          assert('Cannot add multiple listeners for the same element ' + selector + ', ' + listener.selector, document.querySelector(selector) !== document.querySelector(listener.selector));

          if (document.querySelector(listener.selector + ' ' + selector)) {
            insertAt = i;
          }
        }

        this._listeners.splice(insertAt, 0, { selector: selector, handlers: handlers });
      }
    }, {
      key: 'removeEventListeners',
      value: function removeEventListeners(selector) {
        this._listeners.removeObject(this._listeners.findBy('selector', selector));
        if (this._listeners.length === 0) {
          this.endListening();
        }
      }
    }, {
      key: 'findListener',
      value: function findListener(evt) {
        return this._listeners.find(function (_ref) {
          var selector = _ref.selector;

          var element = document.querySelector(selector);
          return element === evt.target || element.contains(evt.target);
        });
      }
    }, {
      key: 'dragenter',
      value: function dragenter(evt) {
        var listener = this.findListener(evt);

        // Trigger a dragleave because the listener that
        // matched isn't the same as the listener that was
        // previously called for a dragenter
        if (this._listener && listener !== this._listener) {
          this._listener.handlers.dragleave(evt);
        }

        if (listener && listener !== this._listener) {
          listener.handlers.dragenter(evt);
        }

        this._listener = listener;
        this._entered++;
      }
    }, {
      key: 'dragleave',
      value: function dragleave(evt) {
        this._entered--;

        // Trigger a dragleave if the file leaves the browser
        if (this._entered === 0 && this._listener) {
          this._listener.handlers.dragleave(evt);
          this._listener = null;
        }
      }
    }, {
      key: 'dragover',
      value: function dragover(evt) {
        evt.preventDefault();
        evt.stopPropagation();
        var listener = this.findListener(evt);
        if (listener) {
          if (this._listener !== listener) {
            if (this._listener) {
              this._listener.handlers.dragleave(evt);
            }
            listener.handlers.dragenter(evt);
          }
          listener.handlers.dragover(evt);
        }
      }
    }, {
      key: 'drop',
      value: function drop(evt) {
        this._entered = 0;
        evt.preventDefault();
        evt.stopPropagation();
        var listener = this.findListener(evt);
        if (listener) {
          listener.handlers.drop(evt);
        }
      }
    }]);

    return _default;
  })();

  exports['default'] = _default;
});