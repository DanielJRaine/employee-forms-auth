"use strict";



define('employee-forms-auth/adapters/application', ['exports', 'employee-forms-auth/config/environment', 'active-model-adapter', 'ember'], function (exports, _employeeFormsAuthConfigEnvironment, _activeModelAdapter, _ember) {
  'use strict';
  exports['default'] = _activeModelAdapter['default'].extend({
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
define('employee-forms-auth/components/change-password-form', ['exports', 'ember'], function (exports, _ember) {
  'use strict';
  exports['default'] = _ember['default'].Component.extend({
    tagName: 'form',
    classNames: ['form-horizontal'],

    passwords: {},

    actions: {
      submit: function submit() {
        this.sendAction('submit', this.get('passwords'));
      },

      reset: function reset() {
        this.set('passwords', {});
      }
    }
  });
});
define('employee-forms-auth/components/email-input', ['exports', 'ember'], function (exports, _ember) {
  'use strict';
  exports['default'] = _ember['default'].Component.extend({
    tagName: 'div',
    classNames: ['form-group']
  });
});
define('employee-forms-auth/components/file-dropzone', ['exports', 'ember-file-upload/components/file-dropzone/component'], function (exports, _emberFileUploadComponentsFileDropzoneComponent) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberFileUploadComponentsFileDropzoneComponent['default'];
    }
  });
});
define('employee-forms-auth/components/file-upload', ['exports', 'ember-file-upload/components/file-upload/component'], function (exports, _emberFileUploadComponentsFileUploadComponent) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberFileUploadComponentsFileUploadComponent['default'];
    }
  });
});
define('employee-forms-auth/components/flash-message', ['exports', 'ember-cli-flash/components/flash-message'], function (exports, _emberCliFlashComponentsFlashMessage) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberCliFlashComponentsFlashMessage['default'];
    }
  });
});
define('employee-forms-auth/components/hamburger-menu', ['exports', 'ember'], function (exports, _ember) {
  'use strict';
  exports['default'] = _ember['default'].Component.extend({
    tagName: 'button',
    classNames: ['navbar-toggle', 'collapsed'],
    attributeBindings: ['toggle:data-toggle', 'target:data-target', 'expanded:aria-expanded'],
    toggle: 'collapse',
    target: '#navigation',
    expanded: false
  });
});
define('employee-forms-auth/components/my-application', ['exports', 'ember'], function (exports, _ember) {
  'use strict';
  exports['default'] = _ember['default'].Component.extend({
    auth: _ember['default'].inject.service(),

    user: _ember['default'].computed.alias('auth.credentials.email'),
    isAuthenticated: _ember['default'].computed.alias('auth.isAuthenticated'),

    actions: {
      signOut: function signOut() {
        this.sendAction('signOut');
      }
    }
  });
});
define('employee-forms-auth/components/navbar-header', ['exports', 'ember'], function (exports, _ember) {
  'use strict';
  exports['default'] = _ember['default'].Component.extend({
    tagName: 'div',
    classNames: ['navbar-header']
  });
});
define('employee-forms-auth/components/password-confirmation-input', ['exports', 'ember'], function (exports, _ember) {
  'use strict';
  exports['default'] = _ember['default'].Component.extend({
    tagName: 'div',
    classNames: ['form-group']
  });
});
define('employee-forms-auth/components/password-input', ['exports', 'ember'], function (exports, _ember) {
  'use strict';
  exports['default'] = _ember['default'].Component.extend({
    tagName: 'div',
    classNames: ['form-group']
  });
});
define('employee-forms-auth/components/pdf-js-toolbar', ['exports', 'ember', 'employee-forms-auth/templates/components/pdf-js-toolbar'], function (exports, _ember, _employeeFormsAuthTemplatesComponentsPdfJsToolbar) {
  var Component = _ember['default'].Component;
  exports['default'] = Component.extend({
    layout: _employeeFormsAuthTemplatesComponentsPdfJsToolbar['default'],

    // variables
    searchTerms: '',
    caseSensitive: false,
    highlightAll: true,
    phraseSearch: false,
    page: undefined,
    pageTotal: undefined,

    actions: {
      search: function search() {
        var searchTerms = this.get('searchTerms');
        var caseSensitive = this.get('caseSensitive');
        var highlightAll = this.get('highlightAll');
        var phraseSearch = this.get('phraseSearch');

        this.sendAction('search', searchTerms, highlightAll, caseSensitive, phraseSearch);
      },
      updateSearchTerm: function updateSearchTerm(newValue) {
        this.set('searchTerms', newValue);
        this.send('search');
      },
      updateCaseSensitive: function updateCaseSensitive(newValue) {
        this.set('caseSensitive', newValue);
        this.send('search');
      },
      updatePhraseSearch: function updatePhraseSearch(newValue) {
        this.set('phraseSearch', newValue);
        this.send('search');
      },
      updateHighlightAll: function updateHighlightAll(newValue) {
        this.set('highlightAll', newValue);
        this.send('search');
      }
    }
  });
});
define('employee-forms-auth/components/pdf-js', ['exports', 'ember', 'employee-forms-auth/templates/components/pdf-js'], function (exports, _ember, _employeeFormsAuthTemplatesComponentsPdfJs) {
  var _slicedToArray = (function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i['return']) _i['return'](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError('Invalid attempt to destructure non-iterable instance'); } }; })();

  /* global PDFJS */
  'use strict';
  var _PDFJS = PDFJS;
  var PDFFindController = _PDFJS.PDFFindController;
  var PDFHistory = _PDFJS.PDFHistory;
  var PDFLinkService = _PDFJS.PDFLinkService;
  var PDFViewer = _PDFJS.PDFViewer;
  var Component = _ember['default'].Component;
  var reads = _ember['default'].computed.reads;
  var injectService = _ember['default'].inject.service;
  var observer = _ember['default'].observer;
  var run = _ember['default'].run;

  function scrollToMatch(pdfViewer, match) {
    var pageIdx = match.pageIdx;
    var matchIdx = match.matchIdx;

    var page = pdfViewer.getPageView(pageIdx);
    var textLayer = page.textLayer;

    if (!textLayer) {
      // Ember.Logger.debug(`page ${pageIdx} not ready`)
      page.div.scrollIntoView();
      run.later(function () {
        // Ember.Logger.debug('re-running scrollToMatch')
        scrollToMatch(pdfViewer, match);
      }, 50);
    } else {
      // Ember.Logger.debug('ready to scroll right to the match')
      if (!textLayer.textContent) {
        // Ember.Logger.debug('textLayer.textContent ', textLayer.textContent)
        // Ember.Logger.debug('page->', page)
        run.later(function () {
          // Ember.Logger.debug('re-running scrollToMatch')
          scrollToMatch(pdfViewer, match);
        }, 50);
      } else {
        var _textLayer$convertMatches = textLayer.convertMatches([matchIdx], [1]);

        var _textLayer$convertMatches2 = _slicedToArray(_textLayer$convertMatches, 1);

        var divIdx = _textLayer$convertMatches2[0].begin.divIdx;

        textLayer.textDivs[divIdx].scrollIntoView();
        // debugger
      }
    }
  }

  exports['default'] = Component.extend({
    layout: _employeeFormsAuthTemplatesComponentsPdfJs['default'],
    classNames: ['pdf-js'],
    // Service
    pdfJs: injectService('pdf-js'),
    pdfLib: reads('pdfJs.PDFJS'),

    // inputs
    pdf: undefined,

    // variables
    loadingTask: undefined,
    percentLoaded: 0,
    pdfDocument: undefined,
    pdfLinkService: undefined,
    pdfHistory: undefined,
    pdfViewer: undefined,
    pdfFindController: undefined,
    pdfPage: undefined,
    pdfTotalPages: undefined,
    currentMatch: undefined,
    currentMatchIdx: undefined,
    matchTotal: undefined,

    // privates
    _topMargin: 10,
    _container: undefined,

    // components
    toolbarComponent: 'pdf-js-toolbar',

    // initialization
    didInsertElement: function didInsertElement() {
      var _element$getElementsByClassName = this.element.getElementsByClassName('pdfViewerContainer');

      var _element$getElementsByClassName2 = _slicedToArray(_element$getElementsByClassName, 1);

      var container = _element$getElementsByClassName2[0];

      this.set('_container', container);
      var pdfLinkService = new PDFLinkService();
      this.set('pdfLinkService', pdfLinkService);
      var pdfViewer = new PDFViewer({
        container: container,
        linkService: pdfLinkService
      });
      this.set('pdfViewer', pdfViewer);
      pdfLinkService.setViewer(pdfViewer);
      var pdfHistory = new PDFHistory({
        linkService: pdfLinkService
      });
      this.set('pdfHistory', pdfHistory);
      pdfLinkService.setHistory(pdfHistory);
      var pdfFindController = new PDFFindController({
        pdfViewer: pdfViewer
      });
      this.set('pdfFindController', pdfFindController);
      // Ember.Logger.debug('pdfFindController -> ', pdfFindController)
      // Ember.Logger.debug('pdfViewer -> ', pdfViewer)
      pdfViewer.setFindController(pdfFindController);
      pdfViewer.currentScaleValue = 'page-fit';

      // setup the event listening to synchronise with pdf.js' modifications
      var self = this;
      pdfViewer.eventBus.on('pagechange', function (evt) {
        var page = evt.pageNumber;
        run(function () {
          self.set('pdfPage', page);
        });
      });

      pdfFindController.onUpdateResultsCount = function (total) {
        run(function () {
          self.set('matchTotal', total);
        });
      };
      pdfFindController.onUpdateState = function (state, previous, total) {
        run(function () {
          if (state !== 0 && state !== 2) {
            // 0 <=> search found something ; 2 <=> wrapped
            return;
          }
          var _pdfFindController$selected = pdfFindController.selected;
          var pageIdx = _pdfFindController$selected.pageIdx;
          var matchIdx = _pdfFindController$selected.matchIdx;

          if (matchIdx !== -1 || pageIdx !== -1) {
            var pageMatches = pdfFindController.pageMatches;

            var idx = matchIdx + 1;
            for (var i = 0; i < pageIdx; i++) {
              idx += pageMatches[i].length;
            }
            var match = pdfFindController.pageMatches[pageIdx][matchIdx];
            self.set('currentMatch', match);
            self.set('currentMatchIdx', idx);
          }
        });
      };

      if (this.get('pdf')) {
        this.send('load');
      }
    },

    // observer
    pdfObserver: observer('pdf', function () {
      this.send('load');
    }),

    // actions:
    actions: {
      load: function load() {
        var _this = this;

        var uri = this.get('pdf');
        var loadingTask = this.get('pdfLib').getDocument(uri);
        loadingTask.onProgress = function (progressData) {
          _this.set('percentLoaded', 100 * progressData.loaded / progressData.total);
        };

        loadingTask = loadingTask.then(function (pdfDocument) {
          _this.set('pdfDocument', pdfDocument);
          var viewer = _this.get('pdfViewer');
          viewer.setDocument(pdfDocument);
          var linkService = _this.get('pdfLinkService');
          linkService.setDocument(pdfDocument);
          var history = _this.get('pdfHistory');
          history.initialize(pdfDocument.fingerprint);
          _this.set('pdfTotalPages', linkService.pagesCount);
          _this.set('pdfPage', linkService.page);
          _this.sendAction('documentChanged', pdfDocument);
        });

        this.set('loadingTask', loadingTask);
        return loadingTask;
      },
      search: function search(query, highlightAll, caseSensitive, phraseSearch) {
        var pdfFindController = this.get('pdfFindController');
        pdfFindController.executeCommand('find', {
          query: query,
          highlightAll: highlightAll,
          caseSensitive: caseSensitive,
          phraseSearch: phraseSearch
        });
      },
      changeSearchResult: function changeSearchResult(changeDirection) {
        var pdfFindController = this.get('pdfFindController');
        if (!pdfFindController.state) {
          return; // there is no search going on so let's ignore that call
        }
        switch (changeDirection) {
          case 'prev':
            pdfFindController.state.findPrevious = true;
            pdfFindController.nextMatch();
            break;
          case 'next':
            pdfFindController.state.findPrevious = false;
            pdfFindController.nextMatch();
            break;
          default:
            return;
        }
        scrollToMatch(this.get('pdfViewer'), pdfFindController.selected);
      },
      changePage: function changePage(_changePage) {
        var pdfLinkService = this.get('pdfLinkService');
        switch (_changePage) {
          case 'prev':
            pdfLinkService.page--;
            break;
          case 'next':
            pdfLinkService.page++;
            break;
          default:
            // regular change of page:
            pdfLinkService.page = Number.parseInt(_changePage);
        }
        var pdfViewer = this.get('pdfViewer');
        pdfViewer.getPageView(pdfLinkService.page - 1).div.scrollIntoView();
      },
      zoom: function zoom() {
        throw 'not implemented yet';
      }
    }

  });
});
define('employee-forms-auth/components/sign-in-form', ['exports', 'ember'], function (exports, _ember) {
  'use strict';
  exports['default'] = _ember['default'].Component.extend({
    tagName: 'form',
    classNames: ['form-horizontal'],

    actions: {
      submit: function submit() {
        this.sendAction('submit', this.get('credentials'));
      },

      reset: function reset() {
        this.set('credentials', {});
      }
    }
  });
});
define('employee-forms-auth/components/sign-up-form', ['exports', 'ember'], function (exports, _ember) {
  'use strict';
  exports['default'] = _ember['default'].Component.extend({
    tagName: 'form',
    classNames: ['form-horizontal'],

    credentials: {},

    actions: {
      submit: function submit() {
        this.sendAction('submit', this.get('credentials'));
      },

      reset: function reset() {
        this.set('credentials', {});
      }
    }
  });
});
define('employee-forms-auth/controllers/array', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Controller;
});
define('employee-forms-auth/controllers/object', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Controller;
});
define('employee-forms-auth/flash/object', ['exports', 'ember-cli-flash/flash/object'], function (exports, _emberCliFlashFlashObject) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberCliFlashFlashObject['default'];
    }
  });
});
define('employee-forms-auth/helpers/app-version', ['exports', 'ember', 'employee-forms-auth/config/environment', 'ember-cli-app-version/utils/regexp'], function (exports, _ember, _employeeFormsAuthConfigEnvironment, _emberCliAppVersionUtilsRegexp) {
  exports.appVersion = appVersion;
  var version = _employeeFormsAuthConfigEnvironment['default'].APP.version;

  function appVersion(_) {
    var hash = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

    if (hash.hideSha) {
      return version.match(_emberCliAppVersionUtilsRegexp.versionRegExp)[0];
    }

    if (hash.hideVersion) {
      return version.match(_emberCliAppVersionUtilsRegexp.shaRegExp)[0];
    }

    return version;
  }

  exports['default'] = _ember['default'].Helper.helper(appVersion);
});
define('employee-forms-auth/helpers/file-queue', ['exports', 'ember-file-upload/helpers/file-queue'], function (exports, _emberFileUploadHelpersFileQueue) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberFileUploadHelpersFileQueue['default'];
    }
  });
});
define('employee-forms-auth/helpers/pluralize', ['exports', 'ember-inflector/lib/helpers/pluralize'], function (exports, _emberInflectorLibHelpersPluralize) {
  exports['default'] = _emberInflectorLibHelpersPluralize['default'];
});
define('employee-forms-auth/helpers/singularize', ['exports', 'ember-inflector/lib/helpers/singularize'], function (exports, _emberInflectorLibHelpersSingularize) {
  exports['default'] = _emberInflectorLibHelpersSingularize['default'];
});
define("employee-forms-auth/initializers/active-model-adapter", ["exports", "active-model-adapter", "active-model-adapter/active-model-serializer"], function (exports, _activeModelAdapter, _activeModelAdapterActiveModelSerializer) {
  exports["default"] = {
    name: 'active-model-adapter',
    initialize: function initialize() {
      var application = arguments[1] || arguments[0];
      application.register('adapter:-active-model', _activeModelAdapter["default"]);
      application.register('serializer:-active-model', _activeModelAdapterActiveModelSerializer["default"]);
    }
  };
});
define('employee-forms-auth/initializers/app-version', ['exports', 'ember-cli-app-version/initializer-factory', 'employee-forms-auth/config/environment'], function (exports, _emberCliAppVersionInitializerFactory, _employeeFormsAuthConfigEnvironment) {
  var _config$APP = _employeeFormsAuthConfigEnvironment['default'].APP;
  var name = _config$APP.name;
  var version = _config$APP.version;
  exports['default'] = {
    name: 'App Version',
    initialize: (0, _emberCliAppVersionInitializerFactory['default'])(name, version)
  };
});
define('employee-forms-auth/initializers/container-debug-adapter', ['exports', 'ember-resolver/container-debug-adapter'], function (exports, _emberResolverContainerDebugAdapter) {
  exports['default'] = {
    name: 'container-debug-adapter',

    initialize: function initialize() {
      var app = arguments[1] || arguments[0];

      app.register('container-debug-adapter:main', _emberResolverContainerDebugAdapter['default']);
      app.inject('container-debug-adapter:main', 'namespace', 'application:main');
    }
  };
});
define('employee-forms-auth/initializers/data-adapter', ['exports', 'ember'], function (exports, _ember) {

  /*
    This initializer is here to keep backwards compatibility with code depending
    on the `data-adapter` initializer (before Ember Data was an addon).
  
    Should be removed for Ember Data 3.x
  */

  exports['default'] = {
    name: 'data-adapter',
    before: 'store',
    initialize: function initialize() {}
  };
});
define('employee-forms-auth/initializers/ember-data', ['exports', 'ember-data/setup-container', 'ember-data/-private/core'], function (exports, _emberDataSetupContainer, _emberDataPrivateCore) {

  /*
  
    This code initializes Ember-Data onto an Ember application.
  
    If an Ember.js developer defines a subclass of DS.Store on their application,
    as `App.StoreService` (or via a module system that resolves to `service:store`)
    this code will automatically instantiate it and make it available on the
    router.
  
    Additionally, after an application's controllers have been injected, they will
    each have the store made available to them.
  
    For example, imagine an Ember.js application with the following classes:
  
    App.StoreService = DS.Store.extend({
      adapter: 'custom'
    });
  
    App.PostsController = Ember.Controller.extend({
      // ...
    });
  
    When the application is initialized, `App.ApplicationStore` will automatically be
    instantiated, and the instance of `App.PostsController` will have its `store`
    property set to that instance.
  
    Note that this code will only be run if the `ember-application` package is
    loaded. If Ember Data is being used in an environment other than a
    typical application (e.g., node.js where only `ember-runtime` is available),
    this code will be ignored.
  */

  exports['default'] = {
    name: 'ember-data',
    initialize: _emberDataSetupContainer['default']
  };
});
define('employee-forms-auth/initializers/export-application-global', ['exports', 'ember', 'employee-forms-auth/config/environment'], function (exports, _ember, _employeeFormsAuthConfigEnvironment) {
  exports.initialize = initialize;

  function initialize() {
    var application = arguments[1] || arguments[0];
    if (_employeeFormsAuthConfigEnvironment['default'].exportApplicationGlobal !== false) {
      var theGlobal;
      if (typeof window !== 'undefined') {
        theGlobal = window;
      } else if (typeof global !== 'undefined') {
        theGlobal = global;
      } else if (typeof self !== 'undefined') {
        theGlobal = self;
      } else {
        // no reasonable global, just bail
        return;
      }

      var value = _employeeFormsAuthConfigEnvironment['default'].exportApplicationGlobal;
      var globalName;

      if (typeof value === 'string') {
        globalName = value;
      } else {
        globalName = _ember['default'].String.classify(_employeeFormsAuthConfigEnvironment['default'].modulePrefix);
      }

      if (!theGlobal[globalName]) {
        theGlobal[globalName] = application;

        application.reopen({
          willDestroy: function willDestroy() {
            this._super.apply(this, arguments);
            delete theGlobal[globalName];
          }
        });
      }
    }
  }

  exports['default'] = {
    name: 'export-application-global',

    initialize: initialize
  };
});
define('employee-forms-auth/initializers/flash-messages', ['exports', 'ember', 'employee-forms-auth/config/environment'], function (exports, _ember, _employeeFormsAuthConfigEnvironment) {
  exports.initialize = initialize;
  var deprecate = _ember['default'].deprecate;

  var merge = _ember['default'].assign || _ember['default'].merge;
  var INJECTION_FACTORIES_DEPRECATION_MESSAGE = '[ember-cli-flash] Future versions of ember-cli-flash will no longer inject the service automatically. Instead, you should explicitly inject it into your Route, Controller or Component with `Ember.inject.service`.';
  var addonDefaults = {
    timeout: 3000,
    extendedTimeout: 0,
    priority: 100,
    sticky: false,
    showProgress: false,
    type: 'info',
    types: ['success', 'info', 'warning', 'danger', 'alert', 'secondary'],
    injectionFactories: ['route', 'controller', 'view', 'component'],
    preventDuplicates: false
  };

  function initialize() {
    var application = arguments[1] || arguments[0];

    var _ref = _employeeFormsAuthConfigEnvironment['default'] || {};

    var flashMessageDefaults = _ref.flashMessageDefaults;

    var _ref2 = flashMessageDefaults || [];

    var injectionFactories = _ref2.injectionFactories;

    var options = merge(addonDefaults, flashMessageDefaults);
    var shouldShowDeprecation = !(injectionFactories && injectionFactories.length);

    application.register('config:flash-messages', options, { instantiate: false });
    application.inject('service:flash-messages', 'flashMessageDefaults', 'config:flash-messages');

    deprecate(INJECTION_FACTORIES_DEPRECATION_MESSAGE, shouldShowDeprecation, {
      id: 'ember-cli-flash.deprecate-injection-factories',
      until: '2.0.0'
    });

    options.injectionFactories.forEach(function (factory) {
      application.inject(factory, 'flashMessages', 'service:flash-messages');
    });
  }

  exports['default'] = {
    name: 'flash-messages',
    initialize: initialize
  };
});
define('employee-forms-auth/initializers/injectStore', ['exports', 'ember'], function (exports, _ember) {

  /*
    This initializer is here to keep backwards compatibility with code depending
    on the `injectStore` initializer (before Ember Data was an addon).
  
    Should be removed for Ember Data 3.x
  */

  exports['default'] = {
    name: 'injectStore',
    before: 'store',
    initialize: function initialize() {}
  };
});
define('employee-forms-auth/initializers/local-storage-adapter', ['exports', 'ember-local-storage/initializers/local-storage-adapter'], function (exports, _emberLocalStorageInitializersLocalStorageAdapter) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberLocalStorageInitializersLocalStorageAdapter['default'];
    }
  });
  Object.defineProperty(exports, 'initialize', {
    enumerable: true,
    get: function get() {
      return _emberLocalStorageInitializersLocalStorageAdapter.initialize;
    }
  });
});
define('employee-forms-auth/initializers/store', ['exports', 'ember'], function (exports, _ember) {

  /*
    This initializer is here to keep backwards compatibility with code depending
    on the `store` initializer (before Ember Data was an addon).
  
    Should be removed for Ember Data 3.x
  */

  exports['default'] = {
    name: 'store',
    after: 'ember-data',
    initialize: function initialize() {}
  };
});
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
define('employee-forms-auth/initializers/transforms', ['exports', 'ember'], function (exports, _ember) {

  /*
    This initializer is here to keep backwards compatibility with code depending
    on the `transforms` initializer (before Ember Data was an addon).
  
    Should be removed for Ember Data 3.x
  */

  exports['default'] = {
    name: 'transforms',
    before: 'store',
    initialize: function initialize() {}
  };
});
define("employee-forms-auth/instance-initializers/ember-data", ["exports", "ember-data/-private/instance-initializers/initialize-store-service"], function (exports, _emberDataPrivateInstanceInitializersInitializeStoreService) {
  exports["default"] = {
    name: "ember-data",
    initialize: _emberDataPrivateInstanceInitializersInitializeStoreService["default"]
  };
});
define('employee-forms-auth/models/user', ['exports', 'ember-data'], function (exports, _emberData) {
  'use strict';
  exports['default'] = _emberData['default'].Model.extend({
    email: _emberData['default'].attr('string')
  });
});
define('employee-forms-auth/resolver', ['exports', 'ember-resolver'], function (exports, _emberResolver) {
  'use strict';
  exports['default'] = _emberResolver['default'];
});
define('employee-forms-auth/router', ['exports', 'ember', 'employee-forms-auth/config/environment'], function (exports, _ember, _employeeFormsAuthConfigEnvironment) {
  'use strict';

  var Router = _ember['default'].Router.extend({
    location: _employeeFormsAuthConfigEnvironment['default'].locationType
  });

  Router.map(function () {
    this.route('sign-up');
    this.route('sign-in');
    this.route('change-password');
    this.route('users');
    this.route('employee-forms', function () {
      this.route('w4');
    });
  });

  exports['default'] = Router;
});
define('employee-forms-auth/routes/application', ['exports', 'ember'], function (exports, _ember) {
  'use strict';
  exports['default'] = _ember['default'].Route.extend({
    auth: _ember['default'].inject.service(),
    flashMessages: _ember['default'].inject.service(),

    actions: {
      signOut: function signOut() {
        var _this = this;

        this.get('auth').signOut().then(function () {
          return _this.get('store').unloadAll();
        }).then(function () {
          return _this.transitionTo('sign-in');
        }).then(function () {
          _this.get('flashMessages').warning('You have been signed out.');
        })['catch'](function () {
          _this.get('flashMessages').danger('There was a problem. Are you sure you\'re signed-in?');
        });
      },

      error: function error(reason) {
        var unauthorized = reason.errors && reason.errors.some(function (error) {
          return error.status === '401';
        });

        if (unauthorized) {
          this.get('flashMessages').danger('You must be authenticated to access this page.');
          this.transitionTo('/sign-in');
        } else {
          this.get('flashMessages').danger('There was a problem. Please try again.');
        }

        return false;
      }
    }
  });
});
define('employee-forms-auth/routes/change-password', ['exports', 'ember'], function (exports, _ember) {
  'use strict';
  exports['default'] = _ember['default'].Route.extend({
    auth: _ember['default'].inject.service(),
    flashMessages: _ember['default'].inject.service(),

    actions: {
      changePassword: function changePassword(passwords) {
        var _this = this;

        this.get('auth').changePassword(passwords).then(function () {
          return _this.get('auth').signOut();
        }).then(function () {
          return _this.transitionTo('sign-in');
        }).then(function () {
          _this.get('flashMessages').success('Successfully changed your password!');
        }).then(function () {
          _this.get('flashMessages').warning('You have been signed out.');
        })['catch'](function () {
          _this.get('flashMessages').danger('There was a problem. Please try again.');
        });
      }
    }
  });
});
define('employee-forms-auth/routes/employee-forms', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Route.extend({});
});
define('employee-forms-auth/routes/employee-forms/w4', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Route.extend({});
});
define('employee-forms-auth/routes/sign-in', ['exports', 'ember', 'rsvp'], function (exports, _ember, _rsvp) {
  'use strict';
  exports['default'] = _ember['default'].Route.extend({
    auth: _ember['default'].inject.service(),
    flashMessages: _ember['default'].inject.service(),

    model: function model() {
      return _rsvp['default'].Promise.resolve({});
    },

    actions: {
      signIn: function signIn(credentials) {
        var _this = this;

        return this.get('auth').signIn(credentials).then(function () {
          return _this.transitionTo('application');
        }).then(function () {
          return _this.get('flashMessages').success('Thanks for signing in!');
        })['catch'](function () {
          _this.get('flashMessages').danger('There was a problem. Please try again.');
        });
      }
    }
  });
});
define('employee-forms-auth/routes/sign-up', ['exports', 'ember'], function (exports, _ember) {
  'use strict';
  exports['default'] = _ember['default'].Route.extend({
    auth: _ember['default'].inject.service(),
    flashMessages: _ember['default'].inject.service(),

    actions: {
      signUp: function signUp(credentials) {
        var _this = this;

        this.get('auth').signUp(credentials).then(function () {
          return _this.get('auth').signIn(credentials);
        }).then(function () {
          return _this.transitionTo('application');
        }).then(function () {
          _this.get('flashMessages').success('Successfully signed-up! You have also been signed-in.');
        })['catch'](function () {
          _this.get('flashMessages').danger('There was a problem. Please try again.');
        });
      }
    }
  });
});
define('employee-forms-auth/routes/users', ['exports', 'ember'], function (exports, _ember) {
  'use strict';
  exports['default'] = _ember['default'].Route.extend({
    model: function model() {
      return this.get('store').findAll('user');
    }
  });
});
define('employee-forms-auth/serializers/application', ['exports', 'active-model-adapter'], function (exports, _activeModelAdapter) {
  'use strict';
  exports['default'] = _activeModelAdapter.ActiveModelSerializer.extend({});
});
define('employee-forms-auth/services/ajax', ['exports', 'ember', 'ember-ajax/services/ajax', 'employee-forms-auth/config/environment'], function (exports, _ember, _emberAjaxServicesAjax, _employeeFormsAuthConfigEnvironment) {
  'use strict';
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
define('employee-forms-auth/services/auth', ['exports', 'ember', 'ember-local-storage'], function (exports, _ember, _emberLocalStorage) {
  'use strict';
  exports['default'] = _ember['default'].Service.extend({
    ajax: _ember['default'].inject.service(),
    credentials: (0, _emberLocalStorage.storageFor)('auth'),
    isAuthenticated: _ember['default'].computed.bool('credentials.token'),

    signUp: function signUp(credentials) {
      return this.get('ajax').post('/sign-up', {
        data: {
          credentials: {
            email: credentials.email,
            password: credentials.password,
            password_confirmation: credentials.passwordConfirmation
          }
        }
      });
    },

    signIn: function signIn(credentials) {
      var _this = this;

      return this.get('ajax').post('/sign-in', {
        data: {
          credentials: {
            email: credentials.email,
            password: credentials.password
          }
        }
      }).then(function (result) {
        _this.get('credentials').set('id', result.user.id);
        _this.get('credentials').set('email', result.user.email);
        _this.get('credentials').set('token', result.user.token);
      });
    },

    changePassword: function changePassword(passwords) {
      return this.get('ajax').patch('/change-password/' + this.get('credentials.id'), {
        data: {
          passwords: {
            old: passwords.previous,
            'new': passwords.next
          }
        }
      });
    },

    signOut: function signOut() {
      var _this2 = this;

      return this.get('ajax').del('/sign-out/' + this.get('credentials.id'))['finally'](function () {
        return _this2.get('credentials').reset();
      });
    }
  });
});
define('employee-forms-auth/services/file-queue', ['exports', 'ember-file-upload/services/file-queue'], function (exports, _emberFileUploadServicesFileQueue) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberFileUploadServicesFileQueue['default'];
    }
  });
});
define('employee-forms-auth/services/flash-messages', ['exports', 'ember-cli-flash/services/flash-messages'], function (exports, _emberCliFlashServicesFlashMessages) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberCliFlashServicesFlashMessages['default'];
    }
  });
});
define('employee-forms-auth/services/pdf-js', ['exports', 'ember'], function (exports, _ember) {
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
/* global PDFJS */
define('employee-forms-auth/storages/auth', ['exports', 'ember-local-storage/local/object'], function (exports, _emberLocalStorageLocalObject) {
  'use strict';
  exports['default'] = _emberLocalStorageLocalObject['default'].extend({});
});
define("employee-forms-auth/templates/application", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "MRBctpmV", "block": "{\"statements\":[[\"append\",[\"helper\",[\"my-application\"],null,[[\"signOut\"],[\"signOut\"]]],false],[\"text\",\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[],\"hasPartials\":false}", "meta": { "moduleName": "employee-forms-auth/templates/application.hbs" } });
});
define("employee-forms-auth/templates/change-password", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "0Rm6mJl2", "block": "{\"statements\":[[\"open-element\",\"h2\",[]],[\"flush-element\"],[\"text\",\"Change Password\"],[\"close-element\"],[\"text\",\"\\n\\n\"],[\"append\",[\"helper\",[\"change-password-form\"],null,[[\"submit\"],[\"changePassword\"]]],false],[\"text\",\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[],\"hasPartials\":false}", "meta": { "moduleName": "employee-forms-auth/templates/change-password.hbs" } });
});
define("employee-forms-auth/templates/components/change-password-form", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "uYkYZIQs", "block": "{\"statements\":[[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"form-group\"],[\"flush-element\"],[\"text\",\"\\n  \"],[\"open-element\",\"label\",[]],[\"static-attr\",\"for\",\"previous\"],[\"flush-element\"],[\"text\",\"Old Password\"],[\"close-element\"],[\"text\",\"\\n  \"],[\"append\",[\"helper\",[\"input\"],null,[[\"type\",\"class\",\"id\",\"placeholder\",\"value\"],[\"password\",\"form-control\",\"previous\",\"Old password\",[\"get\",[\"passwords\",\"previous\"]]]]],false],[\"text\",\"\\n\"],[\"close-element\"],[\"text\",\"\\n\\n\"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"form-group\"],[\"flush-element\"],[\"text\",\"\\n  \"],[\"open-element\",\"label\",[]],[\"static-attr\",\"for\",\"next\"],[\"flush-element\"],[\"text\",\"New Password\"],[\"close-element\"],[\"text\",\"\\n  \"],[\"append\",[\"helper\",[\"input\"],null,[[\"type\",\"class\",\"id\",\"placeholder\",\"value\"],[\"password\",\"form-control\",\"next\",\"New password\",[\"get\",[\"passwords\",\"next\"]]]]],false],[\"text\",\"\\n\"],[\"close-element\"],[\"text\",\"\\n\\n\"],[\"open-element\",\"button\",[]],[\"static-attr\",\"type\",\"submit\"],[\"static-attr\",\"class\",\"btn btn-primary\"],[\"modifier\",[\"action\"],[[\"get\",[null]],\"submit\"]],[\"flush-element\"],[\"text\",\"\\n  Change Password\\n\"],[\"close-element\"],[\"text\",\"\\n\\n\"],[\"open-element\",\"button\",[]],[\"static-attr\",\"class\",\"btn btn-default\"],[\"modifier\",[\"action\"],[[\"get\",[null]],\"reset\"]],[\"flush-element\"],[\"text\",\"\\n  Cancel\\n\"],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[],\"hasPartials\":false}", "meta": { "moduleName": "employee-forms-auth/templates/components/change-password-form.hbs" } });
});
define("employee-forms-auth/templates/components/email-input", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "tVC1uOIf", "block": "{\"statements\":[[\"open-element\",\"label\",[]],[\"static-attr\",\"for\",\"email\"],[\"flush-element\"],[\"text\",\"Email\"],[\"close-element\"],[\"text\",\"\\n\"],[\"append\",[\"helper\",[\"input\"],null,[[\"type\",\"id\",\"placeholder\",\"value\"],[\"email\",\"email\",\"Email\",[\"get\",[\"email\"]]]]],false],[\"text\",\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[],\"hasPartials\":false}", "meta": { "moduleName": "employee-forms-auth/templates/components/email-input.hbs" } });
});
define("employee-forms-auth/templates/components/hamburger-menu", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "viey3SOG", "block": "{\"statements\":[[\"text\",\"  \"],[\"open-element\",\"span\",[]],[\"static-attr\",\"class\",\"sr-only\"],[\"flush-element\"],[\"text\",\"Toggle navigation\"],[\"close-element\"],[\"text\",\"\\n  \"],[\"open-element\",\"span\",[]],[\"static-attr\",\"class\",\"icon-bar\"],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n  \"],[\"open-element\",\"span\",[]],[\"static-attr\",\"class\",\"icon-bar\"],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n  \"],[\"open-element\",\"span\",[]],[\"static-attr\",\"class\",\"icon-bar\"],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[],\"hasPartials\":false}", "meta": { "moduleName": "employee-forms-auth/templates/components/hamburger-menu.hbs" } });
});
define("employee-forms-auth/templates/components/my-application", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "rHgqK8Tf", "block": "{\"statements\":[[\"open-element\",\"nav\",[]],[\"static-attr\",\"class\",\"navbar navbar-default\"],[\"flush-element\"],[\"text\",\"\\n  \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"container-fluid\"],[\"flush-element\"],[\"text\",\"\\n    \"],[\"append\",[\"unknown\",[\"navbar-header\"]],false],[\"text\",\"\\n\\n    \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"collapse navbar-collapse\"],[\"static-attr\",\"id\",\"navigation\"],[\"flush-element\"],[\"text\",\"\\n      \"],[\"open-element\",\"ul\",[]],[\"static-attr\",\"class\",\"nav navbar-nav\"],[\"flush-element\"],[\"text\",\"\\n\"],[\"block\",[\"if\"],[[\"get\",[\"isAuthenticated\"]]],null,8],[\"text\",\"      \"],[\"close-element\"],[\"text\",\"\\n      \"],[\"open-element\",\"ul\",[]],[\"static-attr\",\"class\",\"nav navbar-nav navbar-right\"],[\"flush-element\"],[\"text\",\"\\n\"],[\"block\",[\"if\"],[[\"get\",[\"isAuthenticated\"]]],null,6,4],[\"text\",\"      \"],[\"close-element\"],[\"text\",\"\\n    \"],[\"close-element\"],[\"text\",\"\\n  \"],[\"close-element\"],[\"text\",\"\\n\"],[\"close-element\"],[\"text\",\"\\n\\n\"],[\"open-element\",\"h1\",[]],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n\\n\"],[\"block\",[\"each\"],[[\"get\",[\"flashMessages\",\"queue\"]]],null,0],[\"text\",\"\\n\"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"col-md-8 col-md-offset-2\"],[\"flush-element\"],[\"text\",\"\\n  \"],[\"append\",[\"unknown\",[\"outlet\"]],false],[\"text\",\"\\n\"],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[{\"statements\":[[\"text\",\"  \"],[\"append\",[\"helper\",[\"flash-message\"],null,[[\"flash\"],[[\"get\",[\"flash\"]]]]],false],[\"text\",\"\\n\"]],\"locals\":[\"flash\"]},{\"statements\":[[\"text\",\"Employee Forms\"]],\"locals\":[]},{\"statements\":[[\"text\",\"Sign In\"]],\"locals\":[]},{\"statements\":[[\"text\",\"Sign Up\"]],\"locals\":[]},{\"statements\":[[\"text\",\"        \"],[\"open-element\",\"li\",[]],[\"flush-element\"],[\"block\",[\"link-to\"],[\"sign-up\"],null,3],[\"close-element\"],[\"text\",\"\\n        \"],[\"open-element\",\"li\",[]],[\"flush-element\"],[\"block\",[\"link-to\"],[\"sign-in\"],null,2],[\"close-element\"],[\"text\",\"\\n        \"],[\"open-element\",\"li\",[]],[\"flush-element\"],[\"block\",[\"link-to\"],[\"employee-forms\"],null,1],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[]},{\"statements\":[[\"text\",\"Change Password\"]],\"locals\":[]},{\"statements\":[[\"text\",\"        \"],[\"open-element\",\"li\",[]],[\"flush-element\"],[\"block\",[\"link-to\"],[\"change-password\"],null,5],[\"close-element\"],[\"text\",\"\\n        \"],[\"open-element\",\"li\",[]],[\"flush-element\"],[\"open-element\",\"a\",[]],[\"static-attr\",\"href\",\"#\"],[\"modifier\",[\"action\"],[[\"get\",[null]],\"signOut\"]],[\"flush-element\"],[\"text\",\"Sign Out\"],[\"close-element\"],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[]},{\"statements\":[[\"text\",\"Users\"]],\"locals\":[]},{\"statements\":[[\"text\",\"        \"],[\"open-element\",\"li\",[]],[\"flush-element\"],[\"block\",[\"link-to\"],[\"users\"],null,7],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[]}],\"hasPartials\":false}", "meta": { "moduleName": "employee-forms-auth/templates/components/my-application.hbs" } });
});
define("employee-forms-auth/templates/components/navbar-header", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "F7wGz0Bc", "block": "{\"statements\":[[\"append\",[\"unknown\",[\"hamburger-menu\"]],false],[\"text\",\"\\n\"],[\"block\",[\"link-to\"],[\"application\"],[[\"class\"],[\"navbar-brand\"]],0],[\"text\",\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[{\"statements\":[[\"text\",\"Home\"]],\"locals\":[]}],\"hasPartials\":false}", "meta": { "moduleName": "employee-forms-auth/templates/components/navbar-header.hbs" } });
});
define("employee-forms-auth/templates/components/password-confirmation-input", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "Z4IgId/1", "block": "{\"statements\":[[\"open-element\",\"label\",[]],[\"static-attr\",\"for\",\"password-confirmation\"],[\"flush-element\"],[\"text\",\"Password Confirmation\"],[\"close-element\"],[\"text\",\"\\n\"],[\"append\",[\"helper\",[\"input\"],null,[[\"type\",\"id\",\"placeholder\",\"value\"],[\"password\",\"password-confirmation\",\"Password Confirmation\",[\"get\",[\"password\"]]]]],false],[\"text\",\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[],\"hasPartials\":false}", "meta": { "moduleName": "employee-forms-auth/templates/components/password-confirmation-input.hbs" } });
});
define("employee-forms-auth/templates/components/password-input", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "CZpaGXgn", "block": "{\"statements\":[[\"open-element\",\"label\",[]],[\"static-attr\",\"for\",\"kind\"],[\"flush-element\"],[\"text\",\"Password\"],[\"close-element\"],[\"text\",\"\\n\"],[\"append\",[\"helper\",[\"input\"],null,[[\"type\",\"id\",\"placeholder\",\"value\"],[\"password\",\"password\",\"Password\",[\"get\",[\"password\"]]]]],false],[\"text\",\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[],\"hasPartials\":false}", "meta": { "moduleName": "employee-forms-auth/templates/components/password-input.hbs" } });
});
define("employee-forms-auth/templates/components/pdf-js-toolbar", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "ewt6V08K", "block": "{\"statements\":[[\"open-element\",\"button\",[]],[\"static-attr\",\"type\",\"button\"],[\"dynamic-attr\",\"disabled\",[\"helper\",[\"gte\"],[[\"get\",[\"page\"]],[\"get\",[\"pageTotal\"]]],null],null],[\"modifier\",[\"action\"],[[\"get\",[null]],[\"helper\",[\"action\"],[[\"get\",[null]],[\"arg\",[\"changePage\"]]],null],\"next\"]],[\"flush-element\"],[\"text\",\"\\n  Next page !\\n\"],[\"close-element\"],[\"text\",\"\\n\"],[\"open-element\",\"button\",[]],[\"static-attr\",\"type\",\"button\"],[\"dynamic-attr\",\"disabled\",[\"helper\",[\"lte\"],[[\"get\",[\"page\"]],1],null],null],[\"modifier\",[\"action\"],[[\"get\",[null]],[\"helper\",[\"action\"],[[\"get\",[null]],[\"arg\",[\"changePage\"]]],null],\"prev\"]],[\"flush-element\"],[\"text\",\"\\n  Prev page !\\n\"],[\"close-element\"],[\"text\",\"\\n\"],[\"append\",[\"helper\",[\"one-way-input\"],[[\"get\",[\"searchTerms\"]]],[[\"update\"],[[\"helper\",[\"action\"],[[\"get\",[null]],\"updateSearchTerm\"],null]]]],false],[\"text\",\"\\n\"],[\"open-element\",\"br\",[]],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n\"],[\"open-element\",\"label\",[]],[\"flush-element\"],[\"text\",\"\\n  \"],[\"append\",[\"helper\",[\"one-way-checkbox\"],[[\"get\",[\"caseSensitive\"]]],[[\"update\"],[[\"helper\",[\"action\"],[[\"get\",[null]],\"updateCaseSensitive\"],null]]]],false],[\"text\",\"\\n  case sensitive\\n\"],[\"close-element\"],[\"text\",\"\\n\"],[\"open-element\",\"label\",[]],[\"flush-element\"],[\"text\",\"\\n  \"],[\"append\",[\"helper\",[\"one-way-checkbox\"],[[\"get\",[\"phraseSearch\"]]],[[\"update\"],[[\"helper\",[\"action\"],[[\"get\",[null]],\"updatePhraseSearch\"],null]]]],false],[\"text\",\"\\n  match phrase\\n\"],[\"close-element\"],[\"text\",\"\\n\"],[\"open-element\",\"label\",[]],[\"flush-element\"],[\"text\",\"\\n  \"],[\"append\",[\"helper\",[\"one-way-checkbox\"],[[\"get\",[\"highlightAll\"]]],[[\"update\"],[[\"helper\",[\"action\"],[[\"get\",[null]],\"updateHighlightAll\"],null]]]],false],[\"text\",\"\\n  highlightAll\\n\"],[\"close-element\"],[\"text\",\"\\n\"],[\"open-element\",\"label\",[]],[\"flush-element\"],[\"text\",\"page \"],[\"append\",[\"unknown\",[\"page\"]],false],[\"text\",\" of \"],[\"append\",[\"unknown\",[\"pageTotal\"]],false],[\"close-element\"]],\"locals\":[],\"named\":[\"changePage\"],\"yields\":[],\"blocks\":[],\"hasPartials\":false}", "meta": { "moduleName": "employee-forms-auth/templates/components/pdf-js-toolbar.hbs" } });
});
define("employee-forms-auth/templates/components/pdf-js", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "mQbNdzfd", "block": "{\"statements\":[[\"append\",[\"helper\",[\"component\"],[[\"get\",[\"toolbarComponent\"]]],[[\"changePage\",\"changeSearchResult\",\"search\",\"zoom\",\"page\",\"pageTotal\",\"class\",\"currentMatch\",\"currentMatchIdx\",\"matchTotal\"],[[\"helper\",[\"action\"],[[\"get\",[null]],\"changePage\"],null],[\"helper\",[\"action\"],[[\"get\",[null]],\"changeSearchResult\"],null],[\"helper\",[\"action\"],[[\"get\",[null]],\"search\"],null],[\"helper\",[\"action\"],[[\"get\",[null]],\"zoom\"],null],[\"get\",[\"pdfPage\"]],[\"get\",[\"pdfTotalPages\"]],\"ember-pdf-js toolbar\",[\"get\",[\"currentMatch\"]],[\"get\",[\"currentMatchIdx\"]],[\"get\",[\"matchTotal\"]]]]],false],[\"text\",\"\\n\"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"pdfViewerContainer\"],[\"flush-element\"],[\"text\",\"\\n  \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"pdfViewer\"],[\"flush-element\"],[\"text\",\"\\n  \"],[\"close-element\"],[\"text\",\"\\n\"],[\"close-element\"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[],\"hasPartials\":false}", "meta": { "moduleName": "employee-forms-auth/templates/components/pdf-js.hbs" } });
});
define("employee-forms-auth/templates/components/sign-in-form", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "bUXQdN2e", "block": "{\"statements\":[[\"append\",[\"helper\",[\"email-input\"],null,[[\"email\"],[[\"get\",[\"credentials\",\"email\"]]]]],false],[\"text\",\"\\n\"],[\"append\",[\"helper\",[\"password-input\"],null,[[\"password\"],[[\"get\",[\"credentials\",\"password\"]]]]],false],[\"text\",\"\\n\\n\"],[\"open-element\",\"button\",[]],[\"static-attr\",\"type\",\"submit\"],[\"static-attr\",\"class\",\"btn btn-primary\"],[\"modifier\",[\"action\"],[[\"get\",[null]],\"submit\"]],[\"flush-element\"],[\"text\",\"\\n  Sign In\\n\"],[\"close-element\"],[\"text\",\"\\n\\n\"],[\"open-element\",\"button\",[]],[\"static-attr\",\"class\",\"btn btn-default\"],[\"modifier\",[\"action\"],[[\"get\",[null]],\"reset\"]],[\"flush-element\"],[\"text\",\"\\n  Cancel\\n\"],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[],\"hasPartials\":false}", "meta": { "moduleName": "employee-forms-auth/templates/components/sign-in-form.hbs" } });
});
define("employee-forms-auth/templates/components/sign-up-form", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "9vS5s19S", "block": "{\"statements\":[[\"append\",[\"helper\",[\"email-input\"],null,[[\"email\"],[[\"get\",[\"credentials\",\"email\"]]]]],false],[\"text\",\"\\n\"],[\"append\",[\"helper\",[\"password-input\"],null,[[\"password\"],[[\"get\",[\"credentials\",\"password\"]]]]],false],[\"text\",\"\\n\"],[\"append\",[\"helper\",[\"password-confirmation-input\"],null,[[\"password\"],[[\"get\",[\"credentials\",\"passwordConfirmation\"]]]]],false],[\"text\",\"\\n\\n\"],[\"open-element\",\"button\",[]],[\"static-attr\",\"type\",\"submit\"],[\"static-attr\",\"class\",\"btn btn-primary\"],[\"modifier\",[\"action\"],[[\"get\",[null]],\"submit\"]],[\"flush-element\"],[\"text\",\"\\n  Sign Up\\n\"],[\"close-element\"],[\"text\",\"\\n\\n\"],[\"open-element\",\"button\",[]],[\"static-attr\",\"class\",\"btn btn-default\"],[\"modifier\",[\"action\"],[[\"get\",[null]],\"reset\"]],[\"flush-element\"],[\"text\",\"\\n  Cancel\\n\"],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[],\"hasPartials\":false}", "meta": { "moduleName": "employee-forms-auth/templates/components/sign-up-form.hbs" } });
});
define("employee-forms-auth/templates/employee-forms", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "EFRnvm1D", "block": "{\"statements\":[[\"open-element\",\"h1\",[]],[\"flush-element\"],[\"text\",\"Employee Forms\"],[\"close-element\"],[\"text\",\"\\n\"],[\"open-element\",\"ul\",[]],[\"flush-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"li\",[]],[\"flush-element\"],[\"text\",\"\\n        \"],[\"block\",[\"link-to\"],[\"employee-forms.w4\"],null,0],[\"text\",\"\\n    \"],[\"close-element\"],[\"text\",\"\\n\"],[\"close-element\"],[\"text\",\"\\n\"],[\"append\",[\"unknown\",[\"outlet\"]],false]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[{\"statements\":[[\"text\",\"Form W-4\"]],\"locals\":[]}],\"hasPartials\":false}", "meta": { "moduleName": "employee-forms-auth/templates/employee-forms.hbs" } });
});
define("employee-forms-auth/templates/employee-forms/w4", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "mghl2C26", "block": "{\"statements\":[[\"open-element\",\"h1\",[]],[\"flush-element\"],[\"text\",\"W4 Upload\"],[\"close-element\"],[\"text\",\"\\n\"],[\"block\",[\"file-upload\"],null,[[\"name\",\"accept\",\"multiple\",\"onfileadd\"],[\"photos\",\"application/pdf\",true,\"upload\"]],0]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[{\"statements\":[[\"text\",\"        \"],[\"open-element\",\"a\",[]],[\"static-attr\",\"tabindex\",\"0\"],[\"flush-element\"],[\"text\",\"Upload your W4\"],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[]}],\"hasPartials\":false}", "meta": { "moduleName": "employee-forms-auth/templates/employee-forms/w4.hbs" } });
});
define("employee-forms-auth/templates/sign-in", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "41NrNLL/", "block": "{\"statements\":[[\"open-element\",\"h2\",[]],[\"flush-element\"],[\"text\",\"Sign In\"],[\"close-element\"],[\"text\",\"\\n\\n\"],[\"append\",[\"helper\",[\"sign-in-form\"],null,[[\"submit\",\"reset\",\"credentials\"],[\"signIn\",\"reset\",[\"get\",[\"model\"]]]]],false],[\"text\",\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[],\"hasPartials\":false}", "meta": { "moduleName": "employee-forms-auth/templates/sign-in.hbs" } });
});
define("employee-forms-auth/templates/sign-up", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "knbGfn6a", "block": "{\"statements\":[[\"open-element\",\"h2\",[]],[\"flush-element\"],[\"text\",\"Sign Up\"],[\"close-element\"],[\"text\",\"\\n\\n\"],[\"append\",[\"helper\",[\"sign-up-form\"],null,[[\"submit\"],[\"signUp\"]]],false],[\"text\",\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[],\"hasPartials\":false}", "meta": { "moduleName": "employee-forms-auth/templates/sign-up.hbs" } });
});
define("employee-forms-auth/templates/users", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "kppq/uEe", "block": "{\"statements\":[[\"open-element\",\"h2\",[]],[\"flush-element\"],[\"text\",\"Users\"],[\"close-element\"],[\"text\",\"\\n\\n\"],[\"open-element\",\"ul\",[]],[\"flush-element\"],[\"text\",\"\\n\"],[\"block\",[\"each\"],[[\"get\",[\"model\"]]],null,0],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[{\"statements\":[[\"text\",\"  \"],[\"open-element\",\"li\",[]],[\"flush-element\"],[\"append\",[\"unknown\",[\"user\",\"email\"]],false],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[\"user\"]}],\"hasPartials\":false}", "meta": { "moduleName": "employee-forms-auth/templates/users.hbs" } });
});


define('employee-forms-auth/config/environment', ['ember'], function(Ember) {
  var prefix = 'employee-forms-auth';
try {
  var metaName = prefix + '/config/environment';
  var rawConfig = document.querySelector('meta[name="' + metaName + '"]').getAttribute('content');
  var config = JSON.parse(unescape(rawConfig));

  var exports = { 'default': config };

  Object.defineProperty(exports, '__esModule', { value: true });

  return exports;
}
catch(err) {
  throw new Error('Could not read config from meta tag with name "' + metaName + '".');
}

});

if (!runningTests) {
  require("employee-forms-auth/app")["default"].create({"name":"employee-forms-auth","version":"0.0.0+614170d3"});
}
//# sourceMappingURL=employee-forms-auth.map
