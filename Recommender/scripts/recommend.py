import faiss
import pickle
from sentence_transformers import SentenceTransformer
import json
from typing import List, Dict
import re

class GameRecommender:
    def __init__(self):
        # Load the saved model and indexes
        self.model = SentenceTransformer('all-MiniLM-L6-v2')
        self.index = faiss.read_index('models/indexes/games.index')
        
        # Load mappings
        with open('models/indexes/index_to_game_id.pkl', 'rb') as f:
            self.index_to_game_id = pickle.load(f)
        
        with open('models/indexes/game_id_to_info.pkl', 'rb') as f:
            self.game_id_to_info = pickle.load(f)
        
        # Load processed games for getting combined features
        with open('data/processed_games.json', 'r') as f:
            self.processed_games = {game['id']: game for game in json.load(f)}

    def get_base_name(self, name: str) -> str:
        """Extract base name of game"""
        name = name.lower()
        name = re.sub(r'\s+[ivx\d]+(:)?(\s|$)', ' ', name)
        name = re.sub(r'\s*(:\s*|\s+-\s+).*$', '', name)
        name = re.sub(r'[^a-z0-9\s]', '', name)
        return name.strip()

    def clean_text(self, text: str) -> str:
        """Clean input text"""
        text = text.lower()
        text = re.sub(r'[^a-z0-9\s]', ' ', text)
        text = ' '.join(text.split())
        return text

    def get_recommendations_by_content(
        self,
        name: str,
        description: str,
        genres: str = "",
        platforms: str = "",
        num_recommendations: int = 10,
        max_related: int = 1
    ) -> List[Dict]:
        """Get recommendations using game content (works for any game)"""
        # Clean input
        name = self.clean_text(name)
        description = self.clean_text(description)
        genres = self.clean_text(genres)
        platforms = self.clean_text(platforms)

        # Create combined features (matching our training format)
        combined_features = f"{name} {genres} {platforms} {description} {description} {description}"
        
        # Generate embedding
        game_embedding = self.model.encode([combined_features])
        
        # Find similar games
        extra_count = 20
        distances, indices = self.index.search(game_embedding, num_recommendations + extra_count)
        
        # Filter recommendations
        recommendations = []
        series_count = {}
        base_name = self.get_base_name(name)
        
        for idx in indices[0]:
            game_id = self.index_to_game_id[idx]
            game_info = self.game_id_to_info[game_id]
            current_base_name = self.get_base_name(game_info['name'])
            
            # Skip games from same series
            if current_base_name == base_name:
                continue
                
            if current_base_name in series_count:
                if series_count[current_base_name] >= max_related:
                    continue
                series_count[current_base_name] += 1
            else:
                series_count[current_base_name] = 1
            
            recommendations.append({
                'id': game_id,
                'name': game_info['name'],
                'slug': game_info['slug']
            })
            
            if len(recommendations) >= num_recommendations:
                break
        
        return recommendations

def main():
    # Test the recommender
    recommender = GameRecommender()

    # Test with custom game content
    print("\nTesting with custom game content:")
    test_game = {
        'name': "Warframe",
        'description': "Warframe is an online free-to-play cooperative third-person looter shooter. In the far future the Orokin had absolute control over the solar system but have since disappeared, now the militaristic Grineer, the money-worshipping Corpus, and the Infested fight for what they left behind. You are a Tenno - a master of gun and blade and user of the Warframes, it is up to you to bring back balance to the system from within, while also fighting a new threat from without: the Sentients. Over 40 unique Warframes to build, hundreds of guns and melee weapons to utilize, and various pet companions to help you along the way - all of which can be crafted for free and enhanced by an in-depth modding system. With constant updates by Digital Extremes, the game now has over six years of updates including new open-world landscapes (Plains of Eidolon-2017, Orb Vallis-2018) and cinematic story expansions (The Second Dream-2015, The War Within-2016, The The Sacrifice-2018) with more content being added every year.",
        'genres': "Action Shooter rPG massively Multiplayer",
        'platforms': "PC Play Station Xbox iOS Nintendo Switch"
    }
    
    recommendations = recommender.get_recommendations_by_content(
        name=test_game['name'],
        description=test_game['description'],
        genres=test_game['genres'],
        platforms=test_game['platforms']
    )
    
    print(f"Recommendations for {test_game['name']}:")
    for i, rec in enumerate(recommendations, 1):
        print(f"{i}. {rec['name']}")

if __name__ == "__main__":
    main()