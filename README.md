# React Flexible Switch
Easy and Flexible React switches with support for custom styles.


## Demo & Examples

![switch](https://cloud.githubusercontent.com/assets/270688/14726482/870deed8-07d7-11e6-9c78-be337a1159f0.gif)

Live demo: [http://nettofarah.github.io/react-flexible-switch](http://nettofarah.github.io/react-flexible-switch/)
To build the examples locally, run:

```bash
npm install
npm start
```

Then open [`localhost:8000`](http://localhost:8000) in a browser.


## Installation

The easiest way to use react-switch is to install it from NPM and include it in your own React build process (using [Browserify](http://browserify.org), [Webpack](http://webpack.github.io/), etc).

You can also use the standalone build by including `dist/react-switch.js` in your page. If you use this, make sure you have already included React, and it is available as a global variable.

```
npm install react-flexible-switch --save
```


## Usage

Just require 'react-flexible-switch' in your app and include it in your components.

```javascript
const Switch = require('react-flexible-switch');
<Switch />
```

### Properties

```javascript
Switch.propTypes = {
  value: React.PropTypes.bool,

  circleStyles: React.PropTypes.shape({
    onColor: React.PropTypes.string,
    offColor: React.PropTypes.string,
    diameter: React.PropTypes.number
  }),

  labels: React.PropTypes.shape({
    on: React.PropTypes.string,
    off: React.PropTypes.string
  }),

  locked: React.PropTypes.bool,

  onChange: React.PropTypes.func,

  switchStyles: React.PropTypes.shape({
    width: React.PropTypes.number
  })
};
```

#### value
Allows you to start a switch either turned on or off.

```javascript
//On by default
<Switch value={true} />

//Off by default
<Switch value={false} />
```

#### onChange
Allows you to pass in callback for when state changes.
This will allow you to make the switch a controlled component.

```javascript
const onChange = (active) => {
  if (active) {
    console.log('active!')
  } else {
    console.log('inactive!')
  }

  // update your state here
  this.setState({ value: active })
}

<Switch onChange={onChange} />
```

#### Custom Styles
You can style both the circle and switch styles with any css property, with
the addition of `onColor`, `offColor` and `diameter`.


```javascript
// Custom circle colors and size
<Switch circleStyles={{ onColor: 'blue', offColor: 'red' }} />
<Switch circleStyles={{ diameter: 55 }} />
<Switch circleStyles={{ diameter: 20 }} />

// Custom Switch width
<Switch switchStyles={{ width: 50 }} />
<Switch switchStyles={{ width: 200 }} />
```

#### Customzing with CSS classes
You can also style the components using the following css classes:

- `react-flexible-switch`: the main component
- `react-flexible-switch--active`: the main component, when active
- `react-flexible-switch--inactive`: the main component, when inactive
- `react-flexible-switch--sliding`: the main component, during the transition
- `react-flexible-switch-label`: the label component

#### Labels
Labels for the `on` and `off` states can be set by using the `labels` property.

```javascript
<Switch labels={{ on: 'Turned On', off: 'Turned Off' }} />
<Switch labels={{ on: 'On', off: 'Off' }} />
```

#### Blocking User Interaction
In case you need to lock the switch and block user interaction for some reason.

```javascript
<Switch locked />
<Switch active locked />
```

## Development (`src`, `lib` and the build process)

**NOTE:** The source code for the component is in `src`. A transpiled CommonJS version (generated with Babel) is available in `lib` for use with node.js, browserify and webpack. A UMD bundle is also built to `dist`, which can be included without the need for any build system.

To build, watch and serve the examples (which will also watch the component source), run `npm start`. If you just want to watch changes to `src` and rebuild `lib`, run `npm run watch` (this is useful if you are working with `npm link`).

## License
The module is available as open source under the terms of the MIT License.
Copyright (c) 2016 Netto Farah.
