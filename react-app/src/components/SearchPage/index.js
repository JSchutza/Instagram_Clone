import React from 'react'
import {useSelector} from 'react-redux'
import {NavLink} from 'react-router-dom'

function SearchPage (){
  const results = useSelector((store) => store.searchReducer)

  const newRes = Object.values(results)
  console.log('************ NEW RES ******************', newRes)
  console.log('************ results ******************', results)
  if (!newRes){
    return (
      <h1> No Results Found </h1>
    )
  }
  return (
  <div>
  {newRes && newRes.map(result => (
    <div key={result.id}>
      <NavLink to={`/profile/${result.id}`} >{result.username}</NavLink>
    </div>
  ))}
  </div>
  )
}


export default SearchPage;
