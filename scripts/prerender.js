// Writes real HTML for every indexable page, so crawlers don't have to run JavaScript to see content.
// Runs after both vite builds. A failure here fails the build, which leaves the previous deploy live.
import { mkdirSync, readFileSync, rmSync, writeFileSync } from 'fs'
import { dirname, resolve } from 'path'
import { fileURLToPath, pathToFileURL } from 'url'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const dist = resolve(root, 'dist')
const { render, routes } = await import(pathToFileURL(resolve(root, 'dist-ssr/entry-server.js')).href)

const template = readFileSync(resolve(dist, 'index.html'), 'utf8')

// Unmodified copy for dynamic routes (see the rewrites in vercel.json)
writeFileSync(resolve(dist, 'shell.html'), template)

for (const route of routes) {
    const { html, head } = render(route)
    if (!head.includes('<title')) throw new Error(`${route} rendered no title`)
    const page = template
        .replace(/<title>.*?<\/title>/s, () => head)
        .replace('<div id="root"></div>', () => `<div id="root">${html}</div>`)
    const out = route === '/' ? resolve(dist, 'index.html') : resolve(dist, `.${route}/index.html`)
    mkdirSync(dirname(out), { recursive: true })
    writeFileSync(out, page)
}

rmSync(resolve(root, 'dist-ssr'), { recursive: true, force: true })
console.log(`✅ Prerendered ${routes.length} pages`)
