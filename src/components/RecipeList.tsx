import React, { useContext, useState } from "react";
import Recipe from "./Recipe";

import "../css/app.css";
import "../css/buttons.css";
import "../css/RecipeList.css";
import { RecipeContext } from "../context/RecipeContext";

export default function RecipeList() {
  const { recipes, addNewRecipe } = useContext(RecipeContext);

  const recipeList = recipes.map((recipe) => {
    return <Recipe key={recipe.id} recipe={recipe} />;
  });

  return (
    <div className="recipe-list-container">
      <div>{recipeList}</div>
      <div className="add-recipe-button-container">
        <button
          className="button btn--primary"
          onClick={() => {
            addNewRecipe();
          }}
        >
          Add Recipe
        </button>
      </div>
    </div>
  );
}
