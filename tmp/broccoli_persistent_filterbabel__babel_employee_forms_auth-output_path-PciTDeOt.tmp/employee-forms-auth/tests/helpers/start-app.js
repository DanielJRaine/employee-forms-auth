define('employee-forms-auth/tests/helpers/start-app', ['exports', 'ember', 'employee-forms-auth/app', 'employee-forms-auth/config/environment'], function (exports, _ember, _employeeFormsAuthApp, _employeeFormsAuthConfigEnvironment) {
  exports['default'] = startApp;

  function startApp(attrs) {
    var application = undefined;

    var attributes = _ember['default'].merge({}, _employeeFormsAuthConfigEnvironment['default'].APP);
    attributes = _ember['default'].merge(attributes, attrs); // use defaults, but you can override;

    _ember['default'].run(function () {
      application = _employeeFormsAuthApp['default'].create(attributes);
      application.setupForTesting();
      application.injectTestHelpers();
    });

    return application;
  }
});