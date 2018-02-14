## Preact bind-group

#### What

`<BindGroup />` its a event wrapper for preact (soon react) to centralize and simplify events management and state binding.

#### Why

React/Preact forms are a bit cryptic because it leads developer to deal with too many language primitives to tie state with fields, care about events and duplicate this pattern for each field.

#### How

If you check the code u will see that is seeking into its children that contain `data-bind` attribute. Those children are intended to be "fields" with some change that you may track and some property that should be tied to the state value.

BindGroup keeps an internal state to internally track these values.

BindGroup supports any control field that uses `onChange` to deal with changes and it does by default, but additionally you can provide other event reporter with `data-event` as follows:

```javascript
<input data-bind="value0" data-event="onInput"/>
```

#### Usage


```javascript
<div>
  <h3>BindGroup demo</h3>
  <BindGroup watch={change => console.log(change)}>
    <div>
      <input data-bind="value0"/>
    </div>
    <div>
      <input data-bind="value1"/>
    </div>
    <div>
      <input data-bind="value2"/>
    </div>
    <div>
      <input data-bind="value3"/>
    </div>
  </BindGroup>
</div>
```
If you change any input value you should see this on the console:

```
 {value0: "asdas"}
 {value2: "asdasdas"}
 {value1: "asdasdasdas"}
 {value3: "asdasdas"}
```

Then you can update your state easily:

```
render() {
  ...
  <BindGroup watch={change => this.setState({ ...change })}>
  ...
}
```

This is the signature of the `watch` callback: ({ [key: string]: any }, key: string) => void

If you need to perform any other actions, like validation or something, you can use 2nd argument instead.

#### preload form with data

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
