define('employee-forms-auth/initializers/app-version', ['exports', 'ember-cli-app-version/initializer-factory', 'employee-forms-auth/config/environment'], function (exports, _emberCliAppVersionInitializerFactory, _employeeFormsAuthConfigEnvironment) {
  var _config$APP = _employeeFormsAuthConfigEnvironment['default'].APP;
  var name = _config$APP.name;
  var version = _config$APP.version;
  exports['default'] = {
    name: 'App Version',
    initialize: (0, _emberCliAppVersionInitializerFactory['default'])(name, version)
  };
});