define('ember-file-upload/mirage/utils', ['exports', 'ember', 'ember-file-upload/system/file-reader'], function (exports, _ember, _emberFileUploadSystemFileReader) {
  var _slicedToArray = (function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i['return']) _i['return'](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError('Invalid attempt to destructure non-iterable instance'); } }; })();

  exports.extractFormData = extractFormData;
  exports.extractFileMetadata = extractFileMetadata;
  var RSVP = _ember['default'].RSVP;

  function extractFormData(formData) {
    var data = {};
    var items = formData.entries();
    var item = items.next();
    var file = null;
    while (!item.done) {
      var _item$value = _slicedToArray(item.value, 2);

      var key = _item$value[0];
      var value = _item$value[1];

      if (value instanceof Blob) {
        file = { key: key, value: value };
      } else {
        data[key] = value;
      }
      item = items.next();
    }

    return { file: file, data: data };
  }

  var pipelines = {
    gif: function gif(file) {
      var reader = new _emberFileUploadSystemFileReader['default']();
      return reader.readAsArrayBuffer(file).then(function (buffer) {
        var data = new Uint8Array(buffer);
        var bin = '';
        var duration = 0;
        for (var i = 0; i < data.length; i++) {
          bin += String.fromCharCode(data[i]);

          // Find a Graphic Control Extension hex(21F904__ ____ __00)
          if (data[i] === 0x21 && data[i + 1] === 0xF9 && data[i + 2] === 0x04 && data[i + 7] === 0x00) {
            // Swap 5th and 6th bytes to get the delay per frame
            var delay = data[i + 5] << 8 | data[i + 4] & 0xFF;

            // Should be aware browsers have a minimum frame delay
            // e.g. 6ms for IE, 2ms modern browsers (50fps)
            duration += delay < 2 ? 10 : delay;
          }
        }

        return {
          duration: duration / 1000,
          animated: duration > 0
        };
      });
    },

    image: function image(file, metadata) {
      return new RSVP.Promise(function (resolve) {
        var img = new Image();
        img.onload = function () {
          resolve(img);
        };
        img.src = metadata.url;
      }).then(function (img) {
        return {
          width: img.naturalWidth,
          height: img.naturalHeight
        };
      });
    },

    video: function video(file, metadata) {
      var video = document.createElement('video');
      return new RSVP.Promise(function (resolve) {
        video.addEventListener('loadeddata', resolve);
        video.src = metadata.url;
        document.body.appendChild(video);
        video.load();
      }).then(function () {
        return {
          duration: video.duration,
          width: video.videoWidth,
          height: video.videoHeight
        };
      })['finally'](function () {
        document.body.removeChild(video);
      });
    },

    audio: function audio(file, metadata) {
      var audio = document.createElement('audio');
      return new RSVP.Promise(function (resolve) {
        audio.addEventListener('loadeddata', resolve);
        audio.src = metadata.url;
        document.body.appendChild(audio);
        audio.load();
      }).then(function () {
        return {
          duration: audio.duration
        };
      })['finally'](function () {
        document.body.removeChild(audio);
      });
    }

  };

  function extractFileMetadata(file) {
    var metadata = {
      name: file.name,
      size: file.size,
      type: file.type,
      extension: file.name.match(/\.(.*)$/)[1]
    };

    var reader = new _emberFileUploadSystemFileReader['default']();
    return reader.readAsDataURL(file).then(function (url) {
      metadata.url = url;

      var additionalMetadata = [];

      if (metadata.type === 'image/gif') {
        additionalMetadata.push(pipelines.gif(file, metadata));
      }
      if (metadata.type.match(/^image\//)) {
        additionalMetadata.push(pipelines.image(file, metadata));
      }
      if (metadata.type.match(/^video\//)) {
        additionalMetadata.push(pipelines.video(file, metadata));
      }
      if (metadata.type.match(/^audio\//)) {
        additionalMetadata.push(pipelines.audio(file, metadata));
      }
      return RSVP.all(additionalMetadata);
    }).then(function (additionalMetadata) {
      additionalMetadata.forEach(function (data) {
        Object.assign(metadata, data);
      });
      return metadata;
    });
  }
});