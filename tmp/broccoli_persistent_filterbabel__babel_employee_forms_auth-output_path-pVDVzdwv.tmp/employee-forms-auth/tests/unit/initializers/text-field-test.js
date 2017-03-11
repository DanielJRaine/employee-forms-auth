define('employee-forms-auth/tests/unit/initializers/text-field-test', ['exports', 'ember', 'employee-forms-auth/initializers/text-field', 'qunit'], function (exports, _ember, _employeeFormsAuthInitializersTextField, _qunit) {
  "use strict";

  var application = undefined;

  (0, _qunit.module)('Unit | Initializer | text field', {
    beforeEach: function beforeEach() {
      _ember['default'].run(function () {
        application = _ember['default'].Application.create();
        application.deferReadiness();
      });
    }
  });

  // Replace this with your real tests.
  (0, _qunit.test)('it works', function (assert) {
    _employeeFormsAuthInitializersTextField['default'].initialize(application);

    // you would normally confirm the results of the initializer here
    assert.ok(true);
  });
});