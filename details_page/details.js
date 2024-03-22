const ts = new Date().getTime().toString();const publicKey = "13c7bda7d9e1ffaf30cd4af4f175b428";
const privateKey = "fbcd447cadc5e9d1337348db7737d44d91f1ba66";
const hash = CryptoJS.MD5(ts + privateKey + publicKey).toString();

const urlParams = new URLSearchParams(window.location.search);
const superheroId = urlParams.get('id');

console.log('superheroId:', superheroId);

// Function to fetch superhero by ID
async function fetchSuperheroById(id) {
  try {
    console.log('Fetching superhero by ID:', id);
    const response = await fetch(`https://gateway.marvel.com/v1/public/characters/${id}?ts=${ts}&apikey=${publicKey}&hash=${hash}`);
    const data = await response.json();
    console.log('Superhero data:', data);
    return data.data.results[0];
  } catch (error) {
    console.error('Error fetching superhero:', error);
    return null;
  }
}


// Function to render superhero details
function renderSuperheroDetails(superhero) {
console.log('Rendering superhero details:', superhero);
// Display the superhero details on the page
const superheroImage = document.getElementById('superheroImage');
superheroImage.src = `${superhero.thumbnail.path}.${superhero.thumbnail.extension}`;
superheroImage.alt = superhero.name;
document.getElementById('superheroName').textContent = superhero.name;
document.getElementById('superheroDescription').textContent = superhero.description || 'No description available.';

// Display the superhero's comics, series, stories, and events side by side using CSS Grid
const superheroLists = document.createElement('div');
superheroLists.classList.add('superhero-lists');

const comicsList = document.createElement('ul');
comicsList.classList.add('comics-list');
const comicsHeader = document.createElement('li');
comicsHeader.textContent = 'Comics';
comicsList.appendChild(comicsHeader);
superhero.comics.items.forEach(comic => {
const comicListItem = document.createElement('li');
comicListItem.textContent = comic.name;
comicsList.appendChild(comicListItem);
});
superheroLists.appendChild(comicsList);

const seriesList = document.createElement('ul');
seriesList.classList.add('series-list');
const seriesHeader = document.createElement('li');
seriesHeader.textContent = 'Series';
seriesList.appendChild(seriesHeader);
superhero.series.items.forEach(series => {
const seriesListItem = document.createElement('li');
seriesListItem.textContent = series.name;
seriesList.appendChild(seriesListItem);
});
superheroLists.appendChild(seriesList);

const storiesList = document.createElement('ul');
storiesList.classList.add('stories-list');
const storiesHeader = document.createElement('li');
storiesHeader.textContent = 'Stories';
storiesList.appendChild(storiesHeader);
superhero.stories.items.forEach(story => {
const storiesListItem = document.createElement('li');
storiesListItem.textContent = story.name;
storiesList.appendChild(storiesListItem);
});
superheroLists.appendChild(storiesList);

const eventsList = document.createElement('ul');
eventsList.classList.add('events-list');
const eventsHeader = document.createElement('li');
eventsHeader.textContent = 'Events';
eventsList.appendChild(eventsHeader);
superhero.events.items.forEach(event => {
const eventsListItem = document.createElement('li');
eventsListItem.textContent = event.name;
eventsList.appendChild(eventsListItem);
});
superheroLists.appendChild(eventsList);

document.body.appendChild(superheroLists);
}
// Fetch the superhero details by ID
fetchSuperheroById(superheroId).then(superhero => {
  if (superhero) {
    renderSuperheroDetails(superhero);
  } else {
    console.log('No superherofound with the given ID');
  }
});