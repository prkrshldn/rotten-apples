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

const albumId = new URLSearchParams(window.location.search).get('id')

if (albumId) {
    fetch(`http://127.0.0.1:8000/album/${albumId}`)
        .then(res => res.json())
        .then(data => {
            console.log(data.stats);
            document.querySelector('#app').innerHTML += `
            <div style="background-color: rgba(248, 44, 43, 0.2); border-radius: 1em; padding: 1rem; margin-top: 1rem;">
            <div class="flex justify-center items-center">
                <div class="text-center">
                    <img src="http://127.0.0.1:8000${data.image_url}?width=1000&quality=80" alt="${data.title}" class="logo mx-auto w-1/2" />
                    <h2 class="text-2xl font-bold">${data.title}</h2>
                    <h2 class="text-xl italic">by ${data.artist}</h2>
                </div>
            </div>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
                <div class="border p-4">
                        <h3 class="font-bold mb-2">Songs</h3>
                        <div class="overflow-x-auto">
                            <table class="w-full">
                                <thead>
                                    <tr><th>Song</th><th>Score</th></tr>
                                </thead>
                                <tbody>
                                    ${data.songs.map(song => `<tr><td>${song.name}</td><td>${song.score}</td></tr>`).join('')}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div class="border p-4">
                        <p><strong>Artist:</strong> ${data.artist}</p>
                        <p><strong>Year:</strong> ${data.year}</p>
                        <p><strong>Genre:</strong> ${data.genre}</p>
                        <p><strong>Review Date:</strong> ${data.review_date}</p>
                        <p><strong>Do I Recommend?:</strong> ${data.rec}</p>
                        <hr class="my-4" />
                        <h1 class="text-3xl font-bold mb-4">${data.score}%</h1>
                        <h3>${data.stats[0].album_rank ? `Ranked #${data.stats[0].album_rank} of all albums` : 'Unranked'}</h3>
                        <hr class="my-4" />
                        <h2 class="text-2xl font-bold mb-2">Stats & Ranks</h2>
                        <p><strong>Album Rank:</strong> ${data.stats[0].album_rank ? `#${data.stats[0].album_rank} of all albums` : 'Unranked'}</p>
                        <p><strong>Highest Song Rank:</strong> ${data.stats[0].highest_song_rank ? `#${data.stats[0].highest_song_rank}` : 'Unranked'}</p>
                        <p><strong>Genre Rank:</strong> ${data.stats[0].rank_in_genre ? `#${data.stats[0].rank_in_genre} of all ${data.genre} albums` : 'Unranked'}</p>
                        <hr class="my-4" />
                        <h2 class="text-2xl font-bold mb-2">Personal & Average Scores</h2>
                        <p><strong>Average Score:</strong> ${data.personal}</p>
                        <p><strong>Median Score:</strong> ${data.mean}</p>
                    </div>
                </div>
            </div>

            <footer class="text-center mt-4 text-sm text-gray-300">
                <p>Built with ❤ by <a href="https://prkrshldn.github.io" target="_blank" class="text-red-500">prkrshldn</a>.</p>
            </footer>
            `
        })
}

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