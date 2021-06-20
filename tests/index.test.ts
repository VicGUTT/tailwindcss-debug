// @ts-ignore
import cssMatcher from 'jest-matcher-css';
import generateCss from '../src/utils/generateCss';
import getFileContents from '../src/utils/getFileContents';
import { factory as debugScreensFactory } from '../src/plugins/screens';
import { factory as debugOutlinesFactory } from '../src/plugins/outlines';
import plugin from '../src/index';

// @ts-ignore
const toCss = async (options: object = {}, debug: object = {}, theme: object = {}) => {
    return await generateCss(
        // @ts-ignore
        plugin(options),
        {
            // @ts-ignore
            theme: {
                ...theme,
                // @ts-ignore
                debug: debug,
            },
        },
        { components: true, utilities: false }
    );
};

expect.extend({
    toMatchCss: cssMatcher,
});

describe('index', () => {
    it('is a TailwindCSS plugin function', () => {
        expect(typeof plugin === 'function').toEqual(true);
        expect(typeof plugin().handler === 'function').toEqual(true);
    });

    it('is exposes the underlaying plugin functions', () => {
        const { screens, outlines } = require('../src/index');
        
        expect(typeof screens === 'function').toEqual(true);
        expect(typeof outlines === 'function').toEqual(true);

        expect(typeof screens() === 'function').toEqual(true);
        expect(typeof outlines() === 'function').toEqual(true);

        expect(screens).toEqual(debugScreensFactory);
        expect(outlines).toEqual(debugOutlinesFactory);
    });

    it('works', async () => {
        let actual = await toCss();

        // @ts-ignore
        expect(actual).toMatchCss(
            getFileContents('tests/__Fixtures/plugins/screens/default-options--default-config.css') +
                getFileContents('tests/__Fixtures/plugins/outlines/default-options--default-config.css')
        );

        actual = await toCss({ screens: false });

        // @ts-ignore
        expect(actual).toMatchCss(
            getFileContents('tests/__Fixtures/plugins/outlines/default-options--default-config.css')
        );

        actual = await toCss({ outlines: false });

        // @ts-ignore
        expect(actual).toMatchCss(
            getFileContents('tests/__Fixtures/plugins/screens/default-options--default-config.css')
        );

        actual = await toCss({ screens: false, outlines: false });

        // @ts-ignore
        expect(actual.trim()).toMatchCss('');

        actual = await toCss({ screens: { label: 'Yolo: {key}|{value}' } });

        // @ts-ignore
        expect(actual.includes('content: "Yolo: 2xl|1536px"')).toEqual(true);

        actual = await toCss({ outlines: { selector: '.debug-all-yo' } });

        // @ts-ignore
        expect(actual.includes('.debug-all-yo h1 {')).toEqual(true);
    });
});
