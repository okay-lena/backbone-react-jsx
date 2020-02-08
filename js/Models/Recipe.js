define(function(){
  const Recipe = Backbone.Model.extend({
    defaults: {
      "id": null,
      "image": "",
      "imageUrls": [
        ""
      ],
      "readyInMinutes": null,
      "servings": null,
      "title": ""
    }
  })
  return Recipe
})