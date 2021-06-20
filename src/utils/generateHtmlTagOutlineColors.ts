import htmlTags, { Tag } from '../resources/htmlTags';

enum displayType {
    'block' = 'block',
    'inlineBlock' = 'inlineBlock',
    'inline' = 'inline',
    'tables' = 'tables',
    'others' = 'others',
}

const tagDisplayTypeHueRanges: { [key in displayType]: { min: number; max: number } } = {
    block: { min: 0, max: 59 }, // red - orange
    inlineBlock: { min: 180, max: 239 }, // cyan - blue
    inline: { min: 70, max: 120 }, // yellow - green
    tables: { min: 270, max: 299 }, // purple - magenta
    others: { min: 320, max: 330 }, // magenta'ish - pink'ish
};
const filteredTags: { [key in displayType]: Tag[] } = {
    block: htmlTags.filter((tag) => tag.display === 'block'),
    inlineBlock: htmlTags.filter((tag) => tag.display === 'inline-block'),
    inline: htmlTags.filter((tag) => tag.display === 'inline'),
    tables: htmlTags.filter((tag) => tag.display.startsWith('table')),
    others: htmlTags.filter(
        (tag) => !tag.display.startsWith('table') && !['block', 'inline-block', 'inline'].includes(tag.display)
    ),
};

const tags = Object.entries(filteredTags).flatMap(([type, tags]) => {
    const hueRange = tagDisplayTypeHueRanges[type as displayType];
    const rotationPerTag = (hueRange.max - hueRange.min) / tags.length;

    return tags.map((tag, index) => ({
        ...tag,
        // eslint-disable-next-line
        outline: `1px solid hsla(${hueRange.min + (rotationPerTag * index)}, 100%, 50%, 0.5) !important`,
    }));
});

const tagOutlines = tags.reduce((acc, tag) => {
    if (tag.display !== 'none') {
        // @ts-ignore
        acc[tag.name] = { outline: tag.outline };
    }

    return acc;
}, {});

export default function generateHtmlTagOutlineColors() {
    return tagOutlines;
}
