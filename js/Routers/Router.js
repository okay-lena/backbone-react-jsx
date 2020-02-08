define(
  [
    'Views/AppView',
    'Models/RecipeDetails',
    'Views/RecipeDetailsView'
  ],
  function (
    {AppView, recipeList},
    RecipeDetails,
    RecipeDetailsView
  ) {
// Routes
  const Router = Backbone.Router.extend({
    routes: {
      'search': 'showSearchForm',
      'recipe/:title': 'showRecipe'
    },

    showSearchForm: function () {
      $("#app").show()
      console.log('Show search form worked')
    },

    showRecipe: function (title) {
      console.log('router.params title = ' + title)
      // getting list of model instances from collection
      console.log('list of recipes from showRecipes \n', recipeList)
      const listOfRecipes = recipeList.models
      const selectedRecipe = _.find(listOfRecipes, function (recipe) {
        //console.log('recipe in find', recipe)
        //console.log('recipe list in find ', recipeList)
        return recipe.get('title') === title
      })
      //console.log('selected recipe', selectedRecipe)
      console.log('selected recipe ID ', selectedRecipe.id)

      // fetch from API recipe detailed information to display it on recipe details page
      const getRecipeInfo = (function () {
        const id = selectedRecipe.id
        $.ajax({
          url: `https://api.spoonacular.com/recipes/${id}/information?apiKey=82de3f92015a4978a427335171c863a4`,
          success: function (response) {
            console.log('recipe info fetch response - \n', response)
            const selectedRecipeInfo = new RecipeDetails(response)
            console.log('recipe info', selectedRecipeInfo)

            // hide recipes collection
            $("#recipe-list").hide()

            // remove recipe details if any
            $('#recipeDetails').remove()

            // show recipe details template
            $('#main').append(new RecipeDetailsView({ model: selectedRecipeInfo }).render().el)
            //return response
          },
          error: function (xhr) {
            alert("An error occurred: " + xhr.status + " " + xhr.statusText)
          }
        })
      })()

    }
  })
  return Router
})