define('ember-pdf-js/services/pdf-js', ['exports', 'ember'], function (exports, _ember) {
  /* global PDFJS */
  'use strict';

  var getOwner = _ember['default'].getOwner;
  var Service = _ember['default'].Service;

  exports['default'] = Service.extend({
    init: function init() {
      this._super.apply(this, arguments);

      var appConfig = getOwner(this).resolveRegistration('config:environment');
      var addonConfig = appConfig.emberPdfJs;

      this.PDFJS = PDFJS;
      this.PDFJS.workerSrc = addonConfig.workerSrc;
    }
  });
});