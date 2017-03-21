define('ember-file-upload/helpers/file-queue', ['exports', 'ember'], function (exports, _ember) {
  var get = _ember['default'].get;
  var service = _ember['default'].inject.service;

  /**
    `file-queue` is one of the core primitives of ember-file-upload.
    It has three different flavors of invocation. The first is
    a bare call, which will return the master queue:
  
    ```handlebars
    {{#with (file-queue) as |queue|}}
      {{queue.progress}}%
    {{/with}}
    ```
  
    If called with a `name` property, it will return the queue
    of that name:
  
    ```handlebars
    {{#with (file-queue name="photos") as |queue|}}
      {{queue.progress}}%
    {{/with}}
    ```
  
    @public
    @method file-queue
    @return {Queue} A collection of all queues, or a specific queue.
    @for Helpers
   */
  exports['default'] = _ember['default'].Helper.extend({

    fileQueue: service(),

    compute: function compute(_, hash) {
      var queues = get(this, 'fileQueue');
      var queueName = hash['name'];
      if (queueName) {
        delete hash['name'];
        var queue = queues.find(queueName) || queues.create(queueName);
        return queue;
      }

      return queues;
    }
  });
});