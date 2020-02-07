
requirejs([
    'Recipe',
    'RecipeDetails',
    'RecipeList',
    'RecipeView',
    'eventAggregator',
    'RecipeDetailsView',
  ],
 function (
   Recipe,
   RecipeDetails,
   RecipeList,
   RecipeView,
   eventAggregator,
   RecipeDetailsView,
 ) {
// models

// instance of the Collection
  const recipeList = new RecipeList()

// event aggregator

// views

// renders the full list of recipes calling RecipeView for each one
  const AppView = Backbone.View.extend({
    el: '#app',

    initialize: function (i) {
      console.log('App View initialize', i)
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
      //console.log('router.params title = ' + title)
      // getting list of model instances from collection
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

  eventAggregator.on('recipe:selected', function (recipe) {
    const urlPath = 'recipe/' + recipe.get('title')
    router.navigate(urlPath, { trigger: true })
  })

// initialize router
  const router = new Router()
  Backbone.history.start()
  router.navigate('search', { trigger: true })

// initialize app view
  const appView = new AppView()

})