# Toasteo JS
A simple Toast package that is lightweight (5kb~) with zero dependencies written in vanilla JS

## Getting started
#### [Install from npm](https://www.npmjs.com/package/toasteo)
```
npm install --save-dev toasteo
```

#### In your JS file
```
import Toasteo from "toasteo";
window.Toasteo = new Toasteo({});
```

#### In your SCSS file
```
import "~toasteo/dist/css/toasteo.css";
```

#### Using the UMD
A UMD version is available in case you are not using webpack or babel.
This version has not been compiled to ES5, you should therefor check if your browser supports ES6.
You can import it using the following script:
```
<script src="/node_modules/toasteo/dist/js/toasteo.umd.js"></script>
<script>window.Toasteo = new Toasteo({});</script>
<script src="/node_modules/toasteo/dist/css/toasteo.css"></script>
```

## Basic usage
There is four toasts ready to be used, a success toast, an error toast, a warning toast and an info toast. They all use the same syntax, the only difference is the style applied.

```
window.Toasteo.success('My success toast');
window.Toasteo.error('My error toast');
window.Toasteo.warning('My warning toast');
window.Toasteo.info('My info toast');
```

This all works by default using the provided CSS.

## Options
You can change the default options when initializing the package.
```
window.Toasteo = new Toasteo(options};
```

| Option | Description | Default |
|:-------------|:-------------|:-----|
| prependTo     | The dom element that the toast notification will be prepended to. | `document.body.childNodes[0]` |
|  duration  | The duration after which the toast will be removed.      |   `4000` (ms) |
| animateOnRemoving | Animate the toast when removing it by adding a CSS class. | `true` |
| animationRemovingDuration | The duration of the remove animation in milliseconds, after which the toast will be removed from the DOM | `400` |
| animateOnCreation | Animate the toast when creating it by adding a CSS class. | `true` |
| closeOnClick | The toast should be removed when clicked. | `true` |
| classes | The default classes used by the package. Please see below for the explaination and default values. |  |


| Class | Description | Default |
|:-------------|:-------------|:-----|
| container | The class set to the toasts container | `toast-container` |
| default | The class set to every toast | `toast` |
| closing | The class set to a toast when using the close method | `toast--closing` |
| creating | The class set to a toast when creating it | `toast--creating` |
| success | The class set to a toast with the success type | `toast--success` |
| error | The class set to a toast with the error type | `toast--error` |
| warning | The class set to a toast with the warning type | `toast--warning` |
| info | The class set to a toast with the info type | `toast--info` |

## Demo & Documentation
You can see Toasteo in action on the [demo page](https://fhusquinet.github.io/toasteo-js/) as well as a better documentation.