// @ts-ignore
import cssMatcher from 'jest-matcher-css';
import generateCss from '../../src/utils/generateCss';
import getFileContents from '../../src/utils/getFileContents';
import plugin from '../../src/plugins/screens';

// @ts-ignore
const toCss = async (options: object = {}, screens: object = {}, theme: object = {}) => {
    return await generateCss(
        // @ts-ignore
        plugin(options),
        {
            // @ts-ignore
            theme: {
                ...theme,
                // @ts-ignore
                debug: {
                    screens: screens,
                },
            },
        },
        { components: true, utilities: false }
    );
};

expect.extend({
    toMatchCss: cssMatcher,
});

describe('plugins:screens', () => {
    it('is a TailwindCSS plugin function', () => {
        expect(typeof plugin === 'function').toEqual(true);
        expect(typeof plugin().handler === 'function').toEqual(true);
    });

    it('works | default options | default config', async () => {
        const actual = await toCss();

        // @ts-ignore
        expect(actual).toMatchCss(
            getFileContents('tests/__Fixtures/plugins/screens/default-options--default-config.css')
        );
    });

    it('works | defined options | defined config | defined theme', async () => {
        const actual = await toCss(
            {
                selector: '.debug-screen',
                label: 'Screen: {key}|{value}',
                ignore: ['other'],
                position: ['top', 'right'],
            },
            {
                content: "'*'",
                right: '100%',
                bottom: '5px',
                padding: '30em',
                color: 'red',
                fontFamily: "'Yolo'",
                fontSize: null,
                lineHeight: false,
                position: undefined,
                zIndex: 1,
            },
            {
                screens: {
                    abc: '10px',
                    xyz: '777px',
                    '3xl': '1920px',
                },
            }
        );

        // @ts-ignore
        expect(actual).toMatchCss(
            getFileContents('tests/__Fixtures/plugins/screens/defined-options--defined-config--defined-theme.css')
        );
    });

    it('can be disabled', async () => {
        const actual = await toCss({ enabled: false });

        expect(actual.trim()).toEqual('');
    });
});
