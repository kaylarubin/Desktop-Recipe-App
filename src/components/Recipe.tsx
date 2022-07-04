import { useContext, useState } from "react";
import { RecipeContext } from "../context/RecipeContext";
import IngredientList from "./IngredientList";
import { recipeItem } from "./Interfaces";
import RecipeEdit from "./RecipeEdit";
import "../css/recipe-edit.css";
import "../css/app.css";
import { Box, Modal } from "@mui/material";

interface RecipeProps {
  recipe: recipeItem;
}

export default function Recipe(props: RecipeProps) {
  const { removeRecipe } = useContext(RecipeContext);
  const [editModalOpen, setEditModalOpen] = useState(false);

  return (
    <div className="recipe-container">
      <div className="header-background">
        <div className="Recipe__button-container mr-1">
          <button
            className="button btn--primary mr-1"
            onClick={() => {
              setEditModalOpen(true);
            }}
          >
            Edit
          </button>
          <button
            className="button btn--danger"
            onClick={() => {
              removeRecipe(props.recipe.id);
            }}
          >
            Delete
          </button>
        </div>
        <h3 className="recipe-name">{props.recipe.name}</h3>
      </div>
      <div className="Recipe__recipe-row-container">
        <div className="recipe-row">
          <span className="recipe-label mr-1">Cook Time:</span>
          <span className="recipe-span">{props.recipe.cookTime}</span>
        </div>
        <div className="recipe-row">
          <span className="recipe-label mr-1">Servings:</span>
          <span className="recipe-span">{props.recipe.servings}</span>
        </div>
        <div className="recipe-row">
          <div className="recipe-label">Instructions:</div>
          <div className="recipe-instructions ml-2">
            {props.recipe.instructions}
          </div>
        </div>
        <div className="recipe-row">
          <div className="recipe-label">Ingredients:</div>
          <IngredientList ingredients={props.recipe.ingredients} />
        </div>
      </div>

      <Modal
        open={editModalOpen}
        onClose={() => {
          setEditModalOpen(false);
        }}
      >
        <Box>
          <RecipeEdit
            handleExit={() => {
              setEditModalOpen(false);
            }}
            recipe={props.recipe}
          />
        </Box>
      </Modal>
    </div>
  );
}
