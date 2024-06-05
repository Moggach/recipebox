import React from 'react';
import isBookMarkedIcon from '../images/is-bookmarked-icon.svg'
import isNotBookMarkedIcon from '../images/is-not-bookmarked-icon.svg'

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
  const containerClass = variant === 'main' ? 'w-[166px]' : 'w-[352px] md:w-[80%] flex items-center justify-between mx-auto';
  const titleClass = variant === 'main' ? 'text-md font-medium text-textBlack max-w-[70%]' : 'text-md font-medium text-textWhite';
  const imageWrapper = variant === 'main' ? '' : 'flex items-center gap-md';
  const imageClass = variant === 'main' ? 'rounded-xl mb-xs max-h-[166px] object-cover' : 'rounded-xl max-w-[54px] max-h-[54px] md:max-h-[120px] md:max-w-[120px] object-cover';

  return (
    <li className={containerClass} key={recipe.id}>
      <div className={imageWrapper}>
        {recipe.image && recipe.image.length > 0 && (
          <img className={imageClass} src={recipe.image[0].url} alt={recipe.image[0].title} width="100%" />
        )}
        <div className="flex justify-between align-top">
          <h3 className={titleClass}>{recipe.title}</h3>
          {variant === 'main' && (
            <button className="self-start" onClick={() => onToggleBookmark(recipe.id)}>
              {isBookmarked ? (
              <img src={isBookMarkedIcon} alt="BookMark" />
              ) : (
                 <img src={isNotBookMarkedIcon} alt="Remove BookMark" />
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
