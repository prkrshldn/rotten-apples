import './style.css'
import raLogo from '/rottenapplesv2.png'
import { setupCounter } from './counter.js'

document.querySelector('#app').innerHTML = `
  <div class="flex justify-center items-center">
    <div class="text-center">
      <img src="${raLogo}" class="logo mx-auto" alt="Rotten Apples Logo" />
      <p class="text-1xl font-bold text-red-500">
          My personal album review website/api. By prkrshldn.
      </p>
      <div class="card">
        <button id="counter" type="button">Album Wall</button>
        <button id="counter1" type="button">Song List</button>
        <button id="counter2" type="button">API Doc</button>
      </div>
    </div>
  </div>
`

