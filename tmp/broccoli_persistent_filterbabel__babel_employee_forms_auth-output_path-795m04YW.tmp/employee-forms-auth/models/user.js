define('employee-forms-auth/models/user', ['exports', 'ember-data'], function (exports, _emberData) {
  'use strict';
  exports['default'] = _emberData['default'].Model.extend({
    email: _emberData['default'].attr('string')
  });
});