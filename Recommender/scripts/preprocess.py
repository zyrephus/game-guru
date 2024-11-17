import json
import re
from bs4 import BeautifulSoup
import pandas as pd
from typing import List, Dict

def clean_text(text: str) -> str:
    """
    Clean description text:
    - Remove HTML tags
    - Convert to lowercase
    - Remove special characters
    - Remove extra whitespace
    """
    # Remove HTML tags
    text = BeautifulSoup(text, "html.parser").get_text()
    # Convert to lowercase
    text = text.lower()
    # Remove special characters and extra whitespace
    text = re.sub(r'[^a-z0-9\s]', ' ', text)
    text = ' '.join(text.split())
    return text

def process_game(game: Dict) -> Dict:
    """
    Process a single game entry:
    - Clean description
    - Join genres into string
    - Join platforms into string
    """
    return {
        'id': game['id'],
        'slug': game['slug'],
        'name': game['name'].lower(),  # lowercase for consistency
        'description': clean_text(game['description']),
        'genres': ' '.join([g.lower() for g in game['genres']]) if game['genres'] else '',
        'platforms': ' '.join([p.lower() for p in game['parent_platforms']]) if game['parent_platforms'] else ''
    }

def main():
    # Read raw data
    with open('data/game_data.json', 'r', encoding='utf-8') as f:
        games = json.load(f)
    
    # Process each game
    processed_games = [process_game(game) for game in games]
    
    # Create combined text for similarity comparison
    for game in processed_games:
        # Emphasize description more by repeating it
        game['combined_features'] = f"{game['name']} {game['genres']} {game['platforms']} {game['description']} {game['description']} {game['description']}"
    
    # Save processed data
    with open('data/processed_games.json', 'w', encoding='utf-8') as f:
        json.dump(processed_games, f, indent=2)
    
    print(f"Processed {len(processed_games)} games")
    # Print example of first game for verification
    print("\nExample of processed game:")
    print(json.dumps(processed_games[0], indent=2))

if __name__ == "__main__":
    main()