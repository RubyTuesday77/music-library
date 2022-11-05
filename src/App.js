import './App.css'
import { useRef, Suspense, useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Gallery from './components/Gallery'
import SearchBar from './components/SearchBar'
import ArtistView from './components/ArtistView'
import AlbumView from './components/AlbumView'
import { DataContext } from './context/DataContext'
import { SearchContext } from './context/SearchContext'
import Spinner from './components/Spinner'
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
          <Gallery data={ data } />
        </Suspense>
      )
    }
  }

  return (
    <div className="App">
      {message}
        <Router>
          <Routes>
            <Route path="/" element={
              <>
                <SearchContext.Provider value={ { term: searchInput, handleSearch: handleSearch} }>
                  <SearchBar />
                </SearchContext.Provider>
                <DataContext.Provider value={ data }>
                  { renderGallery() }
                </DataContext.Provider>
              </>
            } />
            <Route path="/album/:id" element={ <AlbumView /> } />
            <Route path="/artist/:id" element={ <ArtistView /> } />
        </Routes>
      </Router>
    </div>
  )
}

export default App;