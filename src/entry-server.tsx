import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom/server'
import { HelmetProvider, HelmetServerState } from 'react-helmet-async'
import App from './App'
import { wheelTemplates } from './data/wheelTemplates'
import { blogPosts } from './data/blogPosts'

// Every indexable page. Dynamic routes (/w/:id, /giveaway/:id, /embed/:category) are left to the client.
export const routes = [
  '/', '/about', '/contact', '/blog', '/hub', '/privacy', '/terms',
  '/custom-wheel-of-names', '/wheel-of-names', '/number-wheel', '/team-generator',
  '/secret-santa', '/rock-paper-scissors', '/giveaway',
  ...wheelTemplates.map(t => `/wheel/${t.id}`),
  ...blogPosts.map(p => `/blog/${p.slug}`)
]

export const render = (url: string) => {
  const context: { helmet?: HelmetServerState } = {}
  const html = renderToString(
    <HelmetProvider context={context}>
      <StaticRouter location={url}>
        <App />
      </StaticRouter>
    </HelmetProvider>
  )
  const { helmet } = context
  const head = helmet
    ? [helmet.title, helmet.meta, helmet.link, helmet.script].map(tag => tag.toString()).join('\n')
    : ''
  return { html, head }
}
