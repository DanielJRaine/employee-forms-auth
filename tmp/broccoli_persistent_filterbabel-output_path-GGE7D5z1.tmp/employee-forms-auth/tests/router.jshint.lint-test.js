define('employee-forms-auth/tests/router.jshint.lint-test', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | router.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(false, 'router.js should pass jshint.\nrouter.js: line 1, col 1, Use the function form of "use strict".\nrouter.js: line 2, col 1, \'import\' is only available in ES6 (use \'esversion: 6\').\nrouter.js: line 3, col 1, \'import\' is only available in ES6 (use \'esversion: 6\').\nrouter.js: line 5, col 1, \'const\' is available in ES6 (use \'esversion: 6\') or Mozilla JS extensions (use moz).\nrouter.js: line 16, col 1, \'export\' is only available in ES6 (use \'esversion: 6\').\n\n5 errors');
  });
});