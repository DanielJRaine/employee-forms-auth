define('ember-file-upload/mirage/index', ['exports', 'ember', 'ember-file-upload/mirage/utils', 'ember-file-upload/mirage/shim'], function (exports, _ember, _emberFileUploadMirageUtils, _emberFileUploadMirageShim) {
  exports.upload = upload;

  function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

  var RSVP = _ember['default'].RSVP;

  var NETWORK = {
    'wired': 50000, // 500 Mb/s
    'wifi': 15000, // 15 Mb/s
    'dsl': 1000, // 1 Mb/s
    '4g': 3000, // 4 Mb/s
    '3g': 250, // 250 kb/s
    '2g': 50, // 50 kb/s
    'gprs': 20, // 20 kb/s
    'offline': 0
  };

  function upload(fn) {
    var options = arguments.length <= 1 || arguments[1] === undefined ? { network: null, timeout: null } : arguments[1];

    return function (db, request) {
      var speed = Infinity;

      if (NETWORK[options.network]) {
        speed = NETWORK[options.network] * 1024;
      }

      var _extractFormData = (0, _emberFileUploadMirageUtils.extractFormData)(request.requestBody);

      var file = _extractFormData.file;
      var data = _extractFormData.data;

      var loaded = 0;
      var total = file.value.size;

      return new RSVP.Promise(function (resolve) {
        var start = new Date().getTime();
        var metadata = (0, _emberFileUploadMirageUtils.extractFileMetadata)(file.value);

        function upload() {
          var timedOut = options.timeout && new Date().getTime() - start > options.timeout;
          if (timedOut || loaded >= total) {
            request.upload.onprogress({
              lengthComputable: true,
              total: total,
              loaded: Math.min(loaded, total)
            });

            metadata.then(function (metadata) {
              var response = {
                requestBody: Object.assign(_defineProperty({}, file.key, metadata), data)
              };
              if (timedOut) {
                response.status = 408;
              }

              resolve(fn(db, response));
            });
          } else {
            request.upload.onprogress({
              lengthComputable: true,
              total: total,
              loaded: loaded
            });

            loaded += speed / 20;
            setTimeout(upload, 50);
          }
        }
        upload();
      });
    };
  }
});