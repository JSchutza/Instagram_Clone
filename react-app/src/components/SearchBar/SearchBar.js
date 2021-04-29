import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'


function SearchBar() {
    const [query, setQuery] = useState('')
    history = useHistory()

    async function search() {
        const response = await fetch(`/api/search?q=${query}`)
        const result = await response.json();
        
    }
    

    return (
        <>
            <input onChange={(e) => setQuery(e.target.value)} value={query} placeholder="Search for users"></input>
            <button onClick={search}>search</button>
        </>
    )
}