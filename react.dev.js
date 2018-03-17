import React from "react";

export class FormGroup extends React.Component {
  static bindAttrName = "data-bind";
  static bindAttrEvent = "data-event";
  static watchHandlerAttrName = "watch";
  static preloadStateAttrName = "preload";
  static defaultEvent = "onChange";
  static key = 0;

  state = {};

  onPropertyChange(change, evt) {
    if (
      this.props instanceof Object &&
      typeof this.props[FormGroup.watchHandlerAttrName] === "function"
    ) {
      this.props[FormGroup.watchHandlerAttrName].call(null, change, evt);
    }
  }

  componentWillMount() {
    if (this.props[FormGroup.preloadStateAttrName]) {
      this.setState(this.props[FormGroup.preloadStateAttrName]);
    }
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps[FormGroup.preloadStateAttrName]) {
      this.setState(nextProps[FormGroup.preloadStateAttrName]);
    }
  }

  transformChildren(children) {
    return children.map(child =>
      FormGroup.mapChildren(
        child,
        this.onPropertyChange.bind(this),
        this.state,
        this.setState.bind(this)
      )
    );
  }

  render() {
    const { children, watch, preload, ...rest } = this.props;
    return React.createElement("div", rest, [this.transformChildren(children)]);
  }

  static extractValue(target) {
    if (
      target.nodeName === "INPUT" &&
      target.getAttribute("type") === "checkbox"
    ) {
      return target.checked;
    } else {
      return target.value;
    }
  }

  static createChangeReport(child, { target }, setState) {
    const change = {
      [child.props[FormGroup.bindAttrName]]: FormGroup.extractValue(target)
    };

    setState(state => ({ ...state, ...change }));
    return [change, child.props[FormGroup.bindAttrName]];
  }

  static getFormProps(child, state) {
    if (child.props.type === "checkbox") {
      return { checked: state[child.props[FormGroup.bindAttrName]] };
    }

    if (child.props.type === "radio") {
      return {
        checked:
          state[child.props[FormGroup.bindAttrName]] === child.props.value
      };
    }

    return { value: state[child.props[FormGroup.bindAttrName]] };
  }

  static getReactKey() {
    return FormGroup.key++;
  }

  static mapChildren(child, cbk, state, setState) {
    const { children, ...props } = child.props;
    //    let newProps = { ...props, key: `fg${FormGroup.getReactKey()}` };
    let newProps = { ...props };
    let newChildren;

    if (child.props[FormGroup.bindAttrName]) {
      newProps = {
        ...newProps,
        [newProps[FormGroup.bindAttrEvent] || FormGroup.defaultEvent]: evt =>
          cbk.apply(null, [
            ...FormGroup.createChangeReport(child, evt, setState),
            evt
          ]),
        name: newProps[FormGroup.bindAttrName],
        ...FormGroup.getFormProps(child, state)
      };
    } else if (children instanceof Array) {
      newChildren = children.map(nthchild =>
        FormGroup.mapChildren(nthchild, cbk, state, setState)
      );
    } else if (children instanceof Object) {
      newChildren = FormGroup.mapChildren(children, cbk, state, setState);
    }

    return React.cloneElement(child, newProps, newChildren || children);
  }
}
