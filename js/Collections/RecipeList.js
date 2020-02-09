define(
  ['backbone', 'Models/Recipe'],
  function(Backbone, Recipe){
  const RecipeList = Backbone.Collection.extend({
    model: Recipe,
    // localStorage: new Store("backbone-recipes")
  })
  return RecipeList
})