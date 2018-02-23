## preact-bind-group

An event wrapper for preact (soon react) to centralize and simplify events management and state binding.

Check [the demo](https://codesandbox.io/s/wmpv1o4z8).

### Why

React/Preact forms are a bit cryptic because it leads developer to deal with too many language primitives to tie state with fields, care about events and duplicate this pattern for each field.

### How

preact-bind-group exposes a `<BindGroup>` component that looks for children that contain `data-bind` attribute which should be assigned to any element or component that emits an `onChange` event.


### Get started

Install it:

```bash
npm install --save-dev preact-bind-group
```

Import it it in your components and use it:

```jsx
import { render } from "preact";
import { BindGroup } from "preact-bind-group";

const App = () => (
  <div>
    <h3>BindGroup demo</h3>
    <BindGroup watch={(...args) => console.log(args)}>
      <div>
        <input data-bind="name" />
      </div>
      <div>
        <input data-bind="age" />
      </div>
    </BindGroup>
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
  <BindGroup watch={change => this.setState({ ...change })}>
```

If the input element is of type _checkbox_ or _radio_, then it'll receive the checked html property as its value.

For convenience, you'll get a second argument with the field key. The callback signature is _({ [key: string]: any }, key: string) => void_.

### Custom events

You can change the event that `BindGroup` should listen to:

```javascript
  <input data-bind="name" data-event="onInput"/>
```

> Note: keep in mind that `onInput` in Preact === `onChange` in React, and `onChange` in Preact === `onBlur` on React.

#### Preload form with data

You should use `preload` attr to fill form fields with default data

```javascript
<div>
  <h3>BindGroup demo</h3>
  <BindGroup watch={change => console.log(change)} preload={userModel}>
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
  </BindGroup>
</div>
```
