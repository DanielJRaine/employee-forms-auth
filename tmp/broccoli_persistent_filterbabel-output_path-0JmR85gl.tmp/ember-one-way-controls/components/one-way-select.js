define('ember-one-way-controls/components/one-way-select', ['exports', 'ember', 'ember-one-way-controls/templates/components/one-way-select', 'ember-one-way-controls/-private/dynamic-attribute-bindings', 'ember-invoke-action'], function (exports, _ember, _emberOneWayControlsTemplatesComponentsOneWaySelect, _emberOneWayControlsPrivateDynamicAttributeBindings, _emberInvokeAction) {
  'use strict';

  var emberArray = _ember['default'].A;
  var Component = _ember['default'].Component;
  var computed = _ember['default'].computed;
  var _Ember$computed = _ember['default'].computed;
  var alias = _Ember$computed.alias;
  var empty = _Ember$computed.empty;
  var not = _Ember$computed.not;
  var or = _Ember$computed.or;
  var EmberObject = _ember['default'].Object;
  var get = _ember['default'].get;
  var isArray = _ember['default'].isArray;
  var isBlank = _ember['default'].isBlank;
  var isNone = _ember['default'].isNone;
  var isPresent = _ember['default'].isPresent;
  var set = _ember['default'].set;
  var w = _ember['default'].String.w;

  var OneWaySelectComponent = Component.extend(_emberOneWayControlsPrivateDynamicAttributeBindings['default'], {
    layout: _emberOneWayControlsTemplatesComponentsOneWaySelect['default'],
    tagName: 'select',

    NON_ATTRIBUTE_BOUND_PROPS: ['value', 'update', 'options', 'paramValue', 'prompt', 'promptIsSelectable', 'includeBlank', 'optionValuePath', 'optionLabelPath', 'optionComponent', 'groupLabelPath'],

    attributeBindings: ['multiple'],

    didReceiveAttrs: function didReceiveAttrs() {
      this._super.apply(this, arguments);

      var value = get(this, 'paramValue');
      if (value === undefined) {
        value = get(this, 'value');
      }

      set(this, 'selectedValue', value);

      var options = get(this, 'options');
      if (typeof options === 'string') {
        options = w(options);
      }

      var firstOption = get(emberArray(options), 'firstObject');
      if (firstOption && isPresent(get(firstOption, 'groupName')) && isArray(get(firstOption, 'options'))) {
        set(this, 'optionsArePreGrouped', true);
      }

      if (isBlank(get(this, 'promptIsSelectable'))) {
        set(this, 'promptIsSelectable', false);
      }

      set(this, 'options', emberArray(options));
    },

    nothingSelected: empty('selectedValue'),
    promptIsDisabled: not('promptIsSelectable'),
    hasGrouping: or('optionsArePreGrouped', 'groupLabelPath'),
    computedOptionValuePath: or('optionValuePath', 'optionTargetPath'),

    optionGroups: computed('options.[]', function () {
      var groupLabelPath = get(this, 'groupLabelPath');
      var options = get(this, 'options');
      var groups = emberArray();

      if (!groupLabelPath) {
        return options;
      }

      options.forEach(function (item) {
        var label = get(item, groupLabelPath);

        if (label) {
          var group = groups.findBy('groupName', label);

          if (group == null) {
            group = EmberObject.create({
              groupName: label,
              options: emberArray()
            });

            groups.pushObject(group);
          }

          get(group, 'options').pushObject(item);
        } else {
          groups.pushObject(item);
        }
      });

      return groups;
    }),

    change: function change() {
      var value = undefined;

      if (get(this, 'multiple') === true) {
        value = this._selectedMultiple();
      } else {
        value = this._selectedSingle();
      }

      (0, _emberInvokeAction.invokeAction)(this, 'update', value);
    },

    prompt: alias('includeBlank'),

    _selectedMultiple: function _selectedMultiple() {
      var _this = this;

      var selectedValues = this.$().val() || [];

      return selectedValues.map(function (selectedValue) {
        return _this._findOption(selectedValue);
      });
    },

    _selectedSingle: function _selectedSingle() {
      var selectedValue = this.$().val();
      return this._findOption(selectedValue);
    },

    _findOption: function _findOption(value) {
      var options = get(this, 'options');
      var optionValuePath = get(this, 'computedOptionValuePath');
      var optionTargetPath = get(this, 'optionTargetPath');
      var optionsArePreGrouped = get(this, 'optionsArePreGrouped');

      var findOption = function findOption(item) {
        if (optionValuePath) {
          return '' + get(item, optionValuePath) === value;
        } else {
          return '' + item === value;
        }
      };

      var foundOption = undefined;
      if (optionsArePreGrouped) {
        foundOption = options.reduce(function (found, group) {
          return found || get(group, 'options').find(findOption);
        }, undefined);
      } else {
        foundOption = options.find(findOption);
      }

      if (optionTargetPath && !isNone(foundOption)) {
        return get(foundOption, optionTargetPath);
      } else {
        return foundOption;
      }
    }
  });

  OneWaySelectComponent.reopenClass({
    positionalParams: ['paramValue']
  });

  exports['default'] = OneWaySelectComponent;
});