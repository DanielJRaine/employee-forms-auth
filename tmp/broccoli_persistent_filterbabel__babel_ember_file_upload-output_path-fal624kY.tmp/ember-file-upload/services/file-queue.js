define('ember-file-upload/services/file-queue', ['exports', 'ember', 'ember-file-upload/queue', 'ember-file-upload/computed/sum-by'], function (exports, _ember, _emberFileUploadQueue, _emberFileUploadComputedSumBy) {
  var _get = _ember['default'].get;
  var set = _ember['default'].set;
  var computed = _ember['default'].computed;
  var observer = _ember['default'].observer;

  /**
    The file queue service is a global file
    queue that manages all files being uploaded.
  
    This service can be used to query the current
    upload state when a user leaves the app,
    asking them whether they want to cancel
    the remaining uploads.
  
    @extends Ember.Service
    @for ember-file-upload
   */
  exports['default'] = _ember['default'].Service.extend({

    /**
      @private
      Setup a map of uploaders so they may be
      accessed by name via the `find` method.
     */
    init: function init() {
      set(this, 'queues', _ember['default'].Map.create());
      set(this, 'files', _ember['default'].A());
    },

    /**
      The list of all files in queues. This automatically gets
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
      The total size of all files currently being uploaded in bytes.
       @property size
      @type Number
      @default 0
      @readonly
     */
    size: (0, _emberFileUploadComputedSumBy['default'])('files', 'size'),

    /**
      The number of bytes that have been uploaded to the server.
       @property loaded
      @type Number
      @default 0
      @readonly
     */
    loaded: (0, _emberFileUploadComputedSumBy['default'])('files', 'loaded'),

    /**
      The current progress of all uploads, as a percentage in the
      range of 0 to 100.
       @property progress
      @type Number
      @default 0
      @readonly
     */
    progress: computed('size', 'loaded', {
      get: function get() {
        var percent = _get(this, 'loaded') / _get(this, 'size') || 0;
        return Math.floor(percent * 100);
      }
    }),

    /**
      Returns a queue with the given name
       @method find
      @param {String} name The name of the queue to find
      @return {Queue} The queue or null if it doesn't exist yet.
     */
    find: function find(name) {
      return _get(this, 'queues').get(name);
    },

    /**
      Create a new queue with the given name.
       @method create
      @param {String} name The name of the queue to create
      @return {Queue} The new queue.
     */
    create: function create(name) {
      var queues = _get(this, 'queues');
      _ember['default'].assert('Queue names are required to be unique. "' + name + '" has already been reserved.', !queues.has(name));

      var queue = _emberFileUploadQueue['default'].create({ name: name, fileQueue: this });
      queues.set(name, queue);

      return queue;
    }
  });
});