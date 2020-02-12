// renders individual recipe item (li)
define(
  [
    'jquery',
    'underscore',
    'backbone',
    'Models/RecipeDetails',
    'react',
    'reactDom',
    'Templates/RecipeDetailsInfo'   // must be compiled from JSX to JS first to see in browser!
  ],
  function(
    $,
    _,
    Backbone,
    RecipeDetails,
    React,
    ReactDOM,
    RecipeDetailsInfo
  ) {
  const RecipeDetailsView = Backbone.View.extend({
    id: 'recipeDetails',
    model: RecipeDetails,
    render: function () {
      ReactDOM.render(
        React.createElement(RecipeDetailsInfo, this.model.toJSON(), null),
        this.$el.get(0)
      )
      return this // enable chained calls
    },
  })
  return RecipeDetailsView
})