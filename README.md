## preact-bind-group

[![downloads](https://img.shields.io/npm/dm/preact-bind-group.svg)](https://www.npmjs.com/package/preact-bind-group)
[![version](https://img.shields.io/npm/v/preact-bind-group.svg)](https://www.npmjs.com/package/preact-bind-group/)
[![dependencies](https://david-dm.org/k1r0s/preact-bind-group/status.svg)](https://david-dm.org/k1r0s/preact-bind-group/status.svg)
[![dev-dependencies](https://david-dm.org/k1r0s/preact-bind-group/dev-status.svg)](https://www.npmjs.com/package/preact-bind-group)


An event wrapper for preact and react to centralize and simplify events management and state binding.

[![Edit preact-bind-group example](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/6v861168y3)

breaking changes since version 2.*

- React is now supported. Just import from "preact-bind-group/react"
- `BindGroup` component has been renamed to `FormGroup`

### Why

React/Preact forms are a bit cryptic because it leads developer to deal with too many language primitives to tie state with fields, care about events and duplicate this pattern for each field.

### How

preact-bind-group exposes a `<FormGroup>` component that looks for children that contain `data-bind` attribute which should be assigned to any element or component that emits an `onChange` event.


### Get started

Install it:

```bash
npm install preact-bind-group
```

Import it it in your components and use it:

```jsx
import { render } from "preact";
import { FormGroup } from "preact-bind-group";

const App = () => (
  <div>
    <h3>FormGroup demo</h3>
    <FormGroup watch={change => console.log(change)}>
      <label>
        Name: <input data-bind="name" />
      </label>
      <br />
      <label>
        Age: <input data-bind="age" />
      </label>
    </FormGroup>
  </div>
);
```

### Watch callback

The `watch` callback receives an `{key: value}` object containing the changed property as its parameter.

```
 {name: "asdas"}
```

Then you can update your state easily:

```jsx
  <FormGroup watch={change => this.setState({ ...change })}>
```

If the input element is of type _checkbox_ or _radio_, then it'll receive the checked html property as its value.

For convenience, you'll get a second argument with the field key. The callback signature is _({ [key: string]: any }, key: string) => void_.

### Custom events

You can change the event that `FormGroup` should listen to:

```javascript
  <input data-bind="name" data-event="onInput"/>
```

> Note: keep in mind that `onInput` in Preact === `onChange` in React, and `onChange` in Preact === `onBlur` on React.

#### Preload form with data

You should use `preload` attr to fill form fields with default data

```javascript
<div>
  <h3>FormGroup demo</h3>
  <FormGroup watch={change => console.log(change)} preload={userModel}>
    <div>
      <input data-bind="name"/>
    </div>
    <div>
      <input data-bind="likesPizza" type="checkbox"/>
    </div>
    <div>
      <input data-bind="belovedFood" type="radio" value="potato"/>
      <input data-bind="belovedFood" type="radio" value="banana"/>
      <input data-bind="belovedFood" type="radio" value="peanuts"/>
    </div>
    <div>
      <textarea data-bind="comments"/>
    </div>
  </FormGroup>
</div>
```
