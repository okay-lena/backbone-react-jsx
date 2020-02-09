require.config({
  paths: {
    jquery: 'libs/jquery-3.4.1.min',
    underscore: 'libs/underscore-min',
    backbone: 'libs/backbone-min',
    text: 'libs/text'
  }
});

requirejs([
  'backbone',
  'eventAggregator',
  'Views/AppView',
  'Routers/Router',
  ],
  function (
    Backbone,
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