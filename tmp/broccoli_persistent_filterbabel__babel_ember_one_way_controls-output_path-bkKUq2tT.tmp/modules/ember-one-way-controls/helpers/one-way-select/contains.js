var _slicedToArray = (function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i['return']) _i['return'](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError('Invalid attempt to destructure non-iterable instance'); } }; })();

export { contains };
import Ember from 'ember';

var emberArray = Ember.A;
var Helper = Ember.Helper;
var isArray = Ember.isArray;
var isPresent = Ember.isPresent;
var get = Ember.get;

function contains(_ref) {
  var _ref2 = _slicedToArray(_ref, 4);

  var haystack = _ref2[0];
  var needle = _ref2[1];
  var valuePath = _ref2[2];
  var targetPath = _ref2[3];

  if (isArray(haystack)) {
    haystack = emberArray(haystack);

    if (valuePath) {
      haystack = targetPath ? haystack : haystack.mapBy(valuePath);
      return emberArray(haystack).includes(get(needle, valuePath));
    } else {
      return haystack.includes(needle);
    }
  } else {
    if (valuePath && isPresent(haystack) && isPresent(needle)) {
      haystack = targetPath ? haystack : get(haystack, valuePath);
      return haystack === get(needle, valuePath);
    } else {
      return haystack === needle;
    }
  }
}

export default Helper.helper(contains);