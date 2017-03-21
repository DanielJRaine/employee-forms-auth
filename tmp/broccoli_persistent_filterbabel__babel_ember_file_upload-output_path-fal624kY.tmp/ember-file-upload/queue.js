define('ember-file-upload/queue', ['exports', 'ember', 'ember-file-upload/file', 'ember-file-upload/computed/sum-by'], function (exports, _ember, _emberFileUploadFile, _emberFileUploadComputedSumBy) {
  var _get = _ember['default'].get;
  var set = _ember['default'].set;
  var computed = _ember['default'].computed;
  var observer = _ember['default'].observer;
  var next = _ember['default'].run.next;

  /**
    The Queue is a collection of files that
    are being manipulated by the user.
  
    Queues are designed to persist the state
    of uploads when a user navigates around your
    application.
  
    @namespace ember-file-upload
    @class Queue
    @extend Ember.Object
   */
  exports['default'] = _ember['default'].Object.extend({

    init: function init() {
      set(this, 'files', _ember['default'].A());
      set(this, '_dropzones', _ember['default'].A());
      this._super();
    },

    destroy: function destroy() {
      this._super();
      _get(this, 'fileQueue.queues')['delete'](_get(this, 'name'));
      _get(this, 'files').forEach(function (file) {
        return set(file, 'queue', null);
      });
      set(this, 'files', _ember['default'].A());
    },

    /**
      The FileQueue service.
       @property fileQueue
      @type {FileQueue}
     */
    fileQueue: null,

    /**
      @method push
      @param {File} file The file to append to the queue
     */
    push: function push(file) {
      file.queue = this;
      _get(this, 'fileQueue.files').pushObject(file);
      _get(this, 'files').pushObject(file);
    },

    /**
      @private
      @method _addFiles
      @param {FileList} fileList The event triggered from the DOM that contains a list of files
     */
    _addFiles: function _addFiles(fileList, source) {
      var onfileadd = _get(this, 'onfileadd');
      var files = [];

      for (var i = 0, len = fileList.length || fileList.size; i < len; i++) {
        var fileBlob = fileList.item ? fileList.item(i) : fileList[i];
        if (fileBlob instanceof Blob) {
          var file = _emberFileUploadFile['default'].fromBlob(fileBlob, source);

          files.push(file);
          this.push(file);

          if (onfileadd) {
            next(onfileadd, file);
          }
        }
      }

      return files;
    },

    /**
      @method remove
      @param {File} file The file to remove from the queue.
     */
    remove: function remove(file) {
      file.queue = null;
      _get(this, 'files').removeObject(file);
    },

    /**
      The unique identifier of the queue.
       Queue names should be deterministic so they
      can be retrieved. It's recommended to provide
      a helpful name.
       If the queue belongs to a top level collection,
      photos, the good name for this queue may be `"photos"`.
       If you're uploading images to an artwork, the
      best name would incoporate both `"artworks"` and
      the identifier of the artwork. A good name for this
      queue may be `"artworks/{{id}}/photos"`, where `{{id}}`
      is a dynamic segment that is generated from the artwork id.
       @property name
      @type {String}
      @default null
     */
    name: null,

    /**
      The list of files in the queue. This automatically gets
      flushed when all the files in the queue have settled.
       Note that files that have failed need to be manually
      removed from the queue. This is so they can be retried
      without resetting the state of the queue, orphaning the
      file from its queue. Upload failures can happen due to a
      timeout or a server response. If you choose to use the
      `abort` method, the file will fail to upload, but will
      be removed from the requeuing proccess, and will be
      considered to be in a settled state.
       @property files
      @type {File[]}
      @default []
     */
    files: [],

    /**
      @private
       Flushes the `files` property when they have settled. This
      will only flush files when all files have arrived at a terminus
      of their state chart.
       ```
          .------.     .---------.     .--------.
      o--| queued |-->| uploading |-->| uploaded |
          `------`     `---------`     `--------`
             ^              |    .-------.
             |              |`->| aborted |
             |              |    `-------`
             |  .------.    |    .---------.
             `-| failed |<-` `->| timed_out |-.
             |  `------`         `---------`  |
             `-------------------------------`
      ```
       Files *may* be requeued by the uesr in the `failed` or `timed_out`
      states.
       @method flushFilesWhenSettled
     */
    flushFilesWhenSettled: observer('files.@each.state', function () {
      var files = _get(this, 'files');
      var allFilesHaveSettled = files.every(function (file) {
        return ['uploaded', 'aborted'].indexOf(file.state) !== -1;
      });

      if (files.length === 0) {
        return;
      }

      if (allFilesHaveSettled) {
        _get(this, 'files').forEach(function (file) {
          return set(file, 'queue', null);
        });
        set(this, 'files', _ember['default'].A());
      }
    }),

    /**
      The aggregate size (in bytes) of all files in the queue.
       @property size
      @readonly
      @type {Number}
      @default 0
     */
    size: (0, _emberFileUploadComputedSumBy['default'])('files', 'size'),

    /**
      The aggregate amount of bytes that have been uploaded
      to the server for all files in the queue.
       @property loaded
      @readonly
      @type {Number}
      @default 0
     */
    loaded: (0, _emberFileUploadComputedSumBy['default'])('files', 'loaded'),

    /**
      The current upload progress of the queue, as a number from 0 to 100.
       @property progress
      @readonly
      @type {Number}
      @default 0
     */
    progress: computed('size', 'loaded', {
      get: function get() {
        var percent = _get(this, 'loaded') / _get(this, 'size') || 0;
        return Math.floor(percent * 100);
      }
    })
  });
});