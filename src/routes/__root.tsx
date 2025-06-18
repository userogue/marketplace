// app/routes/__root.tsx
import type { ReactNode } from 'react'
import {
  Outlet,
  createRootRoute,
  HeadContent,
  Scripts,
} from '@tanstack/react-router'
import { Navigation } from '../components/navigation'

// Import the CSS for the router to bundle it
import '../app.css'

// Import the CSS as a URL for direct reference
import appCssUrl from '../app.css?url'

export const Route = createRootRoute({
  head: () => ({
    title: 'GMRX | Tradewinds Marketplace Video Research Platform',
    // Common meta tags that should apply to all pages
    meta: [
      {
        charSet: 'utf-8',
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
      {
        name: 'keywords',
        content: 'Tradewinds, market research, defense acquisition, vendor videos, AI analysis, procurement, DoD, government',
      },
      {
        property: 'og:type',
        content: 'website',
      },
      {
        name: 'twitter:card',
        content: 'summary_large_image',
      },
      {
        name: 'description',
        content: 'AI-powered analysis of Tradewinds Solution Marketplace vendor videos. Extract insights, capabilities, and procurement data instantly.',
      },
      {
        property: 'og:title',
        content: 'GMRX | Tradewinds Marketplace Video Research Platform',
      },
      {
        property: 'og:description',
        content: 'Analyze Tradewinds vendor videos with AI. Get instant insights on capabilities, solutions, and procurement opportunities.',
      },
      {
        name: 'twitter:title',
        content: 'GMRX | Tradewinds Marketplace Video Research Platform',
      },
      {
        name: 'twitter:description',
        content: 'Analyze Tradewinds vendor videos with AI. Get instant insights on capabilities, solutions, and procurement opportunities.',
      },
    ],
    // Common links that should apply to all pages
    links: [
      {
        rel: 'stylesheet',
        href: appCssUrl,
      },
      {
        rel: 'icon',
        type: 'image/svg+xml',
        href: '/assets/gmrx-favicon.svg',
      },
    ],
  }),
  component: RootComponent,
})

function RootComponent() {
  return (
    <RootDocument>
      <Navigation />
      <Outlet />
    </RootDocument>
  )
}

function RootDocument({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html>
      <head>
        <HeadContent />
        <link rel="stylesheet" href={appCssUrl} />
        <script dangerouslySetInnerHTML={{ __html: `
          !function(t){var k="ko",i=(window.globalKoalaKey=window.globalKoalaKey||k);if(window[i])return;var ko=(window[i]=[]);["identify","track","removeListeners","on","off","qualify","ready"].forEach(function(t){ko[t]=function(){var n=[].slice.call(arguments);return n.unshift(t),ko.push(n),ko}});var n=document.createElement("script");n.async=!0,n.setAttribute("src","https://cdn.getkoala.com/v1/pk_53ec41266315ac972402dd84a1e30754f764/sdk.js"),(document.body || document.head).appendChild(n)}();
        ` }} />
      </head>
      <body>
        {children}
        <Scripts />
        <script defer src="/_vercel/insights/script.js"></script>
      </body>
    </html>
  )
}