define('ember-file-upload/components/file-dropzone/component', ['exports', 'ember', 'ember-file-upload/components/file-dropzone/template', 'ember-file-upload/system/data-transfer', 'ember-file-upload/system/uuid', 'ember-file-upload/system/drag-listener'], function (exports, _ember, _emberFileUploadComponentsFileDropzoneTemplate, _emberFileUploadSystemDataTransfer, _emberFileUploadSystemUuid, _emberFileUploadSystemDragListener) {
  var _slicedToArray = (function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i['return']) _i['return'](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError('Invalid attempt to destructure non-iterable instance'); } }; })();

  var $ = _ember['default'].$;
  var _get = _ember['default'].get;
  var set = _ember['default'].set;
  var computed = _ember['default'].computed;
  var bind = _ember['default'].run.bind;
  var service = _ember['default'].inject.service;

  var DATA_TRANSFER = 'DATA_TRANSFER' + _emberFileUploadSystemUuid['default'].short();

  var supported = (function () {
    return typeof window !== 'undefined' && window.document && 'draggable' in document.createElement('span');
  })();

  var supportsHtml = null;
  var supportsUrls = null;

  var dragListener = new _emberFileUploadSystemDragListener['default']();

  exports['default'] = _ember['default'].Component.extend({

    layout: _emberFileUploadComponentsFileDropzoneTemplate['default'],

    name: null,

    supported: supported,

    ondragenter: null,

    ondragleave: null,

    fileQueue: service(),

    queue: computed('name', {
      get: function get() {
        var queueName = _get(this, 'name');
        var queues = _get(this, 'fileQueue');
        return queues.find(queueName) || queues.create(queueName);
      }
    }),

    didInsertElement: function didInsertElement() {
      this._super();

      dragListener.addEventListeners('#' + _get(this, 'elementId'), {
        dragenter: bind(this, 'didEnterDropzone'),
        dragleave: bind(this, 'didLeaveDropzone'),
        dragover: bind(this, 'didDragOver'),
        drop: bind(this, 'didDrop')
      });
    },

    willDestroyElement: function willDestroyElement() {
      dragListener.removeEventListeners('#' + _get(this, 'elementId'));
    },

    didEnterDropzone: function didEnterDropzone(evt) {
      var dataTransfer = _emberFileUploadSystemDataTransfer['default'].create({
        queue: _get(this, 'queue'),
        dataTransfer: evt.dataTransfer
      });
      this[DATA_TRANSFER] = dataTransfer;

      set(this, 'active', true);
      set(this, 'valid', _get(dataTransfer, 'valid'));

      if (this.ondragenter) {
        this.ondragenter(dataTransfer);
      }
    },

    didLeaveDropzone: function didLeaveDropzone(evt) {
      if (this.ondragleave) {
        set(this[DATA_TRANSFER], 'dataTransfer', evt.dataTransfer);
        this.ondragleave(this[DATA_TRANSFER]);
        this[DATA_TRANSFER] = null;
      }
      if (!this.isDestroyed) {
        set(this, 'active', false);
      }
    },

    didDragOver: function didDragOver(evt) {
      set(this[DATA_TRANSFER], 'dataTransfer', evt.dataTransfer);
    },

    didDrop: function didDrop(evt) {
      var _this = this;

      // Testing support for dragging and dropping images
      // from other browser windows
      var url = undefined;

      if (supportsHtml === null) {
        try {
          evt.dataTransfer.getData('text/html');
          supportsHtml = true;
        } catch (e) {
          supportsHtml = false;
        }
      }

      if (supportsHtml) {
        var html = evt.dataTransfer.getData('text/html');
        if (html) {
          var img = $(html)[1];
          if (img.tagName === 'IMG') {
            url = img.src;
          }
        }
      }

      if (supportsUrls === null) {
        try {
          evt.dataTransfer.getData('text/uri-list');
          supportsUrls = true;
        } catch (e) {
          supportsUrls = false;
        }
      }

      if (supportsUrls) {
        url = evt.dataTransfer.getData('text/uri-list');
      }

      if (url) {
        var image = new Image();

        var _url$split$slice = url.split('/').slice(-1);

        var _url$split$slice2 = _slicedToArray(_url$split$slice, 1);

        var filename = _url$split$slice2[0];

        image.crossOrigin = 'anonymous';
        image.onload = function () {
          var canvas = document.createElement('canvas');
          canvas.width = image.width;
          canvas.height = image.height;

          var ctx = canvas.getContext('2d');
          ctx.drawImage(image, 0, 0);

          if (canvas.toBlob) {
            canvas.toBlob(function (blob) {
              var _get$_addFiles = _get(_this, 'queue')._addFiles([blob], 'web');

              var _get$_addFiles2 = _slicedToArray(_get$_addFiles, 1);

              var file = _get$_addFiles2[0];

              set(file, 'name', filename);
            });
          } else {
            var binStr = atob(canvas.toDataURL().split(',')[1]),
                len = binStr.length,
                arr = new Uint8Array(len);

            for (var i = 0; i < len; i++) {
              arr[i] = binStr.charCodeAt(i);
            }
            var blob = new Blob([arr], { type: 'image/png' });
            blob.name = filename;

            var _get$_addFiles3 = _get(_this, 'queue')._addFiles([blob], 'web');

            var _get$_addFiles32 = _slicedToArray(_get$_addFiles3, 1);

            var file = _get$_addFiles32[0];

            set(file, 'name', filename);
          }
        };
        image.onerror = function (e) {
          console.log(e);
        };
        image.src = url;
      }

      set(this[DATA_TRANSFER], 'dataTransfer', evt.dataTransfer);
      if (this.ondrop) {
        this.ondrop(this[DATA_TRANSFER]);
      }

      // Add file(s) to upload queue.
      set(this, 'active', false);
      _get(this, 'queue')._addFiles(_get(this[DATA_TRANSFER], 'files'), 'drag-and-drop');
      this[DATA_TRANSFER] = null;
    }
  });
});