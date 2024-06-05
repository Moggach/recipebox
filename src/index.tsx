import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';

const App: React.FC = () => {

  const [recipes, setRecipes] = useState([]);

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

  return (
    <>
      <h1>Recipebox</h1>
      <ul>
        {recipes.map((recipe: any) => (
          <li key={recipe.id}>
            <h3>{recipe.title}</h3>
            <p>{recipe.description}</p>
            {recipe.image && recipe.image.length > 0 && (
              <img src={recipe.image[0].url} alt={recipe.image[0].title} />
            )}
          </li>
        ))}
      </ul>
    </>
  );
};

createRoot(document.getElementById('root')!).render(<App />);
