define('employee-forms-auth/tests/helpers/destroy-app', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = destroyApp;
  "use strict";

  function destroyApp(application) {
    _ember['default'].run(application, 'destroy');
  }
});