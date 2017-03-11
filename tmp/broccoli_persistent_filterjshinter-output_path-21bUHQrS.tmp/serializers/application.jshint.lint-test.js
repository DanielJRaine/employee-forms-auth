QUnit.module('JSHint | serializers/application.js');
QUnit.test('should pass jshint', function(assert) {
  assert.expect(1);
  assert.ok(false, 'serializers/application.js should pass jshint.\nserializers/application.js: line 1, col 1, Use the function form of "use strict".\nserializers/application.js: line 2, col 1, \'import\' is only available in ES6 (use \'esversion: 6\').\nserializers/application.js: line 4, col 1, \'export\' is only available in ES6 (use \'esversion: 6\').\n\n3 errors');
});
