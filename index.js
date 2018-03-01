import { h, Component } from "preact";

export class BindGroup extends Component {
  static bindAttrName = "data-bind";
  static bindAttrEvent = "data-event";
  static watchHandlerAttrName = "watch";
  static preloadStateAttrName = "preload";

  onPropertyChange(change, evt) {
    if (this.props instanceof Object && typeof this.props[BindGroup.watchHandlerAttrName] === "function") {
      this.props[BindGroup.watchHandlerAttrName].call(null, change, evt);
    }
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps[BindGroup.preloadStateAttrName]) {
      this.setState(nextProps[BindGroup.preloadStateAttrName]);
    }
  }

  transformChildren(children) {
    return children.map(child => BindGroup.mapChildren(child, this.onPropertyChange.bind(this), this.state, this.setState.bind(this)));
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
      [child.attributes[BindGroup.bindAttrName]]: BindGroup.extractValue(target)
    };

    setState(state => ({ ...state, ...change }));
    return [change, child.attributes[BindGroup.bindAttrName]];
  }

  static getFormProps(child, state) {
    const drivenValue = typeof child.attributes.value === "string";
    const drivenChecked = typeof child.attributes.checked === "string";

    if (child.attributes.type === "checkbox") {
      return { checked: drivenChecked ? child.attributes.checked : state[child.attributes[BindGroup.bindAttrName]] };
    }

    if (child.attributes.type === "radio") {
      return { checked: drivenChecked ? child.attributes.checked : state[child.attributes[BindGroup.bindAttrName]] === child.attributes.value };
    }

    return { value: drivenValue ? child.attributes.value : state[child.attributes[BindGroup.bindAttrName]] };
  }

  static mapChildren (child, cbk, state, setState) {
    if (child.attributes instanceof Object && child.attributes[BindGroup.bindAttrName]) {
      child.attributes = {
        ...child.attributes,
        [child.attributes[BindGroup.bindAttrEvent] || 'onChange']: evt => cbk.apply(null, [...BindGroup.createChangeReport(child, evt, setState), evt]),
        name: child.attributes[BindGroup.bindAttrName],
        ...BindGroup.getFormProps(child, state)
      }
    } else if (child.children instanceof Array && child.children.length) {
      child.children = child.children.map(child => BindGroup.mapChildren(child, cbk, state, setState));
    }
    return child;
  }
}
