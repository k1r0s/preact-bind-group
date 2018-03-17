import React from 'react';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var FormGroup = function (_React$Component) {
  _inherits(FormGroup, _React$Component);

  function FormGroup() {
    var _temp, _this, _ret;

    _classCallCheck(this, FormGroup);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, _React$Component.call.apply(_React$Component, [this].concat(args))), _this), _this.state = {}, _temp), _possibleConstructorReturn(_this, _ret);
  }

  FormGroup.prototype.onPropertyChange = function onPropertyChange(change, evt) {
    if (this.props instanceof Object && typeof this.props[FormGroup.watchHandlerAttrName] === "function") {
      this.props[FormGroup.watchHandlerAttrName].call(null, change, evt);
    }
  };

  FormGroup.prototype.componentWillMount = function componentWillMount() {
    if (this.props[FormGroup.preloadStateAttrName]) {
      this.setState(this.props[FormGroup.preloadStateAttrName]);
    }
  };

  FormGroup.prototype.transformChildren = function transformChildren(children) {
    var _this2 = this;

    return children.map(function (child) {
      return FormGroup.mapChildren(child, _this2.onPropertyChange.bind(_this2), _this2.state, _this2.setState.bind(_this2));
    });
  };

  FormGroup.prototype.render = function render() {
    var _props = this.props,
        children = _props.children,
        watch = _props.watch,
        preload = _props.preload,
        rest = _objectWithoutProperties(_props, ["children", "watch", "preload"]);

    return React.createElement("div", rest, [this.transformChildren(children)]);
  };

  FormGroup.extractValue = function extractValue(target) {
    if (target.nodeName === "INPUT" && target.getAttribute("type") === "checkbox") {
      return target.checked;
    } else {
      return target.value;
    }
  };

  FormGroup.createChangeReport = function createChangeReport(child, _ref, setState) {
    var target = _ref.target;

    var change = _defineProperty({}, child.props[FormGroup.bindAttrName], FormGroup.extractValue(target));

    setState(function (state) {
      return _extends({}, state, change);
    });
    return [change, child.props[FormGroup.bindAttrName]];
  };

  FormGroup.getFormProps = function getFormProps(child, state) {
    if (child.props.type === "checkbox") {
      return { checked: state[child.props[FormGroup.bindAttrName]] };
    }

    if (child.props.type === "radio") {
      return {
        checked: state[child.props[FormGroup.bindAttrName]] === child.props.value
      };
    }

    return { value: state[child.props[FormGroup.bindAttrName]] };
  };

  FormGroup.getReactKey = function getReactKey() {
    return FormGroup.key++;
  };

  FormGroup.mapChildren = function mapChildren(child, cbk, state, setState) {
    var _child$props = child.props,
        children = _child$props.children,
        props = _objectWithoutProperties(_child$props, ["children"]);
    //    let newProps = { ...props, key: `fg${FormGroup.getReactKey()}` };


    var newProps = _extends({}, props);
    var newChildren = void 0;

    if (child.props[FormGroup.bindAttrName]) {
      var _extends2;

      newProps = _extends({}, newProps, (_extends2 = {}, _defineProperty(_extends2, newProps[FormGroup.bindAttrEvent] || FormGroup.defaultEvent, function (evt) {
        return cbk.apply(null, [].concat(FormGroup.createChangeReport(child, evt, setState), [evt]));
      }), _defineProperty(_extends2, "name", newProps[FormGroup.bindAttrName]), _extends2), FormGroup.getFormProps(child, state));
    } else if (children instanceof Array) {
      newChildren = children.map(function (nthchild) {
        return FormGroup.mapChildren(nthchild, cbk, state, setState);
      });
    } else if (children instanceof Object) {
      newChildren = FormGroup.mapChildren(children, cbk, state, setState);
    }

    return React.cloneElement(child, newProps, newChildren || children);
  };

  return FormGroup;
}(React.Component);
FormGroup.bindAttrName = "data-bind";
FormGroup.bindAttrEvent = "data-event";
FormGroup.watchHandlerAttrName = "watch";
FormGroup.preloadStateAttrName = "preload";
FormGroup.defaultEvent = "onChange";
FormGroup.key = 0;

export { FormGroup };
