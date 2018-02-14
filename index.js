import { h, Component } from "preact";

export class BindGroup extends Component {

  onPropertyChange(change, evt) {
    if (this.props instanceof Object && typeof this.props[BindGroup.watchHandlerAttrName] === "function") {
      this.props[BindGroup.watchHandlerAttrName].call(null, change, evt);
    }
  }

  componentWillMount() {
    if(this.props[BindGroup.preloadStateAttrName]) {
      this.setState(this.props[BindGroup.preloadStateAttrName]);
    }
  }

  transformChildren(children) {
    return children.map(child => BindGroup.mapChildren(child, this.onPropertyChange.bind(this), this.state, this.setState.bind(this)));
  }

  render({ children }) {
    return (
      h("div", null, [
        this.transformChildren(children)
      ])
    )
  }
}


BindGroup.bindAttrName = "data-bind";
BindGroup.bindAttrEvent = "data-event";
BindGroup.watchHandlerAttrName = "watch";
BindGroup.preloadStateAttrName = "preload";

BindGroup.extractValue = target => {
  if(target.nodeName === "INPUT" && target.getAttribute("type") === "checkbox") {
    return target.checked;
  } else {
    return target.value;
  }
}

BindGroup.createChangeReport = (child, { target }, setState) => {

  const change = {
    [child.attributes[BindGroup.bindAttrName]]: BindGroup.extractValue(target)
  };

  setState(state => ({ ...state, ...change }));
  return [change, child.attributes[BindGroup.bindAttrName]];
}

BindGroup.getFormProps = (child, state) => {
  if (child.attributes.type === "checkbox") {
    return { checked: state[child.attributes[BindGroup.bindAttrName]] }
  }

  if (child.attributes.type === "radio") {
    return { checked: state[child.attributes[BindGroup.bindAttrName]] === child.attributes.value }
  }

  return { value: state[child.attributes[BindGroup.bindAttrName]] }
}

BindGroup.mapChildren = (child, cbk, state, setState) => {
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
