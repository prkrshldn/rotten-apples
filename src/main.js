import './style.css'
import raLogo from '/rottenapplesv2.png'

document.querySelector('#app').innerHTML = `
  <div class="flex justify-center items-center">
    <div class="text-center">
      <img src="${raLogo}" class="logo mx-auto size-small" alt="Rotten Apples Logo" />
      <p class="text-1xl font-bold text-red-500">
          My personal album review website/api. By prkrshldn.
      </p>
      <div class="card">
        <button id="albumwall" type="button">Album Wall</button>
        <button id="songlist" type="button">Song/Album List</button>
        <button id="apidoc" type="button">API Doc</button>
      </div>
    </div>
  </div>
`

albumWall(document.querySelector('#albumwall'))
songList(document.querySelector('#songlist'))
apiDoc(document.querySelector('#apidoc'))

function albumWall(button) {
  button.addEventListener('click', () => {
    window.location.href = '/albumwall'
  })
}

function songList(button) {
  button.addEventListener('click', () => {
    window.location.href = '/songlist'
  })
}

function apiDoc(button) {
  button.addEventListener('click', () => {
    window.location.href = 'http://127.0.0.1:8000/docs'
  })
}