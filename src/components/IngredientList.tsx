import React from "react";
import Ingredient from "./Ingredient";
import { ingredient } from "./Interfaces";

interface Props {
  ingredients: ingredient[];
}
export default function IngredientList(props: Props) {
  const ingredientElements = props.ingredients.map((i: ingredient, indexId) => {
    return <Ingredient key={indexId} item={i.item} amount={i.amount} />;
  });
  return <div className="ingredient-grid ml-2">{ingredientElements}</div>;
}
