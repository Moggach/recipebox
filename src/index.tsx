import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { RecipeItem } from './components/RecipeItem';
import { Recipe } from './components/RecipeItem';

const App: React.FC = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [bookmarkedRecipes, setBookmarkedRecipes] = useState<number[]>([]);
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [hasError, setHasError] = useState<boolean>(false);

  useEffect(() => {
    const fetchRecipes = async () => {
      setIsLoading(true);
      setHasError(false);

      try {
        const apiUrl = process.env.REACT_APP_API_URL || '';
        const authHeader = 'Basic ' + btoa(process.env.BASIC_AUTH || '');

        const response = await fetch(apiUrl, {
          headers: {
            'Authorization': authHeader,
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error status: ${response.status}`);
        }

        const data = await response.json();
        setRecipes(data.recipes);
      } catch (error) {
        console.error('Error fetching recipes:', error);
        setHasError(true);
      } finally {
        setIsLoading(false);
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
    <main className="bg-backgroundWhite font-inter ">
      <div className='w-[352px] mx-auto flex items-baseline justify-between'>
        <h1 className="px-md font-inter uppercase text-lg tracking-[0.4375em] font-semibold text-textHeading leading-header pt-xl pb-lg flex-1 flex justify-center">Recipebox</h1>
        <button className="ml-auto relative" onClick={togglePopup}>
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="18" viewBox="0 0 14 18" fill="none">
            <path d="M11.8519 1.41466C12.7927 1.53021 13.4829 2.38694 13.4829 3.3872V17.3738L7.06846 13.9884L0.654053 17.3738V3.3872C0.654053 2.38694 1.34339 1.53021 2.28502 1.41466C5.46331 1.02523 8.67361 1.02523 11.8519 1.41466Z" fill="#404040" stroke="#404040" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
          {bookmarkedRecipes.length > 0 && (
            <span className="absolute top-[-5px] right-[-5px] inline-flex items-center justify-center text-sm font-bold bg-buttonRed text-textWhite rounded-full w-[13px] h-[13px]">
              {bookmarkedRecipes.length}
            </span>
          )}
        </button>
      </div>
      {isLoading && <p>Loading...</p>}
      {hasError && <p>Oops! Error occurred while fetching recipes. Report this as a bug 🤖</p>}

      <ul className="flex flex-wrap justify-center gap-md w-[352px] mx-auto">
        {recipes.map((recipe: Recipe) => (
          <RecipeItem
            key={recipe.id}
            recipe={recipe}
            onToggleBookmark={toggleBookmark}
            isBookmarked={isBookmarked(recipe.id)}
          />
        ))}
      </ul>

      {isPopupVisible && (
        <div className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-300 p-4">
          <button onClick={togglePopup} className="mb-4">Close</button>
          <h2 className="text-lg font-bold mb-2">Bookmarked Recipes</h2>
          <ul className="max-h-64 overflow-y-auto">
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
    </main>
  );
};

createRoot(document.getElementById('root')!).render(<App />);
