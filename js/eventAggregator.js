define(
  ['underscore', 'backbone'],
  function (_, Backbone) {
  const eventAggregator = _.extend({}, Backbone.Events)
  return eventAggregator
})