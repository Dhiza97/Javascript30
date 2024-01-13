const endpoint = 'https://gist.githubusercontent.com/mykeels/1174cd68bcff6efc4f8cafb49a24a209/raw/388eea7fd85e2d615d92e473120355a0a37ab80b/states-and-cities.json';

const states = [];

fetch(endpoint)
  .then(response => response.json())
  .then(data => states.push(...data));

function findMatches(wordToMatch, states) {
  return states.filter(state => {
    const regex = new RegExp(wordToMatch, 'gi');
    return state.name.match(regex) || state.cities.some(city => city.match(regex));
  });
}

function numberWithcommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

function displayMatches() {
  const matchArray = findMatches(this.value, states);
  const html = matchArray.map(state => {
    const regex = new RegExp(this.value, 'gi');
    const stateName = state.name.replace(regex, `<span class="hl">${
      this.value}</span>`);
    const cityList = state.cities.map(city => {
      return city.replace(regex, `<span class="hl">${this.value}</span>`);
    }).join(', ');

    return `
      <li>
        <h3 class='name'>State: ${stateName}</h3>
        <p class='cities'><strong>Cities:</strong> ${cityList}</p>
      </li>
    `;
  }).join('');
  suggestions.innerHTML = html;
}

const searchInput = document.querySelector('.search');
const suggestions = document.querySelector('.suggestions');

searchInput.addEventListener('input', displayMatches);
searchInput.addEventListener('keyup', displayMatches);