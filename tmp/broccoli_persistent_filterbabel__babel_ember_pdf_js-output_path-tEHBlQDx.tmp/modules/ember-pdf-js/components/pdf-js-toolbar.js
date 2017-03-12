import Ember from 'ember';
import layout from '../templates/components/pdf-js-toolbar';

var Component = Ember.Component;

export default Component.extend({
  layout: layout,

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