
# 🛸 Rick and Morty Character Explorer🔎
![main-view](https://github.com/devcale/rick-morty-app/assets/65783607/14053678-23e5-419a-88b1-b68cac3e89c0)

This web application utilizes the [Rick and Morty API](https://rickandmortyapi.com/documentation) to create a simple but interactive tool to explore characters from the animated series. Upon clicking a character's name, the application displays detailed information about that character. 

## Features

-   **Character Table View:** Displays all characters fetched from the API, organized by pages.
-   **Detailed View:** Clicking on a character's name shows comprehensive information about that character, such as:
![detail-view](https://github.com/devcale/rick-morty-app/assets/65783607/97ba0926-8a4d-40a2-ab10-18683a43276a)

	- Status: Displays whether the character is alive, dead, or unknown. This status provides insight into the character's current state within the series.
	- Species: The world of Rick and Morty encompasses a diverse array of alien species, showcasing creatures ranging from humanoid beings to fantastical creatures and extraterrestrial entities. Each character represents a unique species, adding depth and variety to the show's universe.
	- Type: Some characters exhibit specific types within their respective species. For instance, they might be identified as Corn-person, Giant Cat Monster, Lizards, or even Toy entities. This variety showcases the creativity and imagination behind the show's character designs, offering a wide range of intriguing beings.
	- Gender: Characters in Rick and Morty can have various gender identities, including female, male, genderless, or an unknown gender specification. This diversity reflects the show's commitment to exploring different character traits and identities.
	- Episodes: Each character's journey unfolds across different episodes. The detailed view provides information on the name and number of each episode in which the character has made an appearance. This feature allows fans to track and revisit the character's storyline throughout the series.
-   **Search Functionality:** Enables users to search for specific characters by name, with live results.
-   **Filtering Options:** Allows users to filter characters by status, species, type, and gender.
-   **Mix and Match Filters:** Users can combine different filters to obtain customized search results. An example of this may be filtering all the female characters that are alive, are human, and contain the letter 'e' in their names.
![filter view](https://github.com/devcale/rick-morty-app/assets/65783607/cab6ca6e-3a8b-4564-a8a3-b146c4c6b8b8)

-   **Pagination:** Easy navigation through multiple pages of character listings. Pages update automatically for each filter applied.
-   **No Matches Message:** Informs users when their search or filter criteria yield no results.
![no matches](https://github.com/devcale/rick-morty-app/assets/65783607/20ad4f61-adce-4b4f-8b3f-3c95db2c080c)


## Benefits of Not Using Frameworks like Bootstrap

One of the primary advantages of not using frameworks or libraries like Bootstrap is the freedom it offers in crafting a custom and lightweight solution tailored to specific project needs. By avoiding reliance on pre-built components, developers have greater control over:

-   **Performance:** Hand-crafted code tends to be leaner, resulting in faster load times and reduced bandwidth usage.
-   **Flexibility:** Custom implementations allow for more flexibility and creativity in design and functionality.
-   **Learning and Skill Enhancement:** Building without frameworks encourages a deeper understanding of underlying technologies and coding principles.

## Getting Started

To run the project locally:

1.  Clone this repository.
2.  Open the `index.html` file in your browser.

## Technologies Used

-   HTML
-   CSS
-   JavaScript

## Acknowledgments

Special thanks to the creators of the Rick and Morty API for providing the data used in this project.
