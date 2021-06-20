/*
Script that generated this data :
---------------------------------

<html lang="en">
<body>
    <script>
        (async () => {
            const all = await getContent('https://raw.githubusercontent.com/sindresorhus/html-tags/main/html-tags.json');
            const selfClosing = await getContent('https://raw.githubusercontent.com/sindresorhus/html-tags/main/html-tags-void.json');

            console.log(
                JSON.stringify(tagMetas(all, selfClosing))
            );
        })();

        function tagMetas(allTags, selfClosingTags) {
            return allTags.reduce((acc, tag) => {
                const el = document.createElement(tag);

                document.body.appendChild(el);

                acc.push({
                    name: tag,
                    isSelfClosing: selfClosingTags.includes(tag),
                    display: window.getComputedStyle(el, null).display,
                });

                return acc;
            }, []);
        }

        async function getContent(url) {
            return (await (await fetch(url)).json());
        }
    </script>
</body>
</html>
*/

// Script: console.log([...new Set(tagMetas(all, selfClosing).map(tag => tag.display))]);
export type htmlTagStyleDisplays =
    | 'inline'
    | 'block'
    | 'none'
    | 'inline-block'
    | 'table-caption'
    | 'table-column'
    | 'table-column-group'
    | 'list-item'
    | 'contents'
    | 'table'
    | 'table-row-group'
    | 'table-cell'
    | 'table-footer-group'
    | 'table-header-group'
    | 'table-row';

export interface Tag {
    name: string;
    isSelfClosing: boolean;
    display: htmlTagStyleDisplays;
}

const tags: Tag[] = [
    { name: 'a', isSelfClosing: false, display: 'inline' },
    { name: 'abbr', isSelfClosing: false, display: 'inline' },
    { name: 'address', isSelfClosing: false, display: 'block' },
    { name: 'area', isSelfClosing: true, display: 'inline' },
    { name: 'article', isSelfClosing: false, display: 'block' },
    { name: 'aside', isSelfClosing: false, display: 'block' },
    { name: 'audio', isSelfClosing: false, display: 'none' },
    { name: 'b', isSelfClosing: false, display: 'inline' },
    { name: 'base', isSelfClosing: true, display: 'inline' },
    { name: 'bdi', isSelfClosing: false, display: 'inline' },
    { name: 'bdo', isSelfClosing: false, display: 'inline' },
    { name: 'blockquote', isSelfClosing: false, display: 'block' },
    { name: 'body', isSelfClosing: false, display: 'block' },
    { name: 'br', isSelfClosing: true, display: 'inline' },
    { name: 'button', isSelfClosing: false, display: 'inline-block' },
    { name: 'canvas', isSelfClosing: false, display: 'inline' },
    { name: 'caption', isSelfClosing: false, display: 'table-caption' },
    { name: 'cite', isSelfClosing: false, display: 'inline' },
    { name: 'code', isSelfClosing: false, display: 'inline' },
    { name: 'col', isSelfClosing: true, display: 'table-column' },
    { name: 'colgroup', isSelfClosing: false, display: 'table-column-group' },
    { name: 'data', isSelfClosing: false, display: 'inline' },
    { name: 'datalist', isSelfClosing: false, display: 'none' },
    { name: 'dd', isSelfClosing: false, display: 'block' },
    { name: 'del', isSelfClosing: false, display: 'inline' },
    { name: 'details', isSelfClosing: false, display: 'block' },
    { name: 'dfn', isSelfClosing: false, display: 'inline' },
    { name: 'dialog', isSelfClosing: false, display: 'none' },
    { name: 'div', isSelfClosing: false, display: 'block' },
    { name: 'dl', isSelfClosing: false, display: 'block' },
    { name: 'dt', isSelfClosing: false, display: 'block' },
    { name: 'em', isSelfClosing: false, display: 'inline' },
    { name: 'embed', isSelfClosing: true, display: 'inline' },
    { name: 'fieldset', isSelfClosing: false, display: 'block' },
    { name: 'figcaption', isSelfClosing: false, display: 'block' },
    { name: 'figure', isSelfClosing: false, display: 'block' },
    { name: 'footer', isSelfClosing: false, display: 'block' },
    { name: 'form', isSelfClosing: false, display: 'block' },
    { name: 'h1', isSelfClosing: false, display: 'block' },
    { name: 'h2', isSelfClosing: false, display: 'block' },
    { name: 'h3', isSelfClosing: false, display: 'block' },
    { name: 'h4', isSelfClosing: false, display: 'block' },
    { name: 'h5', isSelfClosing: false, display: 'block' },
    { name: 'h6', isSelfClosing: false, display: 'block' },
    { name: 'head', isSelfClosing: false, display: 'none' },
    { name: 'header', isSelfClosing: false, display: 'block' },
    { name: 'hgroup', isSelfClosing: false, display: 'block' },
    { name: 'hr', isSelfClosing: true, display: 'block' },
    { name: 'html', isSelfClosing: false, display: 'block' },
    { name: 'i', isSelfClosing: false, display: 'inline' },
    { name: 'iframe', isSelfClosing: false, display: 'inline' },
    { name: 'img', isSelfClosing: true, display: 'inline' },
    { name: 'input', isSelfClosing: true, display: 'inline-block' },
    { name: 'ins', isSelfClosing: false, display: 'inline' },
    { name: 'kbd', isSelfClosing: false, display: 'inline' },
    { name: 'label', isSelfClosing: false, display: 'inline' },
    { name: 'legend', isSelfClosing: false, display: 'block' },
    { name: 'li', isSelfClosing: false, display: 'list-item' },
    { name: 'link', isSelfClosing: true, display: 'none' },
    { name: 'main', isSelfClosing: false, display: 'block' },
    { name: 'map', isSelfClosing: false, display: 'inline' },
    { name: 'mark', isSelfClosing: false, display: 'inline' },
    { name: 'math', isSelfClosing: false, display: 'inline' },
    { name: 'menu', isSelfClosing: false, display: 'block' },
    { name: 'menuitem', isSelfClosing: true, display: 'inline' },
    { name: 'meta', isSelfClosing: true, display: 'none' },
    { name: 'meter', isSelfClosing: false, display: 'inline-block' },
    { name: 'nav', isSelfClosing: false, display: 'block' },
    { name: 'noscript', isSelfClosing: false, display: 'inline' },
    { name: 'object', isSelfClosing: false, display: 'inline' },
    { name: 'ol', isSelfClosing: false, display: 'block' },
    { name: 'optgroup', isSelfClosing: false, display: 'block' },
    { name: 'option', isSelfClosing: false, display: 'block' },
    { name: 'output', isSelfClosing: false, display: 'inline' },
    { name: 'p', isSelfClosing: false, display: 'block' },
    { name: 'param', isSelfClosing: true, display: 'none' },
    { name: 'picture', isSelfClosing: false, display: 'inline' },
    { name: 'pre', isSelfClosing: false, display: 'block' },
    { name: 'progress', isSelfClosing: false, display: 'inline-block' },
    { name: 'q', isSelfClosing: false, display: 'inline' },
    { name: 'rb', isSelfClosing: false, display: 'inline' },
    { name: 'rp', isSelfClosing: false, display: 'none' },
    { name: 'rt', isSelfClosing: false, display: 'inline' },
    { name: 'rtc', isSelfClosing: false, display: 'inline' },
    { name: 'ruby', isSelfClosing: false, display: 'inline' },
    { name: 's', isSelfClosing: false, display: 'inline' },
    { name: 'samp', isSelfClosing: false, display: 'inline' },
    { name: 'script', isSelfClosing: false, display: 'none' },
    { name: 'section', isSelfClosing: false, display: 'block' },
    { name: 'select', isSelfClosing: false, display: 'inline-block' },
    { name: 'slot', isSelfClosing: false, display: 'contents' },
    { name: 'small', isSelfClosing: false, display: 'inline' },
    { name: 'source', isSelfClosing: true, display: 'inline' },
    { name: 'span', isSelfClosing: false, display: 'inline' },
    { name: 'strong', isSelfClosing: false, display: 'inline' },
    { name: 'style', isSelfClosing: false, display: 'none' },
    { name: 'sub', isSelfClosing: false, display: 'inline' },
    { name: 'summary', isSelfClosing: false, display: 'block' },
    { name: 'sup', isSelfClosing: false, display: 'inline' },
    { name: 'svg', isSelfClosing: false, display: 'inline' },
    { name: 'table', isSelfClosing: false, display: 'table' },
    { name: 'tbody', isSelfClosing: false, display: 'table-row-group' },
    { name: 'td', isSelfClosing: false, display: 'table-cell' },
    { name: 'template', isSelfClosing: false, display: 'none' },
    { name: 'textarea', isSelfClosing: false, display: 'inline-block' },
    { name: 'tfoot', isSelfClosing: false, display: 'table-footer-group' },
    { name: 'th', isSelfClosing: false, display: 'table-cell' },
    { name: 'thead', isSelfClosing: false, display: 'table-header-group' },
    { name: 'time', isSelfClosing: false, display: 'inline' },
    { name: 'title', isSelfClosing: false, display: 'none' },
    { name: 'tr', isSelfClosing: false, display: 'table-row' },
    { name: 'track', isSelfClosing: true, display: 'inline' },
    { name: 'u', isSelfClosing: false, display: 'inline' },
    { name: 'ul', isSelfClosing: false, display: 'block' },
    { name: 'var', isSelfClosing: false, display: 'inline' },
    { name: 'video', isSelfClosing: false, display: 'inline' },
    { name: 'wbr', isSelfClosing: true, display: 'inline' },
];

export default tags;
