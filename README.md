# Backtrack for JavaScript
![npm](https://img.shields.io/npm/v/backtrack-js)

A simple way to allow browsing history linking.

## Installation
### <img src="https://avatars1.githubusercontent.com/u/22247014?s=200&v=4" width="20" height="20"> Yarn
```bash
$ yarn add backtrack-js
```

### <img src="https://raw.githubusercontent.com/github/explore/80688e429a7d4ef2fca1e82350fe8e3517d3494d/topics/npm/npm.png" width="20" height="20"> NPM
```bash
$ npm install backtrack-js
```

## Usage
1. Assuming you have a back button with `id="universal_back_button"`:
    ```html
    <a href="" id="universal_back_button">Back</a>
    ```

1. On each page load, require and create a new Backtrack instance with the expected `backButtonId`.
    ```javascript
    var Backtrack = require("backtrack-js");
    var backtrack = new Backtrack("universal_back_button");
    ```

1. Call `configureBackButton()` to configure the back button's URL (via `href` attribute) and to pop pages when clicked (via `onClick` attribute).
    ```javascript
    backtrack.configureBackButton();
    ```

1. Call `pushPage()` to push the current page into the history stack so that when the user moves to the next page, clicking the back button, will return the user to the current page.
    ```javascript
    backtrack.pushPage();
    ```

1. That's it! Your back button will now automatically be populated with the previous page's URL.

## Contributing
We'd love to accept your patches and contributions to this project! Checkout [contributing](CONTRIBUTING.md) and [code of conduct](CODE_OF_CONDUCT.md) to learn more.

## License
Refer to the license file.
