define(['Models/Recipe'], function(Recipe){
  const RecipeList = Backbone.Collection.extend({
    model: Recipe,
    localStorage: new Store("backbone-recipes")
  })
  return RecipeList
})