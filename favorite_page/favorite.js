// Function to fetch and display superheroes from local storage
function displayFavorites() {
    const favoritesList = document.getElementById('favoritesList');
  
    // Fetch all superheroes from local storage
    for (let i = 0; i < localStorage.length; i++) {
      const superheroName = localStorage.key(i);
      const superheroData = JSON.parse(localStorage.getItem(superheroName));
  
      //  HTML structure to display the superhero
      const superheroDiv = document.createElement('div');
      superheroDiv.className = 'superhero';
  
      const superheroImage = document.createElement('img');
      superheroImage.src = superheroData.image;
      superheroImage.alt = superheroName;
      superheroImage.addEventListener('click', () => {
        // Navigate to the new page with the superhero ID
        window.location.href = `../details_page/superhero-details.html?id=${superheroData.id}`;
      });
      const remove=document.createElement("button");
       remove.innerHTML="Remove";
       remove.classList.add("removeBtn");
       remove.addEventListener('click', () => {
         // Remove the superhero data from the local storage
         localStorage.removeItem(superheroName);
  
         // Remove the superhero element from the page
         superheroDiv.remove();
       });
      const superheroNameElement = document.createElement('h2');
      superheroNameElement.textContent = superheroName;
  
      superheroDiv.appendChild(superheroImage);
      superheroDiv.appendChild(superheroNameElement);
      superheroDiv.appendChild(remove);
  
      favoritesList.appendChild(superheroDiv);
    }
  }
  
  // Call the displayFavorites function to display the superheroes
  displayFavorites();