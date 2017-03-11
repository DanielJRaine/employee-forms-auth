define('employee-forms-auth/tests/unit/models/application-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {
  "use strict";

  (0, _emberQunit.moduleForModel)('application', 'Unit | Model | application', {
    // Specify the other units that are required for this test.
    needs: []
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var model = this.subject();

    // let store = this.store();
    assert.ok(!!model);
  });
});