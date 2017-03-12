/* global PDFJS */
import Ember from 'ember';

var getOwner = Ember.getOwner;
var Service = Ember.Service;

export default Service.extend({
  init: function init() {
    this._super.apply(this, arguments);

    var appConfig = getOwner(this).resolveRegistration('config:environment');
    var addonConfig = appConfig.emberPdfJs;

    this.PDFJS = PDFJS;
    this.PDFJS.workerSrc = addonConfig.workerSrc;
  }
});