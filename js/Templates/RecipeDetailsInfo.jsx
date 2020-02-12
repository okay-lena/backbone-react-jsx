// to transpile JSX into JS run in CLI
// node_modules\.bin\jsx -x jsx js\Templates js\Templates

define(['react'], function(React) {
  const RecipeDetailsInfo = props => {
    const { title, servings, sourceUrl, preparationMinutes, cookingMinutes, image, instructions} = props

    return (
      <div className="recipeDetails">
        <h1 className="recipeTitle">{title}</h1>
        <span className="servings">Servings: {servings}</span>
        <span className="creditSource">
          Credit:&nbsp;<a href={sourceUrl}>{sourceUrl}</a>
        </span>
        <span className="preparationTime">Preparation time: {preparationMinutes} min.</span>
        <span className="cookingTime">Cooking time: {cookingMinutes} min.</span>
        <span className="imgDetailsWrapper">
          <img className="imgDetails" src={image} alt={title} />
        </span>
        <span className="instructions">{instructions}</span>
      </div>
    )
  }
  return RecipeDetailsInfo
})