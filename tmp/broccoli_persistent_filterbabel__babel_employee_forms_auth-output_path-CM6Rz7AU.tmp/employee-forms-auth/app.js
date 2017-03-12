define('employee-forms-auth/app', ['exports', 'ember', 'employee-forms-auth/resolver', 'ember-load-initializers', 'employee-forms-auth/config/environment'], function (exports, _ember, _employeeFormsAuthResolver, _emberLoadInitializers, _employeeFormsAuthConfigEnvironment) {
  'use strict';

  var App = undefined;

  _ember['default'].MODEL_FACTORY_INJECTIONS = true;

  App = _ember['default'].Application.extend({
    modulePrefix: _employeeFormsAuthConfigEnvironment['default'].modulePrefix,
    podModulePrefix: _employeeFormsAuthConfigEnvironment['default'].podModulePrefix,
    Resolver: _employeeFormsAuthResolver['default']
  });

  (0, _emberLoadInitializers['default'])(App, _employeeFormsAuthConfigEnvironment['default'].modulePrefix);

  exports['default'] = App;
});