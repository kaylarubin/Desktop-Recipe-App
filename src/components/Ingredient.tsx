import React from "react";
import { ingredient } from "./Interfaces";

export default function Ingredient(props: ingredient) {
  return (
    <>
      <div className="ingredient-field">{props.item}</div>
      <div className="ingredient-field">{props.amount}</div>
    </>
  );
}
