define('ember-file-upload/system/file-reader', ['exports', 'ember'], function (exports, _ember) {
  var RSVP = _ember['default'].RSVP;

  exports['default'] = function () {
    var _this = this;

    var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

    var _RSVP$defer = RSVP.defer('ember-file-upload: ' + options.label);

    var resolve = _RSVP$defer.resolve;
    var reject = _RSVP$defer.reject;
    var promise = _RSVP$defer.promise;

    var reader = new FileReader();

    reader.onload = resolve;
    reader.onerror = reject;

    var aborted = undefined;
    var cancel = function cancel() {
      if (aborted == null) {
        aborted = RSVP.defer('ember-file-upload: Abort ' + options.label);
        reader.abort();
      }
      return aborted.promise;
    };
    reader.onabort = function () {
      aborted.resolve();
    };

    ['readAsArrayBuffer', 'readAsDataURL', 'readAsBinaryString', 'readAsText'].forEach(function (methodName) {
      _this[methodName] = function (blob) {
        reader[methodName](blob);
        var p = promise.then(function () {
          return reader.result;
        }, function () {
          return RSVP.reject(reader.error);
        }, 'ember-file-upload: Unpack ' + options.label);
        p.cancel = cancel;
        return p;
      };
    });
  };
});