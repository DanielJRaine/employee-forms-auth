define('ember-file-upload/mirage/shim', ['exports', 'ember-file-upload/system/uuid'], function (exports, _emberFileUploadSystemUuid) {

  var MAP = 'map_' + _emberFileUploadSystemUuid['default'].short();
  var KEYS = 'keys_' + _emberFileUploadSystemUuid['default'].short();

  // Handle support for FormData#get in browsers that don't
  // support it, only be done when mirage is included.
  // Specifically, PhantomJS 👻
  if (FormData.prototype.get == null) {
    (function () {
      var append = FormData.prototype.append;
      FormData.prototype.append = function () {
        if (this[MAP] == null) {
          this[MAP] = {};
        }
        if (this[KEYS] == null) {
          this[KEYS] = [];
        }

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }

        this[MAP][args[0]] = args[1];
        this[KEYS].push(args[0]);
        return append.call.apply(append, [this].concat(args));
      };

      FormData.prototype.get = function (key) {
        return this[MAP][key];
      };

      FormData.prototype.entries = function () {
        return new FormDataIterator(this);
      };
    })();
  }

  function FormDataIterator(formdata) {
    this.formdata = formdata;
    this.index = 0;
  }

  FormDataIterator.prototype.next = function () {
    var keys = this.formdata[KEYS];
    var done = this.index >= keys.length;
    var key = keys[this.index++];
    return {
      done: done,
      value: [key, this.formdata[MAP][key]]
    };
  };
});