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
        <button id="songlist" onclick="window.location.href = '/list'" type="button">Song/Album List</button>
        <button id="apidoc" onclick="window.location.href = 'http://127.0.0.1:8000/docs'" type="button">API Doc</button>
      </div>
    </div>
  </div>
<table class="w-full" id="songs-table">
    <thead>
        <tr>
            <th>Rank</th>
            <th>Title</th>
            <th>Score</th>
        </tr>
    </thead>
    <tbody id="song-list"></tbody>
</table>
<div id="pagination" class="flex justify-center items-center mt-4"></div>
`

async function fetchAndDisplaySongs() {
    try {
        const response = await fetch('http://127.0.0.1:8000/songs')
        const songs = await response.json()

        let sortOrder = 'asc'
        let currentPage = 1
        const itemsPerPage = 25

        function renderSongs(data, order, page) {
            const sorted = [...data].sort((a, b) =>
                order === 'asc' ? a.song_rank - b.song_rank : b.song_rank - a.song_rank
            )

            const start = (page - 1) * itemsPerPage
            const end = start + itemsPerPage
            const paginatedSongs = sorted.slice(start, end)

            const songList = paginatedSongs.map(song => `
                <tr>
                    <td>${song.song_rank}</td>
                    <td class="border" style="display: flex; align-items: center; gap: 8px;"><img src="http://127.0.0.1:8000/image/${song.album_id}.jpg?width=32&quality=80" class="w-16 h-16 object-cover rounded-md" alt="${song.name}"><span>${song.name}</span></td>
                    <td class="border"><span style="color: ${songcolor(song.score)}">${song.score}</span></td>
                </tr>
            `).join('')
            
            document.querySelector('#song-list').innerHTML = songList
            updatePagination(sorted.length, page)
        }

        function updatePagination(totalItems, page) {
            const totalPages = Math.ceil(totalItems / itemsPerPage)
            const paginationHtml = `
                    ${page > 1 ? `<button onclick="window.goToPage(${page - 1})">Previous</button>` : ''}
                    <span>Page ${page} of ${totalPages}</span>
                    ${page < totalPages ? `<button onclick="window.goToPage(${page + 1})">Next</button>` : ''}
            `
            document.querySelector('#pagination').innerHTML = paginationHtml
        }

        window.changeSortOrder = (order) => {
            sortOrder = order
            currentPage = 1
            renderSongs(songs, sortOrder, currentPage)
        }

        window.goToPage = (page) => {
            currentPage = page
            renderSongs(songs, sortOrder, currentPage)
        }

        const selectHtml = `<select onchange="window.changeSortOrder(this.value)" style="margin-bottom: 20px;">
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
        </select>`
        document.querySelector('#songs-table').insertAdjacentHTML('beforebegin', selectHtml)

        renderSongs(songs, sortOrder, currentPage)
    } catch (error) {
        console.error('Error fetching songs:', error)
    }
}

fetchAndDisplaySongs()