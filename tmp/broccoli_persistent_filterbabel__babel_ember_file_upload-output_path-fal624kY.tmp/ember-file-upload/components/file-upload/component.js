define('ember-file-upload/components/file-upload/component', ['exports', 'ember', 'ember-file-upload/components/file-upload/template', 'ember-file-upload/system/uuid'], function (exports, _ember, _emberFileUploadComponentsFileUploadTemplate, _emberFileUploadSystemUuid) {
  var _get = _ember['default'].get;
  var computed = _ember['default'].computed;
  var setProperties = _ember['default'].setProperties;
  var getProperties = _ember['default'].getProperties;
  var service = _ember['default'].inject.service;

  var VALID_TAGS = ['a', 'abbr', 'area', 'audio', 'b', 'bdo', 'br', 'canvas', 'cite', 'code', 'command', 'datalist', 'del', 'dfn', 'em', 'embed', 'i', 'iframe', 'img', 'kbd', 'mark', 'math', 'noscript', 'object', 'q', 'ruby', 'samp', 'script', 'small', 'span', 'strong', 'sub', 'sup', 'svg', 'time', 'var', 'video', 'wbr', 'path', 'g', 'use'];

  exports['default'] = _ember['default'].Component.extend({
    tagName: 'label',
    classNames: ['file-upload'],

    attributeBindings: ['for'],

    'for': computed({
      get: function get() {
        return 'file-input-' + _emberFileUploadSystemUuid['default'].short();
      }
    }),

    layout: _emberFileUploadComponentsFileUploadTemplate['default'],

    name: null,

    fileQueue: service(),

    didReceiveAttrs: function didReceiveAttrs() {
      if (_get(this, 'queue')) {
        setProperties(_get(this, 'queue'), getProperties(this, 'accept', 'multiple', 'onfileadd'));
      }
    },

    queue: computed('name', {
      get: function get() {
        var queueName = _get(this, 'name');
        if (queueName != null) {
          var queues = _get(this, 'fileQueue');
          return queues.find(queueName) || queues.create(queueName);
        }
      }
    }),

    didInsertElement: function didInsertElement() {
      var id = _get(this, 'for');
      _ember['default'].assert('Changing the tagName of {{file-upload}} to "' + _get(this, 'tagName') + '" will break interactions.', _get(this, 'tagName') === 'label');
      this.$('*').each(function (_, element) {
        if (element.id !== id && VALID_TAGS.indexOf(element.tagName.toLowerCase()) === -1) {
          _ember['default'].assert('"' + element.outerHTML + '" is not allowed as a child of {{file-upload}}.');
        }
      });
    },

    actions: {
      change: function change(files) {
        _get(this, 'queue')._addFiles(files, 'browse');
      }
    }
  });
});