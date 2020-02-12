define(
  [
    'jquery',
    'underscore',
    'backbone',
    'eventAggregator',
    'react',
    'reactDom',
    'Templates/RecipeCard'  // future compiled JS from JSX
  ],
  function (
    $,
    _,
    Backbone,
    eventAggregator,
    React,
    ReactDOM,
    RecipeCard
  ) {
  const RecipeView =  Backbone.View.extend({
    tagName: 'li',
    render: function () {
      ReactDOM.render(
        React.createElement(RecipeCard, this.model.toJSON(), null),
        this.$el.get(0)
      )
      return this // enable chained calls
    },
    events: {
      'click .view': function (e) {
        console.log('clicked', e)
        // console.log('clicked id is ', e.target.children[1].innerHTML)
        eventAggregator.trigger('recipe:selected', this.model)
      }
    },
  })
  return RecipeView
})