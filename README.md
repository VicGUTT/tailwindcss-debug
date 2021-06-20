# A set of debugging helpers for any [TailwindCSS](https://tailwindcss.com) project

This plugin provides you with convenient debugging helpers to use in development.
Here's a quick example:

```js
// tailwind.config.js

module.exports = {
    theme: {
        // ...
    },
    plugins: [
        require('@vicgutt/tailwindcss-debug')({
            screens: {
                //
            },
            outlines: {
                //
            },
        }),

        // Or

        require('@vicgutt/tailwindcss-debug').screens({
            //
        }),
        require('@vicgutt/tailwindcss-debug').outlines({
            //
        }),
    ],
};
```

## Installation

Install the plugin via NPM _(or yarn)_:

``` bash
# Using npm
npm i @vicgutt/tailwindcss-debug

# Using Yarn
yarn add @vicgutt/tailwindcss-debug
```

Then add the plugin to your tailwind.config.js file:

``` js
// tailwind.config.js

module.exports = {
    theme: {
        // ...
    },
    plugins: [
        require('@vicgutt/tailwindcss-debug'),
        // ...
    ],
};
```

## Options

The plugin exposes a few options that may be used to configure the plugin's behaviour.

| Name     | Type                         | Default     | Description |
| -------- | ---------------------------- | ----------- | ----------- |
| screens  | `object\|boolean\|undefined` | `undefined` | Options for the [Screens plugin](#Screens). If false, disables the plugin.
| outlines | `object\|boolean\|undefined` | `undefined` | Options for the [Outlines plugin](#Outlines). If false, disables the plugin.

## Helpers

The wrapper plugin exposes two underlying plugins: **screens** & **outlines**. Each of them may be enabled, disabled, or have their behaviour customized by providing the corresponding plugin option _(see above)_. All resulting CSS styles from those plugins will be added to the **components** layer.

### Screens

_The Screens plugin is heavily inspired by [tailwindcss-debug-screens](https://github.com/jorenvanhee/tailwindcss-debug-screens) and all credits goes to [@jorenvanhee](https://github.com/jorenvanhee)._
_I decided to replicate the feature simply to have better defaults that suits me out of the box._

This plugin adds a small box at the bottom left _(configurable)_ corner of your screen showing you the currently active responsive breakpoint.
Here's a demo of what it does: [http://play.ailwindcss.com/aaaaaaa](http://play.ailwindcss.com/aaaaaaa).

#### Usage

Require the plugin in your Tailwing config:

```js
module.exports = {
    theme: {
        // ...
        debug: {
            screens: {
                // ...
            },
        },
    },
    plugins: [
        require('@vicgutt/tailwindcss-debug')({
            screens: {
                //
            },
        }),

        // Or (same as above)

        require('@vicgutt/tailwindcss-debug').screens({
            //
        }),
    ],
};
```

By default it will style the `::before` pseudo-class of the `body` of the page.

#### Options

| Name     | Type                                     | Default                                       | Description |
| -------- | ---------------------------------------- | --------------------------------------------- | ----------- |
| enabled  | `boolean`                                | `!process?.env?.NODE_ENV?.startsWith('prod')` | Determines whether the plugin should be executed or not.
| ignore   | `string[]`                               | `['dark']`                                    | Set screens to be ignored. Ex.: "md".
| selector | `string`                                 | `'body'`                                      | A valid CSS selector to which the plugin will style it's `::before` pseudo-class.
| label    | `string`                                 | `'{key} ({value})'`                           | The text that will populate the `content: '';` of the pseudo-class. Two placeholders are available: **key** which will be replaced by the screen name _(ex.: sm, md, ...)_ and **value** which will be replaced by the screen value _(ex.: 640px, 768px, ...)_.
| position | `['bottom' \| 'top', 'left' \| 'right']` | `['bottom', 'left']`                          | Specifies where the box should be positioned. The first item of the array should be either `top` or `bottom` and the second either `left` or `right`.

#### Styles customization

To customize the CSS styles of the box, add a `debug.screens` object to your Tailwind theme. Ex.:

```js
{
    theme: {
        // ...
        debug: {
            screens: {
                fontSize: '2rem',
                backgroundColor: '#000',
                // ...
            },
        },
    },
};
```

Please refer to the [src/plugins/screens.ts](https://github.com/VicGUTT/tailwindcss-debug/src/plugins/screens.ts) file to see all the default styles.

### Outlines

_The idea of the Outlines plugin came from [studiometa's debug-outline plugin](https://github.com/studiometa/tailwind-config/blob/509d3c364f98bb96c72c82cce0c9609f8dfe5c16/src/plugins/debug-outline.js) so a big thank you to [@studiometa](https://github.com/studiometa)._

This plugin allows you to visualise your HTML structure by adding colored outlines to elements present in the DOM.
Here's a demo of what it does: [http://play.ailwindcss.com/aaaaaaa](http://play.ailwindcss.com/aaaaaaa).

#### Usage

Require the plugin in your Tailwing config:

```js
module.exports = {
    theme: {
        // ...
        debug: {
            outlines: {
                // ...
            },
        },
    },
    plugins: [
        require('@vicgutt/tailwindcss-debug')({
            outlines: {
                //
            },
        }),

        // Or (same as above)

        require('@vicgutt/tailwindcss-debug').outlines({
            //
        }),
    ],
};
```

Then add the `debug` _(configurable)_ class to any HTML element you'd like to debug.

#### Options

| Name     | Type                                     | Default                                       | Description |
| -------- | ---------------------------------------- | --------------------------------------------- | ----------- |
| enabled  | `boolean`                                | `!process?.env?.NODE_ENV?.startsWith('prod')` | Determines whether the plugin should be executed or not.
| selector | `string`                                 | `'.debug'`                                    | A valid CSS selector on which the plugin will apply styles to all the descendant children.

#### Styles customization

To customize the CSS styles of any element, add a `debug.outlines` object to your Tailwind theme. Ex.:

```js
{
    theme: {
        // ...
        debug: {
            outlines: {
                h1: {
                    outline: `1px solid hsla(23.91, 100%, 50%, 0.5) !important`,
                },
                // ...
            },
        },
    },
};
```

**Outline colors per HTML tag's display type**

| Display type                              | Hue range                                         |
| ----------------------------------------- | ------------------------------------------------- |
| block                                     | { min: 0, max: 59 } _(red - orange)_              |
| inline-block                              | { min: 180, max: 239 } _(cyan - blue)_            |
| inline                                    | { min: 70, max: 120 } _(yellow - green)_          |
| tables _(table-caption, table-cell, ...)_ | { min: 270, max: 299 } _(purple - magenta)_       |
| others                                    | { min: 320, max: 330 } _(magenta'ish - pink'ish)_ |

Please refer to the [src/plugins/outlines.ts](https://github.com/VicGUTT/tailwindcss-debug/src/plugins/outlines.ts) file to see how the default styles are generated.

<!-- ## Changelog

Please see [CHANGELOG](CHANGELOG.md) for more information what has changed recently. -->

## Contributing

If you're interested in contributing to the project, please read our [contributing docs](https://github.com/VicGUTT/tailwindcss-debug/blob/main/.github/CONTRIBUTING.md) **before submitting a pull request**.

## License

The MIT License (MIT). Please see [License File](LICENSE) for more information.
