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

/**
 * Heavily inspired by : https://github.com/jorenvanhee/tailwindcss-debug-screens
 */
export function factory(options: Options = defaultOptions) {
    options = { ...defaultOptions, ...options };

    if (!options?.enabled) {
        return () => {};
    }

    return function plugin({ addComponents, theme }: { addComponents: Function, theme: Function }) {
        const screens: { [key: string]: string } = theme('screens', {});
        const definedStyles = theme('debug.screens', {});
        const styles = {
            ...defaultStyles,
            [options.position[0]]: 0,
            [options.position[1]]: 0,
            ...definedStyles,
        };

        const components = Object
            .entries(screens)
            .sort(([, valueA], [, valueB]) => +valueA.replace('px', '') - +valueB.replace('px', ''))
            .reduce((acc: any, [key, value]) => {
                if (options.ignore.includes(key)) {
                    return;
                }

                acc[`@screen ${key}`] = {
                    [`${options.selector}::before`]: {
                        content: `"${options.label.replace('{key}', key).replace('{value}', value)}"`,
                    },
                };

                return acc;
            }, { [`${options.selector}::before`]: styles });

        addComponents(components);
    };
};

const plugin = tailwindPlugin.withOptions(
    (options: Options = defaultOptions) => factory(options),
    // (options: Options = defaultOptions) => ({ theme: { debug: { screens: defaultStyles } } }),
);

module.exports.default = plugin;
export default plugin;