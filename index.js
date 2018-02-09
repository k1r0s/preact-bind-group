import { h, Component } from "preact";

export default class BindGroup extends Component {

  onPropertyChange(change, evt) {
    if (this.props instanceof Object && typeof this.props[BindGroup.watchHandlerAttrName] === "function") {
      this.props[BindGroup.watchHandlerAttrName].call(null, change, evt);
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

BindGroup.createChangeReport = (child, { target }, setState) => {
  // checkbox
  const change = { name: child.attributes[BindGroup.bindAttrName], value: target.value };
  if (target.nodeName === "INPUT" && target.getAttribute("type") === "checkbox") {
    change.value = target.checked;
  }

  setState(state => ({ ...state, [change.name]: change.value }));
  return [{ [change.name]: change.value }, change.name];
}

BindGroup.mapChildren = (child, cbk, state, setState) => {
  if (child.attributes instanceof Object && child.attributes[BindGroup.bindAttrName]) {
    child.attributes = {
      ...child.attributes,
      [child.attributes[BindGroup.bindAttrEvent] || 'onChange']: evt => cbk.apply(null, [...BindGroup.createChangeReport(child, evt, setState), evt]), 
      name: child.attributes[BindGroup.bindAttrName], value: state[child.attributes[BindGroup.bindAttrName]]
    }
  } else if (child.children instanceof Array && child.children.length) {
    child.children = child.children.map(child => BindGroup.mapChildren(child, cbk, state, setState));
  }
  return child;
}
