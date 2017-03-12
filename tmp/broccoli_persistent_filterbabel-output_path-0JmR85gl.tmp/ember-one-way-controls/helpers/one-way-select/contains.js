define('ember-one-way-controls/helpers/one-way-select/contains', ['exports', 'ember'], function (exports, _ember) {
  'use strict';

  var _slicedToArray = (function () {
    function sliceIterator(arr, i) {
      var _arr = [];var _n = true;var _d = false;var _e = undefined;try {
        for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
          _arr.push(_s.value);if (i && _arr.length === i) break;
        }
      } catch (err) {
        _d = true;_e = err;
      } finally {
        try {
          if (!_n && _i['return']) _i['return']();
        } finally {
          if (_d) throw _e;
        }
      }return _arr;
    }return function (arr, i) {
      if (Array.isArray(arr)) {
        return arr;
      } else if (Symbol.iterator in Object(arr)) {
        return sliceIterator(arr, i);
      } else {
        throw new TypeError('Invalid attempt to destructure non-iterable instance');
      }
    };
  })();

  exports.contains = contains;

  var emberArray = _ember['default'].A;
  var Helper = _ember['default'].Helper;
  var isArray = _ember['default'].isArray;
  var isPresent = _ember['default'].isPresent;
  var get = _ember['default'].get;

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

  exports['default'] = Helper.helper(contains);
});