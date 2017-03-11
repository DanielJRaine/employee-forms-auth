define('employee-forms-auth/tests/unit/routes/change-password-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {
  "use strict";

  (0, _emberQunit.moduleFor)('route:change-password', 'Unit | Route | change password', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });
});