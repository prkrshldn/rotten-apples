import './style.css'
import raLogo from '/rottenapplesv2.png'

document.querySelector('#app').innerHTML = `
  <div class="flex justify-center items-center">
    <div class="text-center">
      <img src="${raLogo}" class="logo mx-auto w-1/2" alt="Rotten Apples Logo" />
      <div>
        <button id="albumwall" type="button">Album Wall</button>
        <button id="songlist" type="button">Song List</button>
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

async function fetchAlbums() {
    const response = await fetch('http://127.0.0.1:8000/albums');
    return response.json();
}

function createImageWall(albums) {
    const container = document.getElementById('app');
    const grid = document.createElement('div');
    grid.id = 'album-wall';
    container.appendChild(grid); // Add a horizontal line for separation
    grid.className = 'grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-10 gap-4 p-4';
    
    albums.forEach(album => {
        const linkElement = document.createElement('a');
        linkElement.href = `/album?id=${album.id}`;
        linkElement.target = '_blank';
        grid.appendChild(linkElement);
        const imageElement = document.createElement('img');
        imageElement.src = `http://127.0.0.1:8000${album.image_url}?width=200&quality=80`;
        imageElement.srcset = `http://127.0.0.1:8000${album.image_url}?width=200&quality=80 1x, http://127.0.0.1:8000${album.image_url}?width=400&quality=80 2x`;
        imageElement.loading = 'lazy';
        imageElement.alt = album.title;
        imageElement.className = 'w-full h-full object-cover rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer';
        imageElement.title = album.title;
        linkElement.appendChild(imageElement);
    });
    document.querySelector('#app').innerHTML += `
    <footer class="text-center mt-4 text-sm text-gray-300">
        <p>Built with ❤ by <a href="https://prkrshldn.github.io" target="_blank" class="text-red-500">prkrshldn</a>.</p>
    </footer>
`
}

async function initializeAlbumWall() {
    try {
        const albums = await fetchAlbums();
        createImageWall(albums);
    } catch (error) {
        console.error('Error loading albums:', error);
    }
}

document.addEventListener('DOMContentLoaded', initializeAlbumWall);