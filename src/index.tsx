import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { RecipeItem } from './components/RecipeItem';
import { Recipe } from './components/RecipeItem';
import bookmarkIcon from './images/bookmark-icon.svg'
import closeIcon from './images/close-icon.svg';

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
      <main className="bg-backgroundWhite font-inter relative">
        <div className='w-[352px] md:w-[80%] mx-auto flex items-baseline justify-between'>
          <h1 className="px-md uppercase text-lg tracking-[0.4375em] font-semibold text-textHeading leading-header pt-xl pb-lg flex-1 flex justify-center">Recipebox</h1>
          <button className="ml-auto relative" onClick={togglePopup}>
            <img src={bookmarkIcon} alt="Bookmark" />
            {bookmarkedRecipes.length > 0 && (
              <span className="absolute top-[-5px] right-[-5px] inline-flex items-center justify-center text-sm font-bold bg-buttonRed text-textWhite rounded-full w-[13px] h-[13px]">
                {bookmarkedRecipes.length}
              </span>
            )}
          </button>
        </div>
        {isLoading && <p>Loading...</p>}
        {hasError && <p>Oops! Error occurred while fetching recipes. Report this as a bug 🤖</p>}
    
        <ul className="flex flex-wrap justify-center gap-md w-[352px] md:w-[80%] mx-auto">
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
          <>
            <div className="fixed inset-0 bg-backgroundGray pointer-events-none z-40"></div>
            <div className="fixed bottom-0 left-0 w-full bg-backgroundBlack pb-lg rounded-t-3xl z-50">
              <div className="relative pt-xl">
                <button onClick={togglePopup} className="absolute top-4 right-4">
                  <img src={closeIcon} alt="Close"/>
                </button>
              </div>
              <ul className="flex flex-col gap-md">
                {recipes
                  .filter((recipe: any) => bookmarkedRecipes.includes(recipe.id))
                  .map((recipe: any) => (
                    <RecipeItem
                      key={recipe.id}
                      recipe={recipe}
                      onToggleBookmark={toggleBookmark}
                      isBookmarked={isBookmarked(recipe.id)}
                      variant="popup"
                    />
                  ))}
              </ul>
            </div>
          </>
        )}
      </main>
    );
};

createRoot(document.getElementById('root')!).render(<App />);
