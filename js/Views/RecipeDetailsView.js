// renders individual recipe item (li)
define(
  ['RecipeDetails', 'text!recipeDetailsTemplate.html'],
  function(RecipeDetails, recipeDetailsTemplate) {
  const RecipeDetailsView = Backbone.View.extend({
    id: 'recipeDetails',
    model: RecipeDetails,
    template: _.template(recipeDetailsTemplate),
    render: function () {
      this.$el.html(this.template(this.model.toJSON()))
      return this // enable chained calls
    },
  })
  return RecipeDetailsView
})