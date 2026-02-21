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

const albumId = new URLSearchParams(window.location.search).get('id')

if (albumId) {
  fetch(`https://rottenapples-api-e2be98c3f8f2.herokuapp.com/album/${albumId}`)
    .then(res => res.json())
    .then(data => {
      document.title = `${data.title} by ${data.artist} | Rotten Apples`
      document.querySelector('#app').innerHTML += `
            <div style="background-color: rgba(248, 44, 43, 0.2); border-radius: 1em; padding: 1rem; margin-top: 1rem;">
            <div class="flex justify-center items-center">
                <div class="text-center">
                    <img src="https://rottenapples-api-e2be98c3f8f2.herokuapp.com${data.image_url}?width=1000&quality=80" alt="${data.title}" class="logo mx-auto w-1/2" />
                    <h2 class="text-2xl font-bold">${data.title}</h2>
                    <h2 class="text-xl italic">by ${data.artist}</h2>
                </div>
            </div>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
                <div class="border p-4">
                        <h3 class="font-bold mb-2">Songs (${data.songs.length})</h3>
                        <div class="overflow-x-auto">
                            <table class="w-full">
                                <thead>
                                    <tr><th class="border-2 p-1">#</th><th class="border-2 p-1">Song [Song Rank]</th><th class="border-2 p-1">Score</th></tr>
                                </thead>
                                <tbody class="border-2 divide-y bg-black/65">
                                    ${data.songs.map((song, i) => `<tr><td>${i + 1}</td><td class="font-mono border-2 p-1 font-bold text-left">${song.name} [${song.song_rank ? `#${song.song_rank}` : 'Unranked'}]</td><td class="border-2 p-1"><span style="color: ${songcolor(song.score)}">${song.score}</span></td></tr>`).join('')}
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
                        <h1 class="text-3xl font-bold mb-4" style="color:${ratingcolor(data.score)}">${data.score}%</h1>
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
