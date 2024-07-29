# pwa-manifest-loader for webpack

[![NPM Version](https://img.shields.io/npm/v/pwa-manifest-loader?style=flat)](https://www.npmjs.com/package/pwa-manifest-loader)


[Progressive Web App
manifest](https://developer.mozilla.org/en-US/docs/Web/Manifest) loader for
webpack, which will load referenced images files.

If you want to write your own PWA manifest, include it in a html file
that's in your build, and have webpack process the image assets from
the manifest then this is the loader for you.

This loader is typically used in combination with
[html-loader](https://webpack.js.org/loaders/html-loader/), (either as part of a
html template for
[HtmlWebpackPlugin](https://webpack.js.org/plugins/html-webpack-plugin/) or as
a html file processed directly by html-loader and exported as a static HTML
file). The loader outputs JSON source as a string including transformed icon
src URLs.

## Install
```sh
npm i --save-dev pwa-manifest-loader
```

## Example
Configure webpack to use the loader by adding a rule to your config:

**webpack.config.js**
```js
module.exports = {
  module: {
    rules: [
      {
        // use pwa-manifest-loader for manifest.json, or app.webmanifest so we can interpret icon URLs.
        test: /manifest.json$\|.webmanifest$/,
        use: 'pwa-manifest-loader'
      },
      // ... other loaders etc
    ],
    // ...
  }
}
```

In any html file processed by [html-loader](https://webpack.js.org/loaders/html-loader/):

**includes/head.html**
```html
<link rel="manifest" href="./manifest.json" />
```

The manifest path should be relative to the html file that includes it. html-loader will replace it with the correct output path in the generated HTML.

[**manifest.json / app.webmanifest**](https://developer.mozilla.org/en-US/docs/Web/Manifest)
```json
{
  "name": "MyApp",
  "short_name": "MyApp",
  "description": "App description etc.",
  "start_url": "/",
  "theme_color": "#ffffff",
  "background_color": "#ffffff",
  "display": "standalone",
  "icons": [
    {
      "src": "./img/icon-32.png",
      "sizes": "32x32"
    },
    {
      "src": "./img/icon-64.png",
      "sizes": "64x64"
    },
    {
      "src": "./img/icon-180.png",
      "sizes": "180x180"
    },
    {
      "src": "./img/icon.svg",
      "sizes": "any",
      "purpose": "any"
    },
    {
      "src": "./img/icon-maskable.svg",
      "sizes": "any",
      "purpose": "maskable"
    }
  ]
}
```
All of the referenced icons will be loaded by your webpack loaders. For
example, if you're using
[ImageMinimizerWebpackPlugin](https://webpack.js.org/plugins/image-minimizer-webpack-plugin/)
you can use `?as=webp&w=180&h=180` on an icon src URL to compile it as a
specific format and size.


## License
Apache-2.0

## Bugs etc?
Open a github issue please :)
