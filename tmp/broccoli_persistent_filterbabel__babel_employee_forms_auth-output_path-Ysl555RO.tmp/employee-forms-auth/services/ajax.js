define('employee-forms-auth/services/ajax', ['exports', 'ember', 'ember-ajax/services/ajax', 'employee-forms-auth/config/environment'], function (exports, _ember, _emberAjaxServicesAjax, _employeeFormsAuthConfigEnvironment) {
  exports['default'] = _emberAjaxServicesAjax['default'].extend({
    host: _employeeFormsAuthConfigEnvironment['default'].apiHost,

    auth: _ember['default'].inject.service(),
    headers: _ember['default'].computed('auth.credentials.token', {
      get: function get() {
        var headers = {};
        var token = this.get('auth.credentials.token');
        if (token) {
          headers.Authorization = 'Token token=' + token;
        }

        return headers;
      }
    })
  });
});