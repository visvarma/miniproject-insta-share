import React from 'react'

const SearchContext = React.createContext({
  searchInput: '',
  changeSearchInput: () => {},
})

export default SearchContext
