// @ts-ignore
import tailwindPlugin from 'tailwindcss/plugin';
import { factory as debugScreensFactory, Options as debugScreensOptions } from './plugins/screens';
import { factory as debugOutlinesFactory, Options as debugOutlinesOptions } from './plugins/outlines';

interface options {
    screens?: boolean | debugScreensOptions;
    outlines?: boolean | debugOutlinesOptions;
}
interface props {
    postcss?: Function,
    addBase: Function,
    addComponents: Function,
    theme: Function,
}

const index = tailwindPlugin.withOptions((options: options = {}) => {
    return (props: props) => {
        let { screens, outlines } = options;

        if (typeof screens === 'boolean') {
            screens = { enabled: screens } as debugScreensOptions;
        }

        if (typeof outlines === 'boolean') {
            outlines = { enabled: outlines } as debugOutlinesOptions;
        }

        debugScreensFactory(screens)(props);
        debugOutlinesFactory(outlines)(props);
    };
});

export { debugScreensFactory as screensPlugin, debugOutlinesFactory as outlinesPlugin };
export default index;

index.screens = debugScreensFactory;
index.outlines = debugOutlinesFactory;

module.exports = index;
