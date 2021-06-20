import postcss from 'postcss';
import tailwindcss from 'tailwindcss';
import { TailwindConfig } from 'tailwindcss/tailwind-config';

export default async function generateCss(
    plugin: Function,
    config: TailwindConfig | { [key: string]: string } = {},
    {
        // layers
        base = false,
        components = false,
        utilities = true,
    }: {
        base?: boolean;
        components?: boolean;
        utilities?: boolean;
    } = {
        base: false,
        components: false,
        utilities: true,
    }
) {
    const process = `
        ${base ? '@tailwind base;' : ''}
        ${components ? '@tailwind components;' : ''}
        ${utilities ? '@tailwind utilities;' : ''}
    `;

    const result = await postcss(
        tailwindcss({
            ...config,
            // @ts-ignore
            corePlugins: config.corePlugins ?? [],
            // @ts-ignore
            plugins: [...(config.plugins ?? []), plugin],
        })
    ).process(process, {
        from: undefined,
    });

    return result.css;
}
