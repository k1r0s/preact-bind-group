(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('preact')) :
	typeof define === 'function' && define.amd ? define(['exports', 'preact'], factory) :
	(factory((global.bindGroup = {}),global.preact));
}(this, (function (exports,preact) { 'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var BindGroup = function (_Component) {
  _inherits(BindGroup, _Component);

  function BindGroup() {
    _classCallCheck(this, BindGroup);

    return _possibleConstructorReturn(this, (BindGroup.__proto__ || Object.getPrototypeOf(BindGroup)).apply(this, arguments));
  }

  _createClass(BindGroup, [{
    key: "onPropertyChange",
    value: function onPropertyChange(change, evt) {
      if (this.props instanceof Object && typeof this.props[BindGroup.watchHandlerAttrName] === "function") {
        this.props[BindGroup.watchHandlerAttrName].call(null, change, evt);
      }
    }
  }, {
    key: "componentWillMount",
    value: function componentWillMount() {
      if (this.props[BindGroup.preloadStateAttrName]) {
        this.setState(this.props[BindGroup.preloadStateAttrName]);
      }
    }
  }, {
    key: "transformChildren",
    value: function transformChildren(children) {
      var _this2 = this;

      return children.map(function (child) {
        return BindGroup.mapChildren(child, _this2.onPropertyChange.bind(_this2), _this2.state, _this2.setState.bind(_this2));
      });
    }
  }, {
    key: "render",
    value: function render(_ref) {
      var children = _ref.children;

      return preact.h("div", null, [this.transformChildren(children)]);
    }
  }]);

  return BindGroup;
}(preact.Component);

BindGroup.bindAttrName = "data-bind";
BindGroup.bindAttrEvent = "data-event";
BindGroup.watchHandlerAttrName = "watch";
BindGroup.preloadStateAttrName = "preload";

BindGroup.extractValue = function (target) {
  if (target.nodeName === "INPUT" && target.getAttribute("type") === "checkbox") {
    return target.checked;
  } else {
    return target.value;
  }
};

BindGroup.createChangeReport = function (child, _ref2, setState) {
  var target = _ref2.target;


  var change = _defineProperty({}, child.attributes[BindGroup.bindAttrName], BindGroup.extractValue(target));

  setState(function (state) {
    return _extends({}, state, change);
  });
  return [change, child.attributes[BindGroup.bindAttrName]];
};

BindGroup.getFormProps = function (child, state) {
  if (child.attributes.type === "checkbox") {
    return { checked: state[child.attributes[BindGroup.bindAttrName]] };
  }

  if (child.attributes.type === "radio") {
    return { checked: state[child.attributes[BindGroup.bindAttrName]] === child.attributes.value };
  }

  return { value: state[child.attributes[BindGroup.bindAttrName]] };
};

BindGroup.mapChildren = function (child, cbk, state, setState) {
  if (child.attributes instanceof Object && child.attributes[BindGroup.bindAttrName]) {
    var _extends2;

    child.attributes = _extends({}, child.attributes, (_extends2 = {}, _defineProperty(_extends2, child.attributes[BindGroup.bindAttrEvent] || 'onChange', function (evt) {
      return cbk.apply(null, [].concat(_toConsumableArray(BindGroup.createChangeReport(child, evt, setState)), [evt]));
    }), _defineProperty(_extends2, "name", child.attributes[BindGroup.bindAttrName]), _extends2), BindGroup.getFormProps(child, state));
  } else if (child.children instanceof Array && child.children.length) {
    child.children = child.children.map(function (child) {
      return BindGroup.mapChildren(child, cbk, state, setState);
    });
  }
  return child;
};

exports.BindGroup = BindGroup;

Object.defineProperty(exports, '__esModule', { value: true });

})));
