import './style.css'
import raLogo from '/rottenapplesv2.png'
import { ratingcolor, songcolor } from './components/color.js'

document.querySelector('#app').innerHTML = `
  <div class="flex justify-center items-center">
    <div class="text-center">
      <a href="/" class="block">
        <img src="${raLogo}" class="logo mx-auto w-1/2" alt="Rotten Apples Logo" />
      </a>
      <div>
        <button id="albumwall" onclick="window.location.href = '/albumwall'" type="button">Album Wall</button>
        <button id="songlist" onclick="window.location.href = '/list'" type="button">Song List</button>
        <button id="apidoc" onclick="window.location.href = 'https://rottenapples-api-e2be98c3f8f2.herokuapp.com/docs'" type="button">API Doc</button>
      </div>
    </div>
  </div>
`

async function fetchAlbums() {
  const response = await fetch('https://rottenapples-api-e2be98c3f8f2.herokuapp.com/albums');
  return response.json();
}

function createImageWall(albums) {
  const container = document.getElementById('app');
  const grid = document.createElement('div');
  grid.id = 'album-wall';
  container.appendChild(grid);
  grid.className = 'grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-10 gap-4 p-4';

  albums.forEach(album => {
    const linkElement = document.createElement('a');
    linkElement.href = `/album?id=${album.id}`;
    linkElement.className = 'relative group';
    grid.appendChild(linkElement);

    const imageElement = document.createElement('img');
    imageElement.src = `http://127.0.0.1:8000${album.image_url}?width=200&quality=80`;
    imageElement.srcset = `http://127.0.0.1:8000${album.image_url}?width=200&quality=80 1x, http://127.0.0.1:8000${album.image_url}?width=400&quality=80 2x`;
    imageElement.loading = 'lazy';
    imageElement.alt = album.title;
    imageElement.className = 'w-full h-full object-cover rounded-lg shadow-md group-hover:shadow-lg transition-all duration-200 group-hover:scale-110 cursor-pointer';
    imageElement.title = album.title;
    linkElement.appendChild(imageElement);
  });

  document.querySelector('#app').innerHTML += `
  <footer class="text-center mt-4 text-sm text-gray-300">
    <p>Built with ❤ by <a href="https://prkrshldn.github.io" target="_blank" class="text-red-500">prkrshldn</a>.</p>
  </footer>
`;
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