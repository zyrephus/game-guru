import { writeFileSync } from 'fs';
import axios from 'axios';

// Axios instance with API key and baseURL set
const axiosInstance = axios.create({
  baseURL: 'https://api.rawg.io/api',
  params: {
    key: '5bc56ff88e8348188b97b4a8b3fc172e',
  }
});

// Fetch detailed data for a specific game, including the description
async function fetchGameDetails(idOrSlug) {
  try {
    const response = await axiosInstance.get(`/games/${idOrSlug}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching details for game ID: ${idOrSlug}`, error);
    return null;
  }
}

async function fetchFilteredGames() {
  let allGames = [];
  let page = 1;
  let hasNextPage = true;

  while (hasNextPage && allGames.length < 2000) { // Game amount
    try {
      const response = await axiosInstance.get('/games', {
        params: {
          page: page,      // Current page number
          page_size: 40,   // Maximum number of games per page (RAWG limit is 40)
        }
      });

      // Fetch detailed information for each game to get the description
      const detailedGamesPromises = response.data.results.map(async (game) => {
        const details = await fetchGameDetails(game.id);
        if (details) {
          return {
            id: game.id,                             // Game ID
            slug: game.slug,                         // Game Slug
            name: game.name,                         // Game Name
            description: details.description_raw,    // Game Description
            genres: game.genres?.map((g) => g.name), // Genre names
            parent_platforms: game.parent_platforms?.map((p) => p.platform.name), // Platform names
            metacritic: game.metacritic,             // Metacritic Score
          };
        }
        return null;
      });

      // Wait for all promises to resolve and filter out null entries
      const detailedGames = await Promise.all(detailedGamesPromises);
      const filteredGames = detailedGames.filter(game => game !== null);

      // Add the fetched games to the allGames array
      allGames = [...allGames, ...filteredGames];

      hasNextPage = !!response.data.next;
      if (hasNextPage && allGames.length < 10000) { // How many games to pull
        page++; // Move to the next page
      }

    } catch (error) {
      console.error(`Error fetching games on page ${page}:`, error);
      hasNextPage = false; // Stop if there's an error
    }
  }

  // Save the accumulated games data to a JSON file
  writeFileSync('game_data.json', JSON.stringify(allGames.slice(0, 2000), null, 2), 'utf-8');
  console.log('Game data successfully saved to game_data.json');
}

// Call the function to fetch and filter the data
fetchFilteredGames();
