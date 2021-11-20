import cocktailInitial from "../types/cocktail/initial";  
import cocktailReformat from "../types/cocktail/reformat";

function formatCocktails (cocktails: cocktailInitial[]): cocktailReformat[] {
  return cocktails.map(cocktail => {
    return {
      id: cocktail.idDrink || "",
      title: cocktail.strDrink || "",
      thumbnail: cocktail.strDrinkThumb || ""
    }
  })
}

export default formatCocktails;