define('employee-forms-auth/tests/initializers/text-field.jshint.lint-test', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | initializers/text-field.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(false, 'initializers/text-field.js should pass jshint.\ninitializers/text-field.js: line 1, col 1, Use the function form of "use strict".\ninitializers/text-field.js: line 2, col 1, \'import\' is only available in ES6 (use \'esversion: 6\').\ninitializers/text-field.js: line 4, col 1, \'export\' is only available in ES6 (use \'esversion: 6\').\ninitializers/text-field.js: line 10, col 1, \'export\' is only available in ES6 (use \'esversion: 6\').\ninitializers/text-field.js: line 12, col 3, \'object short notation\' is available in ES6 (use \'esversion: 6\') or Mozilla JS extensions (use moz).\n\n5 errors');
  });
});