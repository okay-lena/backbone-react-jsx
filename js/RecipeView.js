define(['eventAggregator'], function (eventAggregator) {
  const RecipeView =  Backbone.View.extend({
    tagName: 'li',
    id: 'recipe-list',
    template: _.template($('#recipe-template').html()),
    render: function () {
      this.$el.html(this.template(this.model.toJSON()))
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