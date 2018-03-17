import { h, Component } from "preact";

export class FormGroup extends Component {
  static bindAttrName = "data-bind";
  static bindAttrEvent = "data-event";
  static watchHandlerAttrName = "watch";
  static preloadStateAttrName = "preload";

  onPropertyChange(change, evt) {
    if (this.props instanceof Object && typeof this.props[FormGroup.watchHandlerAttrName] === "function") {
      this.props[FormGroup.watchHandlerAttrName].call(null, change, evt);
    }
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps[FormGroup.preloadStateAttrName]) {
      this.setState(nextProps[FormGroup.preloadStateAttrName]);
    }
  }

  componentWillMount() {
    if(this.props[FormGroup.preloadStateAttrName]) {
      this.setState(this.props[FormGroup.preloadStateAttrName]);
    }
  }

  transformChildren(children) {
    return children.map(child => FormGroup.mapChildren(child, this.onPropertyChange.bind(this), this.state, this.setState.bind(this)));
  }

  render(props) {
    const { children, watch, preload,  ...rest } = props;
    return (
      h("div", rest, [
        this.transformChildren(children)
      ])
    )
  }

  static extractValue(target) {
    if(target.nodeName === "INPUT" && target.getAttribute("type") === "checkbox") {
      return target.checked;
    } else {
      return target.value;
    }
  }

  static createChangeReport(child, { target }, setState) {
    const change = {
      [child.attributes[FormGroup.bindAttrName]]: FormGroup.extractValue(target)
    };

    setState(state => ({ ...state, ...change }));
    return [change, child.attributes[FormGroup.bindAttrName]];
  }

  static getFormProps(child, state) {
    const drivenValue = typeof child.attributes.value === "string";
    const drivenChecked = typeof child.attributes.checked === "string";

    if (child.attributes.type === "checkbox") {
      return { checked: drivenChecked ? child.attributes.checked : state[child.attributes[FormGroup.bindAttrName]] };
    }

    if (child.attributes.type === "radio") {
      return { checked: drivenChecked ? child.attributes.checked : state[child.attributes[FormGroup.bindAttrName]] === child.attributes.value };
    }

    return { value: drivenValue ? child.attributes.value : state[child.attributes[FormGroup.bindAttrName]] };
  }

  static mapChildren (child, cbk, state, setState) {
    if (child.attributes instanceof Object && child.attributes[FormGroup.bindAttrName]) {
      child.attributes = {
        ...child.attributes,
        [child.attributes[FormGroup.bindAttrEvent] || 'onChange']: evt => cbk.apply(null, [...FormGroup.createChangeReport(child, evt, setState), evt]),
        name: child.attributes[FormGroup.bindAttrName],
        ...FormGroup.getFormProps(child, state)
      }
    } else if (child.children instanceof Array && child.children.length) {
      child.children = child.children.map(child => FormGroup.mapChildren(child, cbk, state, setState));
    }
    return child;
  }
}
