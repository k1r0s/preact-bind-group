(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('preact')) :
	typeof define === 'function' && define.amd ? define(['exports', 'preact'], factory) :
	(factory((global.bindGroup = {}),global.preact));
}(this, (function (exports,preact) { 'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var BindGroup = function (_Component) {
  _inherits(BindGroup, _Component);

  function BindGroup() {
    _classCallCheck(this, BindGroup);

    return _possibleConstructorReturn(this, _Component.apply(this, arguments));
  }

  BindGroup.prototype.onPropertyChange = function onPropertyChange(change, evt) {
    if (this.props instanceof Object && typeof this.props[BindGroup.watchHandlerAttrName] === "function") {
      this.props[BindGroup.watchHandlerAttrName].call(null, change, evt);
    }
  };

  BindGroup.prototype.componentWillMount = function componentWillMount() {
    if (this.props[BindGroup.preloadStateAttrName]) {
      this.setState(this.props[BindGroup.preloadStateAttrName]);
    }
  };

  BindGroup.prototype.transformChildren = function transformChildren(children) {
    var _this2 = this;

    return children.map(function (child) {
      return BindGroup.mapChildren(child, _this2.onPropertyChange.bind(_this2), _this2.state, _this2.setState.bind(_this2));
    });
  };

  BindGroup.prototype.render = function render(props) {
    var children = props.children,
        watch = props.watch,
        preload = props.preload,
        rest = _objectWithoutProperties(props, ["children", "watch", "preload"]);

    return preact.h("div", rest, [this.transformChildren(children)]);
  };

  BindGroup.extractValue = function extractValue(target) {
    if (target.nodeName === "INPUT" && target.getAttribute("type") === "checkbox") {
      return target.checked;
    } else {
      return target.value;
    }
  };

  BindGroup.createChangeReport = function createChangeReport(child, _ref, setState) {
    var target = _ref.target;

    var change = _defineProperty({}, child.attributes[BindGroup.bindAttrName], BindGroup.extractValue(target));

    setState(function (state) {
      return _extends({}, state, change);
    });
    return [change, child.attributes[BindGroup.bindAttrName]];
  };

  BindGroup.getFormProps = function getFormProps(child, state) {
    if (child.attributes.type === "checkbox") {
      return { checked: state[child.attributes[BindGroup.bindAttrName]] };
    }

    if (child.attributes.type === "radio") {
      return { checked: state[child.attributes[BindGroup.bindAttrName]] === child.attributes.value };
    }

    return { value: state[child.attributes[BindGroup.bindAttrName]] };
  };

  BindGroup.mapChildren = function mapChildren(child, cbk, state, setState) {
    if (child.attributes instanceof Object && child.attributes[BindGroup.bindAttrName]) {
      var _extends2;

      child.attributes = _extends({}, child.attributes, (_extends2 = {}, _defineProperty(_extends2, child.attributes[BindGroup.bindAttrEvent] || 'onChange', function (evt) {
        return cbk.apply(null, [].concat(BindGroup.createChangeReport(child, evt, setState), [evt]));
      }), _defineProperty(_extends2, "name", child.attributes[BindGroup.bindAttrName]), _extends2), BindGroup.getFormProps(child, state));
    } else if (child.children instanceof Array && child.children.length) {
      child.children = child.children.map(function (child) {
        return BindGroup.mapChildren(child, cbk, state, setState);
      });
    }
    return child;
  };

  return BindGroup;
}(preact.Component);
BindGroup.bindAttrName = "data-bind";
BindGroup.bindAttrEvent = "data-event";
BindGroup.watchHandlerAttrName = "watch";
BindGroup.preloadStateAttrName = "preload";

exports.BindGroup = BindGroup;

Object.defineProperty(exports, '__esModule', { value: true });

})));
