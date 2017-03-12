define('employee-forms-auth/initializers/text-field', ['exports', 'ember'], function (exports, _ember) {
  exports.initialize = initialize;
  'use strict';

  function initialize() {
    _ember['default'].TextField.reopen({
      classNames: ['form-control']
    });
  }

  exports['default'] = {
    name: 'text-field',
    initialize: initialize
  };
});