// renders individual recipe item (li)
define(['RecipeDetails'], function(RecipeDetails) {
  return Backbone.View.extend({
    id: 'recipeDetails',
    model: RecipeDetails,
    template: _.template($('#recipe-details').html()),
    render: function () {
      this.$el.html(this.template(this.model.toJSON()))
      return this // enable chained calls
    },
  })
})