import { h, Component } from 'preact';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var FormGroup = function (_Component) {
  _inherits(FormGroup, _Component);

  function FormGroup() {
    _classCallCheck(this, FormGroup);

    return _possibleConstructorReturn(this, _Component.apply(this, arguments));
  }

  FormGroup.prototype.onPropertyChange = function onPropertyChange(change, evt) {
    if (this.props instanceof Object && typeof this.props[FormGroup.watchHandlerAttrName] === "function") {
      this.props[FormGroup.watchHandlerAttrName].call(null, change, evt);
    }
  };

  FormGroup.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
    if (nextProps[FormGroup.preloadStateAttrName]) {
      this.setState(nextProps[FormGroup.preloadStateAttrName]);
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

  FormGroup.prototype.render = function render(props) {
    var children = props.children,
        watch = props.watch,
        preload = props.preload,
        rest = _objectWithoutProperties(props, ["children", "watch", "preload"]);

    return h("div", rest, [this.transformChildren(children)]);
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

    var change = _defineProperty({}, child.attributes[FormGroup.bindAttrName], FormGroup.extractValue(target));

    setState(function (state) {
      return _extends({}, state, change);
    });
    return [change, child.attributes[FormGroup.bindAttrName]];
  };

  FormGroup.getFormProps = function getFormProps(child, state) {
    var drivenValue = typeof child.attributes.value === "string";
    var drivenChecked = typeof child.attributes.checked === "string";

    if (child.attributes.type === "checkbox") {
      return { checked: drivenChecked ? child.attributes.checked : state[child.attributes[FormGroup.bindAttrName]] };
    }

    if (child.attributes.type === "radio") {
      return { checked: drivenChecked ? child.attributes.checked : state[child.attributes[FormGroup.bindAttrName]] === child.attributes.value };
    }

    return { value: drivenValue ? child.attributes.value : state[child.attributes[FormGroup.bindAttrName]] };
  };

  FormGroup.mapChildren = function mapChildren(child, cbk, state, setState) {
    if (child.attributes instanceof Object && child.attributes[FormGroup.bindAttrName]) {
      var _extends2;

      child.attributes = _extends({}, child.attributes, (_extends2 = {}, _defineProperty(_extends2, child.attributes[FormGroup.bindAttrEvent] || 'onChange', function (evt) {
        return cbk.apply(null, [].concat(FormGroup.createChangeReport(child, evt, setState), [evt]));
      }), _defineProperty(_extends2, "name", child.attributes[FormGroup.bindAttrName]), _extends2), FormGroup.getFormProps(child, state));
    } else if (child.children instanceof Array && child.children.length) {
      child.children = child.children.map(function (child) {
        return FormGroup.mapChildren(child, cbk, state, setState);
      });
    }
    return child;
  };

  return FormGroup;
}(Component);
FormGroup.bindAttrName = "data-bind";
FormGroup.bindAttrEvent = "data-event";
FormGroup.watchHandlerAttrName = "watch";
FormGroup.preloadStateAttrName = "preload";

export { FormGroup };
