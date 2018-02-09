## Preact bind-group

# WIP DISCLAIMER :fire:

#### What

`<BindGroup />` its a event wrapper for preact (soon react) to centralize and simplify events management and state binding

#### Why

React/Preact forms are a bit cryptic because it leads developer to deal with too many language primitives to tie state with fields, care about events and duplicate this pattern for each field.

#### How

If you check the code u will see that is seeking into its children that contain `data-bind` attribute. Those children are intended to be "fields" with some change that you may track and some property that should be tied to the state value.

BindGroup keeps an internal state to internally track these values.


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
