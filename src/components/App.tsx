import RecipeList from "./RecipeList";
import { RecipeProvider } from "../context/RecipeContext";
import "../css/app.css";

function App() {
  return (
    <RecipeProvider>
      <RecipeList />
    </RecipeProvider>
  );
}

export default App;
