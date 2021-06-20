// @ts-ignore
import tailwindPlugin from 'tailwindcss/plugin';
import generateHtmlTagOutlineColors from '../utils/generateHtmlTagOutlineColors';

export interface Options {
    enabled: boolean;
    selector: string;
}

export interface Styles {
    [key: string]: any;
}

export const defaultOptions: Options = {
    enabled: !process?.env?.NODE_ENV?.startsWith('prod'),
    selector: '.debug',
};

export const defaultStyles: Styles = {
    '*:after, *:before': { outline: '1px solid #F9A8D4 !important' }, // colors.pink[300]
    ...generateHtmlTagOutlineColors(),
};

/**
 * Original idea by : https://github.com/studiometa/tailwind-config/blob/509d3c364f98bb96c72c82cce0c9609f8dfe5c16/src/plugins/debug-outline.js
 */
export function factory(options: Options = defaultOptions) {
    options = { ...defaultOptions, ...options };

    if (!options?.enabled) {
        return () => {};
    }

    return function plugin({ addComponents, theme }: { addComponents: Function; theme: Function }) {
        const definedStyles = theme('debug.outlines', {});
        const styles = {
            ...defaultStyles,
            ...definedStyles,
        };

        addComponents({ [options.selector]: styles });
    };
}

const plugin = tailwindPlugin.withOptions(
    (options: Options = defaultOptions) => factory(options)
    // (options: Options = defaultOptions) => ({ theme: { debug: { outlines: defaultStyles } } }),
);

module.exports.default = plugin;
export default plugin;
