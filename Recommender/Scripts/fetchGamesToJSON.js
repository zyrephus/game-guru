import { writeFileSync } from 'fs';
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const axiosInstance = axios.create({
  baseURL: 'https://api.rawg.io/api',
  params: {
    key: process.env.VITE_RAWG_API_KEY,
  }
});

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
  const targetGames = 10000;

  console.log('Starting fetch process...');

  while (hasNextPage && allGames.length < targetGames) {
    try {
      const response = await axiosInstance.get('/games', {
        params: {
          page: page,
          page_size: 40,
        }
      });

      // Progress update every 5 pages
      if (page % 5 === 0) {
        console.log(`Fetching page ${page}... Total games so far: ${allGames.length}`);
      }

      const detailedGamesPromises = response.data.results.map(async (game) => {
        const details = await fetchGameDetails(game.id);
        if (details) {
          return {
            id: game.id,
            slug: game.slug,
            name: game.name,
            description: details.description_raw,
            genres: game.genres?.map((g) => g.name),
            parent_platforms: game.parent_platforms?.map((p) => p.platform.name),
            metacritic: game.metacritic,
          };
        }
        return null;
      });

      const detailedGames = await Promise.all(detailedGamesPromises);
      const filteredGames = detailedGames.filter(game => game !== null);

      allGames = [...allGames, ...filteredGames];

      // Progress milestone updates
      if (allGames.length % 1000 === 0) {
        console.log(`Milestone reached: ${allGames.length} games collected`);
      }

      hasNextPage = !!response.data.next;
      if (hasNextPage && allGames.length < targetGames) {
        page++;
      }

    } catch (error) {
      console.error(`Error fetching games on page ${page}:`, error);
      hasNextPage = false;
    }
  }

  // Save all games without slicing
  writeFileSync('game_data.json', JSON.stringify(allGames, null, 2), 'utf-8');
  console.log(`Fetch complete! Saved ${allGames.length} games to game_data.json`);
}

fetchFilteredGames();