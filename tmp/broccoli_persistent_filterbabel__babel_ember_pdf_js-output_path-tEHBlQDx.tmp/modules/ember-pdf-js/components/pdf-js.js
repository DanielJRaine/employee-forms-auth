var _slicedToArray = (function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i['return']) _i['return'](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError('Invalid attempt to destructure non-iterable instance'); } }; })();

/* global PDFJS */
import Ember from 'ember';
import layout from '../templates/components/pdf-js';

var _PDFJS = PDFJS;
var PDFFindController = _PDFJS.PDFFindController;
var PDFHistory = _PDFJS.PDFHistory;
var PDFLinkService = _PDFJS.PDFLinkService;
var PDFViewer = _PDFJS.PDFViewer;
var Component = Ember.Component;
var reads = Ember.computed.reads;
var injectService = Ember.inject.service;
var observer = Ember.observer;
var run = Ember.run;

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

export default Component.extend({
  layout: layout,
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