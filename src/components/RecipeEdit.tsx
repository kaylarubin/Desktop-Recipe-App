import { useContext, useState } from "react";
import RecipeIngredientEdit from "./RecipeIngredientEdit";
import { ingredient, recipeItem } from "./Interfaces";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { RecipeContext } from "../context/RecipeContext";

interface RecipeEditProps {
  handleExit: () => void;
  recipe: recipeItem;
}

export default function RecipeEdit(props: RecipeEditProps) {
  const MAX_COOK_LENGTH = 30;
  const MAX_NAME_LENGTH = 60;
  const MIN_SERVINGS = 1;
  const MAX_SERVINGS = 100;

  const { updateRecipe } = useContext(RecipeContext);
  const [recipeName, setRecipeName] = useState<string>(props.recipe.name);
  const [cookTime, setCookTime] = useState<string>(props.recipe.cookTime);
  const [servings, setServings] = useState<number>(props.recipe.servings);
  const [instructions, setInstrunctions] = useState<string>(
    props.recipe.instructions
  );
  const [ingredients, setIngredients] = useState<ingredient[]>(
    props.recipe.ingredients
  );

  const updateIngredients = (index: number, ingredient: ingredient) => {
    const newIngredients = [...ingredients];
    newIngredients[index] = ingredient;
    setIngredients(newIngredients);
  };

  const servingsOnChange = (
    event: React.FocusEvent<HTMLInputElement, Element>
  ) => {
    const value = event.target.value;
    if (value.length > 3) setServings(parseInt(value.substring(0, 3)));
    else setServings(parseInt(value));
  };

  const servingsOnUnFocus = (
    event: React.FocusEvent<HTMLInputElement, Element>
  ) => {
    const value = parseInt(event.target.value);
    if (value > 100) setServings(MAX_SERVINGS);
  };

  const handleAddIngredient = () => {
    const newIngredient: ingredient = { item: "", amount: "" };
    setIngredients((prev) => {
      const update = [...prev];
      update.push(newIngredient);
      return update;
    });
  };

  const handleUpdateRecipe = () => {
    const nonEmptyIngredients = ingredients.filter((ingredient) => {
      return (
        ingredient.item.replace(/\s/g, "").length !== 0 &&
        ingredient.amount.replace(/\s/g, "").length !== 0
      );
    });
    const updatedRecipe: recipeItem = {
      id: props.recipe.id,
      name: recipeName,
      cookTime: cookTime,
      servings: servings,
      instructions: instructions,
      ingredients: nonEmptyIngredients,
    };
    updateRecipe(updatedRecipe);
  };

  const handleExit = () => {
    props.handleExit();
  };

  const getIngredientsSection = () => {
    return (
      <div className="recipe-edit__ingredients-grid">
        <div className="recipe-edit__ingredients-grid-title">Name</div>
        <div className="recipe-edit__ingredients-grid-title">Amount</div>
        <div></div>
        {ingredients.map((i: ingredient, index: number) => {
          return (
            <RecipeIngredientEdit
              ingredient={i}
              key={`ingredient-${index}`}
              update={(newIngredient: ingredient) => {
                updateIngredients(index, newIngredient);
              }}
              delete={() => {
                const update = [...ingredients];
                update.splice(index, 1);
                setIngredients(update);
              }}
            />
          );
        })}
      </div>
    );
  };

  return (
    <div className="modal-container recipe-edit">
      <div className="recipe-edit__exit-button-wrapper">
        <button className="recipe-edit__exit-button" onClick={handleExit}>
          &times;
        </button>
      </div>
      <div className="recipe-edit__recipe-grid">
        <label className="recipe-edit__label" htmlFor="name">
          Name
        </label>
        <input
          className="recipe-edit__input recipe-edit__upper-inputs"
          type="text"
          name="name"
          id="cookTime"
          maxLength={MAX_NAME_LENGTH}
          value={recipeName}
          onChange={(e) => {
            setRecipeName(e.target.value);
          }}
        />
        <label className="recipe-edit__label" htmlFor="cookTime">
          Cook Time
        </label>
        <input
          className="recipe-edit__input recipe-edit__upper-inputs"
          type="text"
          name="cookTime"
          id="cookTime"
          maxLength={MAX_COOK_LENGTH}
          value={cookTime}
          onChange={(e) => {
            setCookTime(e.target.value);
          }}
        />
        <label className="recipe-edit__label " htmlFor="servings">
          Servings
        </label>
        <input
          className="recipe-edit__input recipe-edit__upper-inputs"
          type="number"
          min={MIN_SERVINGS}
          max={MAX_SERVINGS}
          maxLength={3}
          name="servings"
          id="servings"
          value={servings}
          onChange={servingsOnChange}
          onBlur={servingsOnUnFocus}
        />
        <label className="recipe-edit__label" htmlFor="instructions">
          Instructions
        </label>
        <textarea
          className="recipe-edit__input recipe-edit__upper-inputs recipe-edit__text-area"
          name="instructions"
          id="instructions"
          value={instructions}
          onChange={(e) => {
            setInstrunctions(e.target.value);
          }}
        />
      </div>
      <br />
      <div className="recipe-edit__ingredients-header">
        <label className="recipe-edit__label">Ingredients</label>
        <button
          className="recipe-edit__add-ingredient-button button"
          onClick={handleAddIngredient}
        >
          <AddCircleIcon />
          <div>Add</div>
        </button>
      </div>
      {ingredients.length > 0 ? getIngredientsSection() : null}
      <div className="recipe-edit__update-recipe">
        <button
          className="button btn--primary"
          onClick={() => {
            handleUpdateRecipe();
            handleExit();
          }}
        >
          Update Recipe
        </button>
      </div>
    </div>
  );
}
