define('employee-forms-auth/tests/helpers/resolver', ['exports', 'employee-forms-auth/resolver', 'employee-forms-auth/config/environment'], function (exports, _employeeFormsAuthResolver, _employeeFormsAuthConfigEnvironment) {

  var resolver = _employeeFormsAuthResolver['default'].create();

  resolver.namespace = {
    modulePrefix: _employeeFormsAuthConfigEnvironment['default'].modulePrefix,
    podModulePrefix: _employeeFormsAuthConfigEnvironment['default'].podModulePrefix
  };

  exports['default'] = resolver;
});