export interface recipeItem {
  id: string;
  name: string;
  cookTime: string;
  servings: number;
  instructions: string;
  ingredients: ingredient[];
}

export interface ingredient {
  item: string;
  amount: string;
}
