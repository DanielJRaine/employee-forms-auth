QUnit.module('JSHint | components/hamburger-menu.js');
QUnit.test('should pass jshint', function(assert) {
  assert.expect(1);
  assert.ok(false, 'components/hamburger-menu.js should pass jshint.\ncomponents/hamburger-menu.js: line 1, col 1, Use the function form of "use strict".\ncomponents/hamburger-menu.js: line 2, col 1, \'import\' is only available in ES6 (use \'esversion: 6\').\ncomponents/hamburger-menu.js: line 4, col 1, \'export\' is only available in ES6 (use \'esversion: 6\').\n\n3 errors');
});