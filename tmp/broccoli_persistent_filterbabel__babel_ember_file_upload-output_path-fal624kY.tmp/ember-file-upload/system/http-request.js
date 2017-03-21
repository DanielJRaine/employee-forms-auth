define('ember-file-upload/system/http-request', ['exports', 'ember', 'ember-file-upload/system/trim'], function (exports, _ember, _emberFileUploadSystemTrim) {
  var RSVP = _ember['default'].RSVP;
  var $ = _ember['default'].$;
  var bind = _ember['default'].run.bind;

  function getHeader(headers, header) {
    var headerKeys = Object.keys(headers);
    var headerIdx = headerKeys.map(function (key) {
      return key.toLowerCase();
    }).indexOf(header.toLowerCase());
    if (headerIdx !== -1) {
      return headers[headerKeys[headerIdx]];
    }
    return null;
  }

  function parseResponse(request) {
    var body = (0, _emberFileUploadSystemTrim['default'])(request.responseText);
    var rawHeaders = request.getAllResponseHeaders().split(/\n|\r/).filter(function (header) {
      return header !== '';
    });

    var headers = rawHeaders.reduce(function (E, header) {
      var parts = header.split(/^([0-9A-Za-z_-]*:)/);
      if (parts.length > 0) {
        E[parts[1].slice(0, -1)] = (0, _emberFileUploadSystemTrim['default'])(parts[2]);
      }
      return E;
    }, {});

    var contentType = (getHeader(headers, 'Content-Type') || '').split(';');

    // Parse body according to the Content-Type received by the server
    if (contentType.indexOf('text/html') !== -1) {
      body = $.parseHTML(body);
    } else if (contentType.indexOf('text/xml') !== -1) {
      body = $.parseXML(body);
    } else if (contentType.indexOf('application/json') !== -1 || contentType.indexOf('text/javascript') !== -1 || contentType.indexOf('application/javascript') !== -1) {
      body = $.parseJSON(body);
    }

    return {
      status: request.status,
      body: body,
      headers: headers
    };
  }

  exports['default'] = function () {
    var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

    var _RSVP$defer = RSVP.defer('ember-file-upload: ' + options.label);

    var resolve = _RSVP$defer.resolve;
    var reject = _RSVP$defer.reject;
    var promise = _RSVP$defer.promise;

    var request = new XMLHttpRequest();

    var aborted = undefined;
    promise.cancel = function () {
      if (aborted == null) {
        aborted = RSVP.defer('ember-file-upload: Abort ' + options.label);
        request.abort();
      }
      return aborted.promise;
    };
    request.onabort = bind(this, function () {
      this.onabort();
      aborted.resolve();
    });

    this.setRequestHeader = function (header, value) {
      request.setRequestHeader(header, value);
    };

    this.open = function (method, url, _) {
      var username = arguments.length <= 3 || arguments[3] === undefined ? '' : arguments[3];
      var password = arguments.length <= 4 || arguments[4] === undefined ? '' : arguments[4];

      request.open(method, url, true, username, password);
    };

    this.send = function (data) {
      request.send(data);
      return promise;
    };

    this.onprogress = this.onprogress || function () {};
    this.ontimeout = this.ontimeout || function () {};
    this.onabort = this.onabort || function () {};

    request.onloadstart = request.onprogress = request.onloadend = bind(this, function (evt) {
      this.onprogress(evt);
    });

    if (request.upload) {
      request.upload.onprogress = request.onprogress;
    }

    request.onload = bind(this, function () {
      var response = parseResponse(request);
      if (Math.floor(response.status / 200) === 1) {
        resolve(response);
      } else {
        reject(response);
      }
    });

    request.onerror = bind(this, function () {
      reject(parseResponse(request));
    });

    Object.defineProperty(this, 'timeout', {
      get: function get() {
        return request.timeout;
      },
      set: function set(timeout) {
        request.timeout = timeout;
      },
      enumerable: true,
      configurable: false
    });

    request.ontimeout = bind(this, function () {
      this.ontimeout();
      reject(parseResponse(request));
    });
  };
});