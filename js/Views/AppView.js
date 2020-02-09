// renders the full list of recipes calling RecipeView for each one
define(
  ['jquery', 'Collections/RecipeList', 'Views/RecipeView', 'Models/Recipe'],
  function($, RecipeList, RecipeView, Recipe)  {
    // instance of the Collection
    const recipeList = new RecipeList()

    const AppView = Backbone.View.extend({
      el: '#app',

      initialize: function (params) {
        console.log('App View initialize, params', params)
        this.input = this.$('#search-recipe')
        recipeList.on('reset', this.cleanupCollection, this)
        recipeList.on('add', this.addAllRecipesToCollection, this)
        this.render()
      },

      cleanupCollection: function (collection) {
        console.log(`Inside cleanupCollection, got `, collection)
        // clean the recipe list
        this.$('#recipe-list').html('')
      },

      addAllRecipesToCollection: function (recipe) {
        console.log("Got model inside addAllRecipesToCollection", recipe)
        const view = new RecipeView({ model: recipe })
        $('#recipe-list').append(view.render().el)
      },

      events: {
        'keypress #search-recipe': 'searchRecipesOnEnter'
      },

      searchRecipesOnEnter: function (event) {
        const query = event.target.value.trim()
        if (event.keyCode === 13 && query) {
          // should search recipes using API
          $.ajax({
            url: `https://api.spoonacular.com/recipes/search?apiKey=82de3f92015a4978a427335171c863a4&number=3&query=${query}`,
            success: function (response) {
              // remove recipe details is any
              $('#recipeDetails').remove()
              // clear input
              $("#search-recipe").val("");


              console.log('recipes fetch result: \n', response.results)
              // reset recipes in collection if any
              recipeList.reset(Recipe, null)

              // display recipes results in #recipe-list
              const recipesFetched = _.map(response.results, function (recipe) {
                const recipeItem = new Recipe(recipe)
                console.log('recipe item: ', recipeItem)
                return recipeItem
              })
              console.log('recipes', recipesFetched)
              // trigger 'add' event in AppView
              recipeList.add(recipesFetched)
              console.log('All new models have been added to the collection')
              recipeList.trigger('update')
              // hide recipes collection
              $("#recipe-list").show()
            },
            error: function (xhr) {
              alert("An error occurred: " + xhr.status + " " + xhr.statusText)
            }
          })
        }
      },
    })

    // export multiple values
    return {AppView, recipeList}
  })
