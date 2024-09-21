import os
import pandas as pd
import numpy as np
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import json

# 1. Load the data from game_data.json
def load_data():
    # Get the absolute path of the directory where the Python script is located
    script_dir = os.path.dirname(os.path.realpath(__file__))
    
    # Construct the path to the JSON file relative to the script's location
    file_path = os.path.join(script_dir, 'game_data.json')
    
    # Load the JSON file and convert it to a pandas DataFrame
    with open(file_path, 'r', encoding='utf-8') as file:
        data = json.load(file)
    
    return pd.DataFrame(data)

# 2. Preprocessing: Combine only relevant features into a single string for vectorization
def preprocess_data(df):
    # Combine only description, genres, platforms into a single string for TF-IDF
    df['combined_features'] = df.apply(lambda row: ' '.join(row['genres']) + ' ' + ' '.join(row['parent_platforms']) + ' ' + row['description'], axis=1)
    return df

# 3. Vectorization using TF-IDF for combined features
def vectorize_features(df):
    vectorizer = TfidfVectorizer(stop_words='english')
    tfidf_matrix = vectorizer.fit_transform(df['combined_features'])
    return tfidf_matrix, vectorizer

# 4. Compute cosine similarity
def compute_similarity(tfidf_matrix):
    cosine_sim = cosine_similarity(tfidf_matrix, tfidf_matrix)
    return cosine_sim

# 5. Recommend games based on user input
def recommend_games_from_input(df, user_input, vectorizer):
    # Preprocess the user input in the same way as the dataset
    combined_features = ' '.join(user_input['genres']) + ' ' + ' '.join(user_input['parent_platforms']) + ' ' + user_input['description']
    
    # Transform the input using the same TF-IDF vectorizer
    user_input_vector = vectorizer.transform([combined_features])

    # Append the user's game vector to the dataset's TF-IDF matrix
    combined_tfidf_matrix = np.vstack([vectorizer.transform(df['combined_features']).toarray(), user_input_vector.toarray()])

    # Compute cosine similarity between the user input and all other games
    cosine_sim = cosine_similarity(user_input_vector, combined_tfidf_matrix[:-1])

    # Get the pairwise similarity scores for all games with the input game
    sim_scores = list(enumerate(cosine_sim[0]))

    # Sort the games based on the similarity scores
    sim_scores = sorted(sim_scores, key=lambda x: x[1], reverse=True)

    # Filter out the game with the same ID as the input
    filtered_scores = [(i, score) for i, score in sim_scores if df.iloc[i]['id'] != int(user_input['id'])]

    # Get the top 10 most similar games
    top_sim_scores = filtered_scores[:10]

    # Get the game indices
    game_indices = [i[0] for i in top_sim_scores]

    # Return the top 10 most similar games (including id, name, and metacritic for display)
    return df.iloc[game_indices][['id', 'name', 'metacritic', 'genres', 'parent_platforms']]

# Main function to load data, accept user input, and recommend games
def main():
    # Load the data
    df = load_data()

    # Apply preprocessing (ignore id, name, metacritic in combined features)
    df = preprocess_data(df)

    # Vectorize the combined features
    tfidf_matrix, vectorizer = vectorize_features(df)

    # Get user input for a new game
    user_input = {
        'id': input("Enter the game id: "),
        'description': input("Enter game description: "),
        'genres': input("Enter game genres (comma-separated): ").split(', '),
        'parent_platforms': input("Enter game platforms (comma-separated): ").split(', ')
    }

    # Get the top 10 recommended games based on user input
    recommended_games = recommend_games_from_input(df, user_input, vectorizer)

    # Print recommended games
    print("\nRecommended Games:")
    print(recommended_games)

if __name__ == '__main__':
    main()
