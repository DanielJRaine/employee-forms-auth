define('employee-forms-auth/tests/services/ajax.jshint.lint-test', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | services/ajax.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(false, 'services/ajax.js should pass jshint.\nservices/ajax.js: line 1, col 1, \'import\' is only available in ES6 (use \'esversion: 6\').\nservices/ajax.js: line 2, col 1, \'import\' is only available in ES6 (use \'esversion: 6\').\nservices/ajax.js: line 4, col 1, \'import\' is only available in ES6 (use \'esversion: 6\').\nservices/ajax.js: line 6, col 1, \'export\' is only available in ES6 (use \'esversion: 6\').\nservices/ajax.js: line 11, col 9, Missing property name.\nservices/ajax.js: line 12, col 7, \'let\' is available in ES6 (use \'esversion: 6\') or Mozilla JS extensions (use moz).\nservices/ajax.js: line 13, col 7, \'const\' is available in ES6 (use \'esversion: 6\') or Mozilla JS extensions (use moz).\nservices/ajax.js: line 15, col 33, \'template literal syntax\' is only available in ES6 (use \'esversion: 6\').\n\n8 errors');
  });
});