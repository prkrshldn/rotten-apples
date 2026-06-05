import { renderHome } from './main.js'

let routerInitialized = false

async function renderCurrentRoute() {
  const pathname = window.location.pathname.replace(/\/+$/, '') || '/'

  if (pathname === '/' || pathname === '/index.html') {
    renderHome()
    return
  }

  if (pathname === '/list') {
    const { renderList } = await import('./list.js')
    renderList()
    return
  }

  if (pathname === '/albums') {
    const { renderAlbum } = await import('./album.js')
    renderAlbum()
    return
  }

  if (pathname === '/albumwall') {
    const { renderAlbumWall } = await import('./albumwall.js')
    renderAlbumWall()
    return
  }

  if (pathname === '/apidoc') {
    window.location.href = 'https://rottenapples-api-e2be98c3f8f2.herokuapp.com/docs'
    return
  }

  renderHome()
}

function navigateTo(path) {
  if (window.location.pathname + window.location.search !== path) {
    window.history.pushState({}, '', path)
  }
  startRouter()
}

function shouldHandleAsSpaNavigation(anchor, event) {
  if (!anchor) return false
  if (anchor.target && anchor.target.toLowerCase() === '_blank') return false
  if (event.defaultPrevented) return false
  if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return false

  const url = new URL(anchor.href, window.location.origin)
  if (url.origin !== window.location.origin) return false

  return ['/', '/list', '/albums', '/albumwall'].includes(url.pathname)
}

function installRouterNavigation() {
  if (routerInitialized) return
  routerInitialized = true

  window.navigateTo = navigateTo

  document.addEventListener('click', event => {
    const anchor = event.target.closest('a[href]')
    if (!shouldHandleAsSpaNavigation(anchor, event)) return

    event.preventDefault()
    const path = anchor.pathname + anchor.search
    navigateTo(path)
  })
}

function startRouter() {
  renderCurrentRoute().catch(error => {
    console.error('Router failed to render route:', error)
  })
}

installRouterNavigation()

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', startRouter)
} else {
  startRouter()
}

window.addEventListener('popstate', startRouter)
