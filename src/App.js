import './App.css';
import { useState, Suspense, useRef } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import ArtistView from './components/ArtistView'
import AlbumView from './components/AlbumView'
import Gallery from './components/Gallery'
import SearchBar from './components/SearchBar'
import Spinner from './components/Spinner'
import { DataContext } from './context/DataContext'
import { SearchContext } from './context/SearchContext'
import { createResource as fetchData } from './helper'

function App() {
  let searchInput = useRef('')
  let [message, setMessage] = useState('Search for Music!')
  let [data, setData] = useState(null)

  const handleSearch = (e, term) => {
    e.preventDefault()
    setData(fetchData(term, 'main'))
  }

  const renderGallery = () => {
    if(data) {
      return (
        <Suspense fallback={ <Spinner /> }>
          <Gallery />
        </Suspense>
      )
    }
  }

  return (
    <div className="App">
      { message }
      <Router>
        <Route exact path={ '/' }>
          <SearchContext.Provider value={ { term: searchInput, handleSearch: handleSearch } }>
            <SearchBar />
          </SearchContext.Provider>
            <DataContext.Provider value={ data }>
              { renderGallery() }
            </DataContext.Provider>
        </Route>
        <Route path="/album/:id">
          <AlbumView />
        </Route>
        <Route path="/artist/:id">
          <ArtistView />
        </Route>
      </Router>
    </div>
  );
}

export default App;