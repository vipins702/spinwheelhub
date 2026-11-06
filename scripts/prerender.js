// Writes real HTML for every indexable page, so crawlers don't have to run JavaScript to see content.
// Runs after both vite builds. A failure here fails the build, which leaves the previous deploy live.
import { mkdirSync, readFileSync, rmSync, writeFileSync } from 'fs'
import { dirname, resolve } from 'path'
import { fileURLToPath, pathToFileURL } from 'url'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const dist = resolve(root, 'dist')
const { render, routes } = await import(pathToFileURL(resolve(root, 'dist-ssr/entry-server.js')).href)

const template = readFileSync(resolve(dist, 'index.html'), 'utf8')

// Unmodified copy for the few dynamic routes (/w/:id, /giveaway/:id), see the rewrites in vercel.json
writeFileSync(resolve(dist, 'shell.html'), template)

const pageFor = (route) => {
    const { html, head } = render(route)
    if (!head.includes('<title')) throw new Error(`${route} rendered no title`)
    return {
        head,
        page: template
            .replace(/<title>.*?<\/title>/s, () => head)
            .replace('<div id="root"></div>', () => `<div id="root">${html}</div>`)
    }
}

for (const route of routes) {
    const { page } = pageFor(route)
    const out = route === '/' ? resolve(dist, 'index.html') : resolve(dist, `.${route}/index.html`)
    mkdirSync(dirname(out), { recursive: true })
    writeFileSync(out, page)
}

// Vercel serves 404.html, with a real 404 status, for any URL that isn't a file or a rewrite above.
// Without it every made-up URL returned 200, which Google reports as a soft 404.
const notFound = pageFor('/page-not-found')
if (!notFound.head.includes('noindex')) throw new Error('404 page must be noindex')
writeFileSync(resolve(dist, '404.html'), notFound.page)

rmSync(resolve(root, 'dist-ssr'), { recursive: true, force: true })
console.log(`✅ Prerendered ${routes.length} pages and 404.html`)
