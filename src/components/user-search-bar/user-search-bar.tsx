import React from 'react'
import PropTypes from 'prop-types'

import * as st from './user-search-bar.styled'

interface InputOptions {
  inputValue?: string
}

interface SearchBarProps {
  searchValue: any,
  onInputChange: any,
  onSelectChange: any,
  userItemsCount: any,
  value: any,
  data: any,
  loading: any,
  refetch: any,
  options: any,
}

const SearchBar = (props: SearchBarProps) => {
  const {
    searchValue,
    onInputChange,
    onSelectChange,
    userItemsCount,
    value,
    data,
    loading,
    refetch,
    options
  } = props

  return (
    <st.BarWrapper>
      <st.Select
        isLoading={loading}
        loadOptions={refetch}
        value={value}
        cacheOptions
        isSearchable
        maxMenuHeight={200}
        components={{ Option, SingleValue: Option }}
        isClearable
        onChange={onSelectChange}
        noOptionsMessage={
          ({ inputValue }: InputOptions) => !inputValue && !loading ? 'Type user name e.g. "Dan Abramov"' : null
        }
        placeholder="Search for github user name..."
        options={options}
        onInputChange={onInputChange}
      />
    </st.BarWrapper>
  )
} 


export default SearchBar
