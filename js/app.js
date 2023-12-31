const apiUrl = `https://rickandmortyapi.com/api/character/`;

  //----------------------DOCUMENT ELEMENTS-------------------------------
  const mainTitle = document.getElementById("mainTitle");
  const characterContainer = document.getElementById("characterContainer");
  const detailContainer = document.getElementById("detailContainer");
  const noMatchesContainer = document.getElementById("noMatchesContainer");
  const pageSelect = document.getElementById("pageSelect");
  const prevPageButton = document.getElementById("prevPageButton");
  const nextPageButton = document.getElementById("nextPageButton");
  const filterButton = document.getElementById("filterButton");
  const filterOptions = document.getElementById("filterOptionsContainer");
  const applyFilterButton = document.getElementById("applyFilterButton");
  const resetFilterButton = document.getElementById("resetFilterButton");
  const searchInput = document.getElementById("searchInput");
  const speciesInput = document.getElementById("speciesInput");
  const typeInput = document.getElementById("typeInput");

  //------------------------VARIABLES----------------------
  let currentCard = null;
  let currentCharacter = null;
  let currentPage = 1;
  let pageCount = 42;
  let filtersShown = false;

  //------------------FILTERS------------------
  let nameFilter = "";
  let statusFilter = "";
  let speciesFilter = "";
  let typeFilter = "";
  let genderFilter = "";

  //------------------------------FUNCTIONS--------------------------------------

  function resetPage() {
    searchInput.value = "";
    currentPage = 1;
    currentCard = null;
    currentCharacter = null;
    nameFilter = "";
    statusFilter = "";
    speciesFilter = "";
    typeFilter = "";
    genderFilter = "";
    hideCharacterDetails();
    resetFilters();
    fetchAndDisplayData();
  }

  function toggleFilters() {
    if (filtersShown) {
      filterOptions.classList.remove("show");
    } else {
      filterOptions.classList.add("show");
    }
    filtersShown = !filtersShown;
  }

  function applyFilters() {
    statusFilter =
      document.querySelector('input[name="status"]:checked') == null
        ? ""
        : document.querySelector('input[name="status"]:checked').value;
    statusFilter = statusFilter == "any" ? "" : statusFilter;
    speciesFilter = speciesInput.value.trim();
    typeFilter = typeInput.value.trim();
    genderFilter =
      document.querySelector('input[name="gender"]:checked') == null
        ? ""
        : document.querySelector('input[name="gender"]:checked').value;
    genderFilter = genderFilter == "any" ? "" : genderFilter;

    currentPage = 1;
    fetchAndDisplayData();
    filterOptions.classList.remove("show");
  }

  function resetFilters() {
    // Reset status radio buttons
    const statusRadios = document.querySelectorAll('input[name="status"]');
    statusRadios.forEach((radio) => {
      radio.checked = false;
    });

    // Reset species and type input fields
    speciesInput.value = "";
    typeInput.value = "";

    // Reset gender radio buttons
    const genderRadios = document.querySelectorAll('input[name="gender"]');
    genderRadios.forEach((radio) => {
      radio.checked = false;
    });
  }

  function createCharacterCard(character) {
    const card = document.createElement("div");
    if (currentCharacter != null) {
      if (currentCharacter.id == character.id) {
        card.classList.add("selected-card");
      }
    }

    card.classList.add("character-card");
    card.id = `card${character.id}`;

    const characterName = document.createElement("h2");
    characterName.classList.add("character-name");
    characterName.textContent = character.name;

    const characterImage = document.createElement("img");
    characterImage.classList.add("character-image");
    characterImage.src = "./images/placeholder.jpeg";
    characterImage.id = `characterImage${character.id}`;
    characterImage.alt = character.name;

    card.appendChild(characterImage);
    card.appendChild(characterName);

    fetch(character.image)
      .then((response) => response.blob())
      .then((blob) => {
        const imageUrl = URL.createObjectURL(blob);
        const characterImg = document.getElementById(
          `characterImage${character.id}`
        );
        if (characterImg != null) {
          characterImg.src = imageUrl;
        }
      })
      .catch((error) => {
        console.log("Error fetching image:", error);
      });

    return card;
  }

  function toggleCharacterDetails(character) {
    if (currentCharacter === character) {
      hideCharacterDetails();
    } else {
      showCharacterDetails(character);
    }
  }

  function showNoMatchesMessage() {
    noMatchesContainer.classList.add("show");
  }

  function hideNoMatchesMessage() {
    noMatchesContainer.classList.remove("show");
  }

  function showCharacterDetails(character) {
    if (currentCard != null) {
      currentCard.classList.remove("selected-card");
    }
    currentCard = document.getElementById(`card${character.id}`);
    currentCard.classList.add("selected-card");
    detailContainer.innerHTML = `
            <div class="first-row-detail">
                <h2 class="detail-title">${character.name}</h2>
                <div class="close-button" id="closeDetailButton"><i class="fa-solid fa-xmark"></i></div>
            </div>
            <div class="image-and-summary">
                <div class="detail-image-container">
                    <img src="${character.image}" alt="${
      character.name
    }" class="detail-char-img">
                </div>
                <div class="data-summary">
                    <p>Status:  ${character.status}</p>
                    <p>Species:  ${character.species}</p>
                    ${
                      character.type != ""
                        ? `<p>Type: ${character.type}</p>`
                        : ""
                    }
                    <p>Gender: ${character.gender}</p>
                    <p>Origin: ${character.origin.name}</p>
                    <p>Last Known Location: ${character.location.name}</p>
                    <p class="episode-list-title">Episodes:</p>
                    <ul class="episode-list" id="episodeList"></ul>
                </div>
            </div>
            
        `;
    fetchEpisodeInfo(character.id);

    detailContainer.classList.add("show");
    currentCharacter = character;
    // characterContainer.style.width = "85vw";

    const closeButton = document.getElementById("closeDetailButton");
    closeButton.addEventListener("click", () => hideCharacterDetails());
  }

  function hideCharacterDetails() {
    detailContainer.classList.remove("show");
    if (currentCard != null) {
      currentCard.classList.remove("selected-card");
    }
    currentCard = null;
    detailContainer.innerHTML = "";
    currentCharacter = null;
    characterContainer.style.width = "";
  }

  function updatePageSelect(totalPages, selectedPage) {
    currentCard = null;

    pageSelect.innerHTML = "";

    const pageSelected = document.createElement("div");
    pageSelected.innerHTML = `Page ${selectedPage}`;
    pageSelected.classList.add("page-selected");

    const selectItems = document.createElement("div");
    selectItems.classList.add("select-items");

    for (let i = 1; i <= totalPages; i++) {
      const option = document.createElement("div");
      option.innerHTML = `Page ${i}`;
      selectItems.appendChild(option);
    }

    pageSelect.appendChild(pageSelected);
    pageSelect.appendChild(selectItems);

    const customSelects = document.querySelectorAll(".page-select");

    customSelects.forEach((select) => {
      const selected = select.querySelector(".page-selected");
      const options = select.querySelector(".select-items").children;

      // Toggle active class to show/hide dropdown items
      selected.addEventListener("click", function () {
        this.parentNode.classList.toggle("active");
      });

      // Set selected option when an item is clicked
      for (let i = 0; i < options.length; i++) {
        options[i].addEventListener("click", function () {
          changePage(parseInt(this.textContent.replace("Page ", "")));
        });
      }
    });
  }

  function changePage(page) {
    if (page > 0 && page <= pageCount) {
      const selected = document.getElementById("pageSelect");
      selected.textContent = "Page " + page;
      selected.classList.remove("active");
      currentPage = page;

      fetchAndDisplayData(apiUrl);
    }
  }

  function fetchEpisodeInfo(characterId) {
    const characterUrl = apiUrl+characterId;
    const episodeList = document.getElementById("episodeList");
    
    fetch(characterUrl)
      .then((response) => response.json())
      .then((data) => {
        const episodeIds = data.episode.map((ep) => ep.split("/").pop());
        episodeIds.forEach((episodeId) => {
          fetch(`https://rickandmortyapi.com/api/episode/${episodeId}`)
            .then((response) => response.json())
            .then((episodeData) => {
              const episodeListItem = document.createElement("li");
              episodeListItem.textContent = `${episodeData.name} (${episodeData.episode})`;
              episodeList.appendChild(episodeListItem);
            })
            .catch((error) => {
              console.error("Error fetching episode details:", error);
            });
        });
      })
      .catch((error) => {
        console.error("Error fetching character details:", error);
      });
  }

  function fetchAndDisplayData() {
    let filterQuery = `?page=${currentPage}`;
    if (nameFilter != "") {
      filterQuery += `&name=${nameFilter}`;
    }
    if (statusFilter != "") {
      filterQuery += `&status=${statusFilter}`;
    }
    if (speciesFilter != "") {
      filterQuery += `&species=${speciesFilter}`;
    }
    if (typeFilter != "") {
      filterQuery += `&type=${typeFilter}`;
    }
    if (genderFilter != "") {
      filterQuery += `&gender=${genderFilter}`;
    }

    let fetchUrl = apiUrl + filterQuery;

    let characters = [];
    try {
      fetch(fetchUrl)
        .then((response) => response.json())
        .then((data) => {
          if (data.error == null) {
            hideNoMatchesMessage();
            pageCount = data.info.pages;
            characters = data.results;

            characterContainer.innerHTML = "";

            characters.forEach((character) => {
              const card = createCharacterCard(character);
              card.addEventListener("click", () =>
                toggleCharacterDetails(character)
              );
              characterContainer.appendChild(card);
            });
            updatePageSelect(data.info.pages, currentPage);
          } else {
            showNoMatchesMessage();
            pageCount = 1;
            characters = [];

            characterContainer.innerHTML = "";
            updatePageSelect(1, 1);
          }
        });
    } catch (err) {
      console.log(
        `An error has ocurred while trying to fetch the resources. (${err})`
      );
    }
  }

document.addEventListener("DOMContentLoaded", function () {

  //---------------------EVENT LISTENERS---------------------
  mainTitle.addEventListener("click", () => resetPage());

  prevPageButton.addEventListener("click", () => changePage(currentPage - 1));

  nextPageButton.addEventListener("click", () => changePage(currentPage + 1));

  filterButton.addEventListener("click", () => toggleFilters());

  applyFilterButton.addEventListener("click", () => applyFilters());

  resetFilterButton.addEventListener("click", () => resetFilters());

  searchInput.addEventListener("input", function () {
    nameFilter = this.value.trim();
    currentPage = 1;
    fetchAndDisplayData();
  });

  

  fetchAndDisplayData();
});
