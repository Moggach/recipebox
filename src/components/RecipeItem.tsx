import React from 'react';

interface RecipeItemProps {
  recipe: Recipe;
  onToggleBookmark: (id: number) => void;
  isBookmarked: boolean;
  variant?: 'main' | 'popup';
}

export interface Recipe {
  id: number;
  title: string;
  description: string;
  image?: { url: string; title: string }[];
}

const RecipeItem: React.FC<RecipeItemProps> = ({ recipe, onToggleBookmark, isBookmarked, variant = 'main' }) => {
  const containerClass = variant === 'main' ? 'w-[166px]' : 'w-[352px] flex items-center justify-between mx-auto';
  const titleClass = variant === 'main' ? 'font-inter text-md font-medium text-textBlack' : 'font-inter text-md font-medium text-textWhite';
  const imageWrapper = variant === 'main' ? '' : 'flex items-center gap-md';
  const imageClass = variant === 'main' ? 'rounded-xl mb-xs max-h-[166px] object-cover' : 'rounded-xl max-w-[54px] max-h-[54px] object-cover';

  return (
    <li className={containerClass} key={recipe.id}>
      <div className={imageWrapper}>
        {recipe.image && recipe.image.length > 0 && (
          <img className={imageClass} src={recipe.image[0].url} alt={recipe.image[0].title} width="200" />
        )}
        <div className="flex justify-between align-top">
          <h3 className={titleClass}>{recipe.title}</h3>
          {variant === 'main' && (
            <button onClick={() => onToggleBookmark(recipe.id)}>
              {isBookmarked ? (
                <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 25 25" fill="none">
                  <circle cx="12.5" cy="12.5" r="12.5" fill="#404040" />
                  <path d="M15.5517 7.765C16.1519 7.83484 16.5923 8.35264 16.5923 8.95721V17.4107L12.5 15.3646L8.40775 17.4107V8.95721C8.40775 8.35264 8.84753 7.83484 9.44827 7.765C11.476 7.52963 13.5241 7.52963 15.5517 7.765Z" stroke="#FAFAFA" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 25 25" fill="none">
                  <circle cx="12.5" cy="12.5" r="12.5" fill="#FFFFFF" stroke="#404040" />
                  <path d="M15.5517 7.765C16.1519 7.83484 16.5923 8.35264 16.5923 8.95721V17.4107L12.5 15.3646L8.40775 17.4107V8.95721C8.40775 8.35264 8.84753 7.83484 9.44827 7.765C11.476 7.52963 13.5241 7.52963 15.5517 7.765Z" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
              )}
            </button>
          )}
        </div>
      </div>
      {variant === 'popup' && (
        <button className="text-textWhite bg-buttonGray rounded-3xl text-md h-[25px] px-2 py-1" onClick={() => onToggleBookmark(recipe.id)}>
          Remove
        </button>
      )}
    </li>
  );
};

export { RecipeItem };
