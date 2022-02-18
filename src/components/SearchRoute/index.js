import {useState, useContext} from 'react'
import {Link} from 'react-router-dom'
import {FaSearch} from 'react-icons/fa'
import Header from '../Header'
import SearchPosts from '../SearchPosts'
import SearchContext from '../../Context'
import './index.css'

const SearchRoute = () => {
  const [search, setSearch] = useState('')
  const value = useContext(SearchContext)

  const {searchInput, changeSearchInput} = value

  const onChangeSearchInput = e => {
    setSearch(e.target.value)
  }

  const onClickSearchInput = () => {
    changeSearchInput(search)
  }

  return (
    <>
      <Header />
      <div className="search-results-search-bar">
        <input
          value={search}
          type="search"
          className="search-results-input"
          placeholder="Search Caption"
          onChange={onChangeSearchInput}
        />
        <Link to="/search">
          <button
            type="button"
            className="search-results-icon-button"
            onClick={onClickSearchInput}
            testid="searchIcon"
          >
            <FaSearch className="search-results-icon" />
          </button>
        </Link>
      </div>
      <SearchPosts search={searchInput} key={searchInput} />
    </>
  )
}

export default SearchRoute
