import { useEffect, useState } from "react";
import { ingredient } from "./Interfaces";

interface RecipeIngredientEditProps {
  ingredient: ingredient;
  update: (newIngredient: ingredient) => void;
  delete: () => void;
}

export default function RecipeIngredientEdit(props: RecipeIngredientEditProps) {
  const MAX_INGREDIENT_INPUT = 30;
  const [item, setItem] = useState<string>(props.ingredient.item);
  const [amount, setAmount] = useState<string>(props.ingredient.amount);

  useEffect(() => {
    handleUpdate();
  }, [item, amount]);

  const handleUpdate = () => {
    const updatedIngredient: ingredient = { item: item, amount: amount };
    props.update(updatedIngredient);
  };

  return (
    <>
      <input
        className="recipe-edit__input"
        maxLength={MAX_INGREDIENT_INPUT}
        type="text"
        value={item}
        onChange={(e) => {
          setItem(e.target.value);
        }}
      />
      <input
        className="recipe-edit__input"
        maxLength={MAX_INGREDIENT_INPUT}
        type="text"
        value={amount}
        onChange={(e) => {
          setAmount(e.target.value);
        }}
      />
      <button className="button btn--danger" onClick={props.delete}>
        &times;
      </button>
    </>
  );
}
