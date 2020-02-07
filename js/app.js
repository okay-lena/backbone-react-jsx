requirejs([
    'Recipe',
    'RecipeDetails',
    'RecipeList',
    'RecipeView',
    'eventAggregator',
    'RecipeDetailsView',
    'AppView',
  ],
  function (
    Recipe,
    RecipeDetails,
    RecipeList,
    RecipeView,
    eventAggregator,
    RecipeDetailsView,
    {AppView, recipeList},    // import destructed values
  ) {
// models

// event aggregator

// views


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