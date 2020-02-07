requirejs([
    'Recipe',
    'RecipeDetails',
    'RecipeList',
    'RecipeView',
    'eventAggregator',
    'RecipeDetailsView',
    'AppView',
    'Router',
  ],
  function (
    Recipe,
    RecipeDetails,
    RecipeList,
    RecipeView,
    eventAggregator,
    RecipeDetailsView,
    {AppView, recipeList},    // import destructed values
    Router,
  ) {

    eventAggregator.on('recipe:selected', function (recipe) {
      const urlPath = 'recipe/' + recipe.get('title')
      router.navigate(urlPath)
    })

// initialize router
    const router = new Router()
    Backbone.history.start()
    router.navigate('search')

// initialize app view
    const appView = new AppView()
  })