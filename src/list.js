import './style.css'
import raLogo from '/rottenapplesv2.png'
import { ratingcolor, songcolor } from './components/color.js'

document.querySelector('#list').innerHTML = `
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
    <div style="background-color: rgba(248, 44, 43, 0.2); border-radius: 1em; padding: 1rem; margin-top: 1rem;" class="loopy flex justify-center items-center">
        <div class="flex flex-col gap-4 p-4 w-full">
            <div id="sort-controls" class="flex flex-col justify-start items-start">
                <!-- Sort controls will be injected here -->
            </div>
            <div>
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
            </div>
        </div>
    </div>
`

async function fetchAndDisplaySongs() {
    try {
        const response = await fetch('https://rottenapples-api-e2be98c3f8f2.herokuapp.com/songs')
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
                    <td class="border text-center text-2xl font-bold">${song.song_rank}</td>
                    <td class="border"><a href="/album?id=${song.album_id}" style="display: flex; align-items: center; gap: 8px;"><img src="https://rottenapples-api-e2be98c3f8f2.herokuapp.com/image/${song.album_id}.jpg?width=64&quality=100" class="w-16 h-16 object-cover rounded-md" alt="${song.name}"><span>${song.name}</span></a></td>
                    <td class="border"><span class="text-2xl font-bold" style="color: ${songcolor(song.score)}">${song.score}</span></td>
                </tr>
            `).join('')

            document.querySelector('#song-list').innerHTML = songList
            updatePagination(sorted.length, page)
        }

        function updatePagination(totalItems, page) {
            const totalPages = Math.ceil(totalItems / itemsPerPage)
            const paginationHtml = `
                    ${page > 1 ? `<button onclick="window.goToPage(${page - 1})">Previous</button>` : ''}
                    <span style="margin-right: 1rem; margin-left: 1rem;">Page ${page} of ${totalPages}</span>
                    ${page < totalPages ? `<button onclick="window.goToPage(${page + 1})">Next</button>` : ''}
            `
            document.querySelector('#pagination').innerHTML = paginationHtml
        }

        window.changeSortOrder = (order) => {
            sortOrder = order
            currentPage = 1
            renderSongs(songs, sortOrder, currentPage)
        }

        window.changeGenre = (genre) => {
            // Filter songs by genre

            let filteredSongs = songs
            if (genre !== 'all') {
                filteredSongs = songs.filter(song => song.genre === genre)
            }
            currentPage = 1
            renderSongs(filteredSongs, sortOrder, currentPage)
        }


        window.goToPage = (page) => {
            currentPage = page
            renderSongs(songs, sortOrder, currentPage)
        }

        const selectHtml = `
        <h2 class="text-xl font-bold mb-4">Sort & Filter</h2>
        <div class="mb-4">
        <select onchange="window.changeSortOrder(this.value)" class="p-2 border rounded">
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
        </select>
        </div>
        <div class="mb-4">
        <select onchange="window.changeGenre(this.value)" class="p-2 border rounded">
            <option value="hip_hop">Hip Hop</option>
            <option value="pop">Pop</option>
            <option value="rap">Rap</option>
            <option value="rock">Rock</option>
            <option value="jazz">Jazz</option>
            <option value="edm">EDM</option>
            <option value="classical">Classical</option>
            <option value="psychedelic">Psychedelic</option>
            <option value="lofi">Lo-Fi</option>
            <option value="soul">Soul</option>
            <option value="musical">Musical</option>
            <option value="other">Other</option>
        </select>
        </div>`
        document.querySelector('#sort-controls').innerHTML = selectHtml

        renderSongs(songs, sortOrder, currentPage)
        document.querySelector('#list').innerHTML += `
        <footer class="text-center m-4 text-sm text-gray-300">
            <p>Built with ❤ by <a href="https://prkrshldn.github.io" target="_blank" class="text-red-500">prkrshldn</a>.</p>
        </footer>
        `;
    } catch (error) {
        console.error('Error fetching songs:', error)
    }
}

fetchAndDisplaySongs()