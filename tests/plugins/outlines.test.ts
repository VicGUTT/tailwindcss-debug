// @ts-ignore
import cssMatcher from 'jest-matcher-css';
import generateCss from '../../src/utils/generateCss';
// @ts-ignore
import getFileContents from '../../src/utils/getFileContents';
import plugin from '../../src/plugins/outlines';

// @ts-ignore
const toCss = async (options: object = {}, outlines: object = {}, theme: object = {}) => {
    return await generateCss(
        // @ts-ignore
        plugin(options),
        {
            // @ts-ignore
            theme: {
                ...theme,
                // @ts-ignore
                debug: {
                    outlines: outlines,
                },
            },
        },
        { components: true, utilities: false }
    );
};

expect.extend({
    toMatchCss: cssMatcher,
});

describe('plugins:outlines', () => {
    it('is a TailwindCSS plugin function', () => {
        expect(typeof plugin === 'function').toEqual(true);
        expect(typeof plugin().handler === 'function').toEqual(true);
    });

    it('works | default options | default config', async () => {
        const actual = await toCss();

        // @ts-ignore
        expect(actual).toMatchCss(
            getFileContents('tests/__Fixtures/plugins/outlines/default-options--default-config.css')
        );
    });

    it('works | defined options | defined config', async () => {
        const actual = await toCss(
            {
                selector: '.debug-all',
            },
            {
                body: { display: 'none' },
                article: null,
                nav: undefined,
                aside: false,
            }
        );

        // @ts-ignore
        expect(actual).toMatchCss(
            getFileContents('tests/__Fixtures/plugins/outlines/defined-options--defined-config.css')
        );
    });

    it('can be disabled', async () => {
        const actual = await toCss({ enabled: false });

        expect(actual.trim()).toEqual('');
    });
});
