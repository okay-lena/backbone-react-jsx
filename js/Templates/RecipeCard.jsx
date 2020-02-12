// to transpile JSX into JS run in CLI
// node_modules\.bin\jsx -x jsx js\Templates js\Templates

define(['react'], function(React) {
  const RecipeCard = props => {
    const { id, title, readyInMinutes, image } = props
    const recipeLink = "#recipe/" + title
    const imgUrl = "https://spoonacular.com/recipeImages/" + image

    return (
      <div className="view">
        <h3 className="recipeTitle" id={id}>
          <a href={recipeLink}>{title}</a>
        </h3>
        <span className="recipeId">{id}</span>
        <span className="cooktime">Ready in {readyInMinutes} minutes</span>
        <span className="imgInListWrapper">
          <img src={imgUrl} alt={title}/>
        </span>
      </div>
    )
  }
  return RecipeCard
})
