define(function(){
  const RecipeDetails = Backbone.Model.extend({
    defaults: {
      "id": null,
      "title": "",
      "sourceUrl": "",
      "servings": null,
      "preparationMinutes": null,
      "cookingMinutes": null,
      "readyInMinutes": null,
      "image": "",
      "instructions": "",
    }
  })
  return RecipeDetails
})