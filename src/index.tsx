import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { RecipeItem } from './components/RecipeItem'
import { Recipe } from './components/RecipeItem'

const App: React.FC = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [bookmarkedRecipes, setBookmarkedRecipes] = useState<number[]>([]);
  const [isPopupVisible, setIsPopupVisible] = useState(false);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const apiUrl = process.env.REACT_APP_API_URL || '';
        const authHeader = 'Basic ' + btoa(process.env.BASIC_AUTH || '');

        const response = await fetch(apiUrl, {
          headers: {
            'Authorization': authHeader,
          },
        });

        const data = await response.json();
        setRecipes(data.recipes);
      } catch (error) {
        console.error('Error fetching recipes:', error);
      }
    };

    fetchRecipes();
  }, []);

  const toggleBookmark = (id: number) => {
    setBookmarkedRecipes(prevState =>
      prevState.includes(id) ? prevState.filter(recipeId => recipeId !== id) : [...prevState, id]
    );
  };

  const togglePopup = () => {
    setIsPopupVisible(!isPopupVisible);
  };

  const isBookmarked = (id: number): boolean => bookmarkedRecipes.includes(id);

  return (
    <>
      <h1>Recipebox</h1>
      <ul>
        {recipes.map((recipe: Recipe) => (
          <RecipeItem
            key={recipe.id}
            recipe={recipe}
            onToggleBookmark={toggleBookmark}
            isBookmarked={isBookmarked(recipe.id)}
          />
        ))}
      </ul>
      <button onClick={togglePopup}>
        {isPopupVisible ? 'Hide Bookmarked Recipes' : 'Show Bookmarked Recipes'}
      </button>
      {isPopupVisible && (
        <div>
          <button onClick={togglePopup}>Close</button>
          <h2>Bookmarked Recipes</h2>
          <ul>
            {recipes
              .filter((recipe: any) => bookmarkedRecipes.includes(recipe.id))
              .map((recipe: any) => (
                <RecipeItem
                  key={recipe.id}
                  recipe={recipe}
                  onToggleBookmark={toggleBookmark}
                  isBookmarked={isBookmarked(recipe.id)}
                />
              ))}
          </ul>
        </div>
      )}
    </>
  );
};

createRoot(document.getElementById('root')!).render(<App />);