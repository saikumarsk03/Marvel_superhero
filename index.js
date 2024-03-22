const publicKey = "13c7bda7d9e1ffaf30cd4af4f175b428";
const privateKey = "fbcd447cadc5e9d1337348db7737d44d91f1ba66";
const ts = new Date().getTime().toString();
const hash = CryptoJS.MD5(ts + privateKey + publicKey).toString();

const searchInput = document.getElementById('searchInput');
const superheroesList = document.getElementById('superheroesList');

// Function to fetch superheroes by name
async function fetchSuperheroesByName(superheroName) {
  try {
    const response = await fetch(`https://gateway.marvel.com/v1/public/characters?nameStartsWith=${encodeURIComponent(superheroName)}&ts=${ts}&apikey=${publicKey}&hash=${hash}`);
    const data = await response.json();
    return data.data.results;
  } catch (error) {
    console.error('Error fetching superheroes:', error);
    return [];
  }
}


// Function to render superheroes
function renderSuperheroes(superheroes) {
  superheroesList.innerHTML = '';
  superheroes.forEach(superhero => {
    const superheroDiv = document.createElement('div');
    superheroDiv.classList.add('superhero');
    const superheroImage = document.createElement('img');
    superheroImage.src = `${superhero.thumbnail.path}.${superhero.thumbnail.extension}`;
    superheroImage.alt = superhero.name;
    superheroImage.addEventListener('click', () => {
      // Navigate to the superhero details page with the superhero ID
      window.location.href = `details_page/superhero-details.html?id=${superhero.id}`;
    });
    superheroDiv.appendChild(superheroImage);
    const superheroName = document.createElement('h3');
    superheroName.textContent = superhero.name;
    superheroDiv.appendChild(superheroName);
    const addToFavoritesButton = document.createElement('button');
    addToFavoritesButton.classList.add('addtofav')
    addToFavoritesButton.textContent = 'Add to Favorites';
    //Handling add to favorite button
    addToFavoritesButton.addEventListener('click', () => {
      addToFavorites(superhero.name);
      Swal.fire({
        width: "400px",
        height:"100px",
        position: "top-end",
        icon: 'success',
        title: `Successfully added ${superhero.name} to favorites!`,
        showConfirmButton: false,
        showClass: {
          popup: `
            animate__animated
            animate__fadeInUp
            animate__faster
          `
        },
        timer: 1000
      });
    });
    superheroDiv.appendChild(addToFavoritesButton);
    superheroesList.appendChild(superheroDiv);
  });
}
// Function to handle search input
async function handleSearch() {
  const query = searchInput.value;
  if (query.trim() === '') {
    superheroesList.innerHTML = '';
    return;
  }
  const superheroes = await fetchSuperheroesByName(query);
  renderSuperheroes(superheroes);
}

// Function to add superhero to favorites
function addToFavorites(superheroName) {
  // Fetch superheroes by name
  fetchSuperheroesByName(superheroName).then(superheroes => {
    // Store the superhero data in the local storage
    const superhero = superheroes[0];
    const superheroData = {
      id: superhero.id,
      name: superhero.name,
      image: `${superhero.thumbnail.path}.${superhero.thumbnail.extension}`,
    };
    localStorage.setItem(superheroName, JSON.stringify(superheroData));
  });
}

// Event listener for search input
searchInput.addEventListener('input', handleSearch);