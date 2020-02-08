require.config({
  paths: {
    text: 'libs/text'
  }

});

requirejs([
    'eventAggregator',
    'Views/AppView',
    'Routers/Router',
  ],
  function (
    eventAggregator,
    {AppView, recipeList},    // import destructed values
    Router,
  ) {

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