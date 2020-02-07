define(function(){
  return Backbone.Model.extend({
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

})