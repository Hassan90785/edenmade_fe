import { useEffect,useState } from "react";
import RecipeCard from "../components/RecipeCard";

export default function ChangeMeal() {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("ALL");
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const categoryEndpoint = 'http://localhost:8800/categories'; 
        const categoryResponse = await fetch(categoryEndpoint);
        
        if (!categoryResponse.ok) {
          throw new Error(`HTTP error! Status: ${categoryResponse.status}`);
        }

        const categoryData = await categoryResponse.json();
        setCategories(categoryData);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    const fetchRecipes = async () => {
      try {
        const recipeEndpoint = 'http://localhost:8800/recipes';
        const recipeResponse = await fetch(recipeEndpoint);
        
        if (!recipeResponse.ok) {
          throw new Error(`HTTP error! Status: ${recipeResponse.status}`);
        }

        const allRecipes = await recipeResponse.json();
console.log("parseInt(selectedCategory)", selectedCategory.id,selectedCategory)
        // Filter recipes based on the selected category
        const filteredRecipes = selectedCategory === "ALL"
          ? allRecipes
          : allRecipes.filter(recipe => recipe.categoryId == selectedCategory);

        setRecipes(filteredRecipes);
      } catch (error) {
        console.error("Error fetching recipes:", error);
      }
    };

    fetchCategories();
    fetchRecipes();
  }, [selectedCategory]); 
  return (
    <div className="bg-doodle py-md-5 py-3">
      <div className="container my-md-5 my-3">
        <div className="row">
          <div className="col-12 background-primary rounded rounded-pill py-3 px-5 bg-vegetables">
            <p className="text-white body-text-extra-small mb-0">
              Your Order Detail for
            </p>
            <h1 className="text-white my-2 fs-2">Mon, Dec 04</h1>
            <p className="text-white body-text-extra-small mb-0 d-flex align-items-center">
              3 meals for 4 People (12 Servings)
            </p>
          </div>
        </div>
        <div className="row mt-5">
          <div className="col-12">
            <div className="row mb-3 ">
              <div className="col-md-8 col-12">
                <div className="d-flex align-items-center">
                  <button className="btn btn-primary aj-button body-text-small fw-700 px-3 me-4">
                    <i className="fi fi-rr-box-open-full fs-5 lh-1 align-middle"></i>
                  </button>
                  <div className="d-inline-block">
                    <h1>Add a 4th Meal</h1>
                    <p className="fw-medium my-0">
                      this week for just
                      <span className="text-primary fw-bold">£3.99</span> per
                      person
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-md-4 col-12 text-end my-auto">
                <button className="btn btn-primary aj-button body-text-small fw-700 px-5">
                  Update Order
                </button>
              </div>
            </div>
            <div className="row mb-5 recipe-category-wrapper aj-drop-shadow">
        <div className="col-12">
          <ul className="recipe-categories pt-2">
            <li
              className={selectedCategory === "ALL" ? "selected" : ""}
              onClick={() => setSelectedCategory("ALL")}
            >
              ALL
            </li>
            {categories.map(category => (
              <li
                key={category.id}
                className={selectedCategory === category.id ? "selected" : ""}
                onClick={() => setSelectedCategory(category.id)}
              >
                {category.name}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="row">
        {recipes.map(recipe => (
       <RecipeCard  categoryName={recipe.categoryName} recipeName={recipe.title} />
        ))}
      </div>
          </div>
        </div>
      </div>
    </div>
  );
}
