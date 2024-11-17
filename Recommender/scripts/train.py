import json
import numpy as np
from sentence_transformers import SentenceTransformer
import faiss
import os
from typing import List, Dict
import pickle

def create_directory(path: str):
    """Create directory if it doesn't exist"""
    if not os.path.exists(path):
        os.makedirs(path)

def load_processed_games(file_path: str) -> List[Dict]:
    """Load processed games from JSON file"""
    with open(file_path, 'r', encoding='utf-8') as f:
        return json.load(f)

def main():
    # Create necessary directories
    create_directory('models/embeddings')
    create_directory('models/indexes')

    # Load processed games
    games = load_processed_games('data/processed_games.json')
    print(f"Loaded {len(games)} processed games")

    # Initialize the sentence transformer model
    # Using a model that's good for semantic similarity
    model = SentenceTransformer('all-MiniLM-L6-v2')
    print("Model loaded")

    # Extract game texts and create a mapping of index to game id
    texts = [game['combined_features'] for game in games]
    index_to_game_id = {i: game['id'] for i, game in enumerate(games)}
    game_id_to_info = {game['id']: {'name': game['name'], 'slug': game['slug']} for game in games}

    # Generate embeddings
    print("Generating embeddings... (this may take a while)")
    embeddings = model.encode(texts, show_progress_bar=True)
    embeddings = np.array(embeddings).astype('float32')
    
    # Create and train FAISS index
    print("Creating FAISS index...")
    dimension = embeddings.shape[1]  # Get the dimension of embeddings
    index = faiss.IndexFlatL2(dimension)  # Using L2 distance
    index.add(embeddings)
    
    # Save the FAISS index
    print("Saving index and mappings...")
    faiss.write_index(index, 'models/indexes/games.index')
    
    # Save the mappings
    with open('models/indexes/index_to_game_id.pkl', 'wb') as f:
        pickle.dump(index_to_game_id, f)
    
    with open('models/indexes/game_id_to_info.pkl', 'wb') as f:
        pickle.dump(game_id_to_info, f)

    print("\nTraining complete!")
    print(f"Total games indexed: {len(games)}")
    print("\nFiles saved:")
    print("- FAISS index: models/indexes/games.index")
    print("- Index mapping: models/indexes/index_to_game_id.pkl")
    print("- Game info mapping: models/indexes/game_id_to_info.pkl")

    # Test a quick search to verify everything works
    print("\nTesting search functionality...")
    k = 5  # number of similar games to find
    test_idx = 0  # test with the first game
    test_game = games[test_idx]
    test_embedding = model.encode([test_game['combined_features']])
    D, I = index.search(test_embedding, k)
    
    print(f"\nTest search for game: {test_game['name']}")
    print("Similar games:")
    for idx in I[0]:
        game_id = index_to_game_id[idx]
        game_info = game_id_to_info[game_id]
        print(f"- {game_info['name']} (slug: {game_info['slug']})")

if __name__ == "__main__":
    main()