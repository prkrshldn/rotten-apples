import { renderHome } from './main.js'

async function renderCurrentRoute() {
  const pathname = window.location.pathname.replace(/\/+$/, '') || '/'

  if (pathname === '/' || pathname === '/index.html') {
    renderHome()
    return
  }

  if (pathname === '/list' || pathname === '/list.html') {
    const { renderList } = await import('./list.js')
    renderList()
    return
  }

  if (pathname === '/albums' || pathname === '/albums.html') {
    const { renderAlbum } = await import('./album.js')
    renderAlbum()
    return
  }

  if (pathname === '/albumwall' || pathname === '/albumwall.html') {
    const { renderAlbumWall } = await import('./albumwall.js')
    renderAlbumWall()
    return
  }

  renderHome()
}

function startRouter() {
  renderCurrentRoute().catch(error => {
    console.error('Router failed to render route:', error)
  })
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', startRouter)
} else {
  startRouter()
}

window.addEventListener('popstate', startRouter)
