import './index.css'

const CategoryItemSmall = props => {
  const {details, isActive, changeCategory} = props
  const {id, label} = details

  const onClickCategory = () => {
    changeCategory(id)
  }

  const className = isActive ? 'active-search-button' : 'search-button'

  return (
    <button type="button" className={className} onClick={onClickCategory}>
      {label}
    </button>
  )
}

export default CategoryItemSmall
