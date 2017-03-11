define('employee-forms-auth/tests/helpers/module-for-acceptance', ['exports', 'qunit', 'employee-forms-auth/tests/helpers/start-app', 'employee-forms-auth/tests/helpers/destroy-app'], function (exports, _qunit, _employeeFormsAuthTestsHelpersStartApp, _employeeFormsAuthTestsHelpersDestroyApp) {
  exports['default'] = function (name) {
    var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

    (0, _qunit.module)(name, {
      beforeEach: function beforeEach() {
        this.application = (0, _employeeFormsAuthTestsHelpersStartApp['default'])();

        if (options.beforeEach) {
          options.beforeEach.apply(this, arguments);
        }
      },

      afterEach: function afterEach() {
        if (options.afterEach) {
          options.afterEach.apply(this, arguments);
        }

        (0, _employeeFormsAuthTestsHelpersDestroyApp['default'])(this.application);
      }
    });
  };
});