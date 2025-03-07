import defaultTheme from 'tailwindcss/defaultTheme';
// @ts-ignore
import tailwindPlugin from 'tailwindcss/plugin';

export interface Options {
    enabled: boolean,
    ignore: string[],
    selector: string,
    label: string,
    position: ['bottom' | 'top', 'left' | 'right'],
}

export interface Styles {
    content: string,
    [key: string]: any,
}

export const defaultOptions: Options = {
    enabled: !process?.env?.NODE_ENV?.startsWith('prod'),
    ignore: ['dark'],
    selector: 'body',
    label: '{key} ({value})',
    position: ['bottom', 'left'],
};

export const defaultStyles: Styles = {
    content: `'-'`,
    padding: defaultTheme?.spacing?.[2],
    color: defaultTheme?.colors?.['white'],
    fontSize: defaultTheme?.fontSize?.xs[0],
    lineHeight: defaultTheme?.lineHeight?.none,
    fontFamily: `"Source code Pro", ${defaultTheme?.fontFamily?.mono}`,
    boxShadow: defaultTheme?.boxShadow?.md,
    backgroundColor: defaultTheme?.colors?.gray[900],
    borderTopRightRadius: defaultTheme?.borderRadius?.lg,
    position: 'fixed',
    zIndex: 2147483647,
};

interface TailwindPluginParams {
    postcss?: Function,
    addBase: Function,
    addComponents: Function,
    theme: Function,
}

/**
 * Heavily inspired by : https://github.com/jorenvanhee/tailwindcss-debug-screens
 */
export function factory(options: Options = defaultOptions) {
    options = { ...defaultOptions, ...options };

    if (!options?.enabled) {
        return () => {};
    }

    return function plugin(params: TailwindPluginParams) {
        const isV4Plus = typeof params.postcss === 'undefined';

        const screens: { [key: string]: string } = params.theme('screens', {});
        const definedStyles = params.theme('debug.screens', {});
        const styles = {
            ...adjustDefaultStylesBorderRadiusBasedOnOptions(defaultStyles, options),
            [options.position[0]]: 0,
            [options.position[1]]: 0,
            ...definedStyles,
        };

        const components = Object
            .entries(screens)
            .filter(([key]) => !key.startsWith('__')) // V4+, excluding: `__CSS_VALUES__: { sm: 4, md: 4, ... }`.
            .map(([key, value]) => {
                const [width, unit] = value.split(/([a-zA-Z]+)/).filter((item) => !!item.trim());

                return {
                    key,
                    value,
                    unit,
                    width: +width,
                };
            })
            .sort((screenA, screenB) => screenA.width - screenB.width)
            .reduce((acc: any, screen) => {
                if (options.ignore.includes(screen.key)) {
                    return;
                }

                const mediaQuery = isV4Plus
                    ? `@media (width >= ${screen.value})`
                    : `@screen ${screen.key}`;

                const value = screen.unit === 'rem'
                    ? `${screen.width}rem · ${screen.width * 16}px`
                    : screen.value;

                acc[mediaQuery] = {
                    [`${options.selector}::before`]: {
                        content: `"${options.label.replace('{key}', screen.key).replace('{value}', value)}"`,
                    },
                };

                return acc;
            }, { [`${options.selector}::before`]: styles });

        if (isV4Plus) {
            params.addBase(components);
        } else {
            params.addComponents(components);
        }
    };
};

function adjustDefaultStylesBorderRadiusBasedOnOptions(styles: Styles, options: Options): Styles {
    const radiusBlockKey = options.position.includes('top') ? 'Bottom' : 'Top';
    const radiusInlineKey = options.position.includes('left') ? 'Right' : 'Left';

    const _styles = { ...styles };

    delete _styles.borderTopRightRadius;

    return {
        ..._styles,
        [`border${radiusBlockKey}${radiusInlineKey}Radius`]: defaultTheme?.borderRadius?.lg,
    };

}

const plugin = tailwindPlugin.withOptions(
    (options: Options = defaultOptions) => factory(options),
    // (options: Options = defaultOptions) => ({ theme: { debug: { screens: defaultStyles } } }),
);

module.exports.default = plugin;
export default plugin;
