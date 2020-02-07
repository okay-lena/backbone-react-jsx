define(['Recipe'], function(Recipe){
  return Backbone.Collection.extend({
    model: Recipe,
    localStorage: new Store("backbone-recipes")
  })
})