import './index.css'

const CategoryItem = props => {
  const {details, isActive, changeCategory} = props
  const {id, label} = details

  const onClickCategory = () => {
    changeCategory(id)
  }

  const className = isActive ? 'active-category-text' : 'category-text'

  return (
    <p className={className} onClick={onClickCategory}>
      {label}
    </p>
  )
}

export default CategoryItem
