define('employee-forms-auth/tests/components/my-application.jshint.lint-test', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | components/my-application.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(false, 'components/my-application.js should pass jshint.\ncomponents/my-application.js: line 1, col 1, Use the function form of "use strict".\ncomponents/my-application.js: line 2, col 1, \'import\' is only available in ES6 (use \'esversion: 6\').\ncomponents/my-application.js: line 4, col 1, \'export\' is only available in ES6 (use \'esversion: 6\').\ncomponents/my-application.js: line 11, col 5, \'concise methods\' is available in ES6 (use \'esversion: 6\') or Mozilla JS extensions (use moz).\n\n4 errors');
  });
});