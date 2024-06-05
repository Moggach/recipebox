import React from 'react';

interface RecipeItemProps {
  recipe: Recipe; 
  onToggleBookmark: (id: number) => void;
  isBookmarked: boolean;
}

export interface Recipe {
  id: number;
  title: string;
  description: string;
  image?: { url: string; title: string }[];
}

const RecipeItem: React.FC<RecipeItemProps> = ({ recipe, onToggleBookmark, isBookmarked }) => {
  return (
    <li key={recipe.id}>
      <h3>{recipe.title}</h3>
      <p>{recipe.description}</p>
      {recipe.image && recipe.image.length > 0 && (
        <img src={recipe.image[0].url} alt={recipe.image[0].title} width="200" />
      )}
      <button onClick={() => onToggleBookmark(recipe.id)}>
        {isBookmarked? 'Unbookmark' : 'Bookmark'}
      </button>
    </li>
  );
};

export { RecipeItem };