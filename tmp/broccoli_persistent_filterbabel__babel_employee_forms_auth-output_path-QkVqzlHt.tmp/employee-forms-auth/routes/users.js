define('employee-forms-auth/routes/users', ['exports', 'ember'], function (exports, _ember) {
  'use strict';
  exports['default'] = _ember['default'].Route.extend({
    model: function model() {
      return this.get('store').findAll('user');
    }
  });
});