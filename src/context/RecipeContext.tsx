import { createContext, useState } from "react";
import Recipes_JSON from "../data/recipes.json";
import { recipeItem } from "../components/Interfaces";
import { v4 as uuidv4 } from "uuid";

interface IRecipeContext {
  recipes: recipeItem[];
  removeRecipe: (id: string) => void;
  updateRecipe: (newRecipe: recipeItem) => void;
  addNewRecipe: () => void;
}

export const initialState: IRecipeContext = {
  recipes: [],
  removeRecipe: () => {},
  updateRecipe: () => {},
  addNewRecipe: () => {},
};

export const RecipeContext = createContext<IRecipeContext>(initialState);

export function RecipeProvider({ children }: { children: React.ReactNode }) {
  const [recipes, setRecipes] = useState<recipeItem[]>(Recipes_JSON.recipes);

  const removeRecipe = (id: string) => {
    const updatedRecipes = [...recipes];
    const indexToRemove = recipes.findIndex((recipe) => recipe.id === id);
    if (indexToRemove !== -1) {
      updatedRecipes.splice(indexToRemove, 1);
    }
    setRecipes(updatedRecipes);
  };

  const updateRecipe = (newRecipe: recipeItem) => {
    const index = recipes.findIndex((recipe) => {
      return newRecipe.id === recipe.id;
    });
    if (index !== -1) {
      setRecipes((prev) => {
        const update = [...prev];
        update[index] = newRecipe;
        return update;
      });
    }
  };

  const addNewRecipe = () => {
    const newRecipe: recipeItem = {
      id: uuidv4(),
      name: "New Recipe",
      cookTime: "None",
      servings: 1,
      instructions: "None",
      ingredients: [],
    };
    const updatedRecipes = [...recipes];
    updatedRecipes.push(newRecipe);
    setRecipes(updatedRecipes);
  };

  return (
    <RecipeContext.Provider
      value={{
        recipes,
        removeRecipe,
        updateRecipe,
        addNewRecipe,
      }}
    >
      {children}
    </RecipeContext.Provider>
  );
}
