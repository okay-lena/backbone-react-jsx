// renders individual recipe item (li)
define(
  [
    'jquery',
    'underscore',
    'backbone',
    'Models/RecipeDetails',
    'text!Templates/recipeDetailsTemplate.html'
  ],
  function(
    $,
    _,
    Backbone,
    RecipeDetails,
    recipeDetailsTemplate
  ) {
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