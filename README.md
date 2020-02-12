## Purpose
Get familiar with Backbone and requireJS.<br />
Incorporate React JSX components into existing Backbone app, and use `ReactDOM.render()` in place of `Backbone.View.render()`, so we can use React components instead of Backbone templates.

## Challenge
Browsers do not understand JSX.<br />
Although React can do it, Backbone does not transpile JSX to JS automatically. To do this, we need to use [react-tools](https://www.npmjs.com/package/react-tools) and [jsx.js](js/libs/jsx.js)

## Steps
1. Install all dependencies from package.json running `npm install`.
1. Download all libraries from [js/libs](js/libs).
1. Verify that require.config is configured properly for libraries - see [js/app.js](js/app.js)
1. Create React components in .jsx files, wrap them in requireJS define() and return - see [js/Templates/RecipeCard.jsx](js/Templates/RecipeCard.jsx)
1. Transpile .jsx files into .js files (see below)
1. Use transpiled .js files in your Backbone.View files (see below and in [js/Views/RecipeView.js](js/Views/RecipeView.js))


## How to transpile JSX into JS
Run in CLI:
```javascript
node_modules\.bin\jsx -x jsx js\Templates js\Templates
```
Here you tell react-tools and jsx to transpile all .jsx files from ./js/Templates folder and put all resulting .js files to the same location.


## How to use compiled React component in Backbone.View
Import it using requireJS:
```javascript
define(
  ['Templates/RecipeCard', 'react', 'reactDom', ...otherModules], 
  function(RecipeCard, React, ReactDOM, ...otherDependencies) {
    const RecipeView =  Backbone.View.extend({
    ...
    render: function () {
        ReactDOM.render(
          React.createElement(RecipeCard, this.model.toJSON(), null), 
          this.$el.get(0)
        )
        return this // enable chained calls
      },
    ...
    })
   return RecipeView
})
```
