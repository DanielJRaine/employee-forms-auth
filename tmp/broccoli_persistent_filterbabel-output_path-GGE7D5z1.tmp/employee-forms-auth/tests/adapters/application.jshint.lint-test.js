define('employee-forms-auth/tests/adapters/application.jshint.lint-test', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | adapters/application.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(false, 'adapters/application.js should pass jshint.\nadapters/application.js: line 1, col 1, Use the function form of "use strict".\nadapters/application.js: line 2, col 1, \'import\' is only available in ES6 (use \'esversion: 6\').\nadapters/application.js: line 3, col 1, \'import\' is only available in ES6 (use \'esversion: 6\').\nadapters/application.js: line 5, col 1, \'import\' is only available in ES6 (use \'esversion: 6\').\nadapters/application.js: line 7, col 1, \'export\' is only available in ES6 (use \'esversion: 6\').\nadapters/application.js: line 13, col 9, Missing property name.\nadapters/application.js: line 14, col 7, \'let\' is available in ES6 (use \'esversion: 6\') or Mozilla JS extensions (use moz).\nadapters/application.js: line 15, col 7, \'const\' is available in ES6 (use \'esversion: 6\') or Mozilla JS extensions (use moz).\nadapters/application.js: line 17, col 33, \'template literal syntax\' is only available in ES6 (use \'esversion: 6\').\n\n9 errors');
  });
});