define('employee-forms-auth/router', ['exports', 'ember', 'employee-forms-auth/config/environment'], function (exports, _ember, _employeeFormsAuthConfigEnvironment) {

  var Router = _ember['default'].Router.extend({
    location: _employeeFormsAuthConfigEnvironment['default'].locationType
  });

  Router.map(function () {
    this.route('sign-up');
    this.route('sign-in');
    this.route('change-password');
    this.route('users');
  });

  exports['default'] = Router;
});