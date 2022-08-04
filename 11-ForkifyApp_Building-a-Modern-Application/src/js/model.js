// Model and Service Layer

import { async } from "regenerator-runtime"
import { APP_URL } from "./config";
import { getJSON } from "./helper";

export const state = {
    recipe: {}
}

export const loadRecipe = async function(id) {
    try {
        const data = await getJSON(`${APP_URL}/${id}`);

        let { recipe } = data.data;
        state.recipe = {
          id: recipe.id,
          title: recipe.title,
          publisher: recipe.publisher,
          sourceUrl: recipe.source_url,
          image: recipe.image_url,
          servings: recipe.servings,
          cookingTime: recipe.cooking_time,
          ingredients: recipe.ingredients
        }
    
        console.log("recipes", state.recipe);
    } catch (error) {
        console.error(`${error} (something went wrong)`)
    }

}