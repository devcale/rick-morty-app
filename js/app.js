document.addEventListener('DOMContentLoaded', function(){
    const characterContainer = document.getElementById('characterContainer');
    const detailContainer = document.getElementById('detailContainer');
    const pageSelect = document.getElementById('pageSelect');
    let currentCharacter = null;
    let currentPage = 1; 

    function fetchAndDisplayCharacters(url) {
        fetch(url)
            .then(response => response.json())
            .then(data => {
                const characters = data.results;

                characterContainer.innerHTML = '';

                characters.forEach(character => {
                    const card = createCharacterCard(character);
                    card.addEventListener('click', () => toggleCharacterDetails(character));
                    characterContainer.appendChild(card);
                });

                updatePageSelect(data.info.pages);
                pageSelect.value = currentPage;
            })
            .catch(error => {
                console.log('Error fetching characters:', error);
            });
    }

    function createCharacterCard(character) {
        const card = document.createElement('div');
        card.classList.add('character-card');

        const characterName = document.createElement('h2');
        characterName.classList.add('character-name');
        characterName.textContent = character.name;

        const characterImage = document.createElement('img');
        characterImage.classList.add('character-image');
        characterImage.src = '/images/placeholder.jpeg';
        characterImage.id = `characterImage${character.id}`;
        characterImage.alt = character.name;

        card.appendChild(characterImage);
        card.appendChild(characterName);
        
        fetch(character.image)
            .then(response => response.blob())
            .then(blob => {
                const imageUrl = URL.createObjectURL(blob);
                const characterImg = document.getElementById(`characterImage${character.id}`);
                characterImg.src = imageUrl;
            })
            .catch(error => {
                console.log('Error fetching image:', error);
            });


        return card;
    }

    function toggleCharacterDetails(character) {
        if (currentCharacter === character) {
            hideCharacterDetails();
            currentCharacter = null;
            characterContainer.style.width = '';
        } else {
            showCharacterDetails(character);
            currentCharacter = character;
            characterContainer.style.width = '85vw';
        }
    }

    function showCharacterDetails(character) {
        detailContainer.innerHTML = `
            <h2>${character.name}</h2>
            <div class="detail-image-container">
                <img src="${character.image}" alt="${character.name}" class="detail-char-img">
            </div>
            <p>Status: ${character.status}</p>
            <p>Species: ${character.species}</p>
            <p>Type: ${character.type}</p>
            <p>Gender: ${character.gender}</p>
            <p>Origin: ${character.origin.name}</p>
            <p>Location: ${character.location.name}</p>
        `;
        detailContainer.classList.add('show');
    }

    function hideCharacterDetails() {
        detailContainer.classList.remove('show');
        detailContainer.innerHTML = '';
    }

    function updatePageSelect(totalPages) {
        pageSelect.innerHTML = '';

        for (let i = 1; i <= totalPages; i++) {
            const option = document.createElement('option');
            option.value = i;
            option.textContent = `Page ${i}`;
            pageSelect.appendChild(option);
        }

        pageSelect.addEventListener('change', () => {
            currentPage = parseInt(pageSelect.value, 10);
            const apiUrl = `https://rickandmortyapi.com/api/character/?page=${currentPage}`;
            fetchAndDisplayCharacters(apiUrl);
        });
    }

    fetchAndDisplayCharacters('https://rickandmortyapi.com/api/character');
});

