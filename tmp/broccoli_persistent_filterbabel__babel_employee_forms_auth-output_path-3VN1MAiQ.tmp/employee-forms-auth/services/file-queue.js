define('employee-forms-auth/services/file-queue', ['exports', 'ember-file-upload/services/file-queue'], function (exports, _emberFileUploadServicesFileQueue) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberFileUploadServicesFileQueue['default'];
    }
  });
});