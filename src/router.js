import { renderHome } from './main.js'

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
