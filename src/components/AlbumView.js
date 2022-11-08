// These components will be making separate API calls from the app
// AlbumView component to serve specific data about a given album
import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import Spinner from './Spinner'

function AlbumView() {
    const navigate = useNavigate()
    const { id } = useParams()
    const [albumData, setAlbumData] = useState([])


    useEffect(() => {
        const API_URL = `http://localhost:4000/song/${id}`
        const fetchData = async () => {
            const response = await fetch(API_URL)
            const resData = await response.json()
            setAlbumData(resData.results)
        }
        fetchData()
    }, [id])


    const navButtons = () => {
        return (
            <div>
                <button onClick={ () => navigate('/') }>Home</button> | <button onClick={ () => navigate(-1) }>Back</button>
            </div>
        )
    }


    const justSongs = albumData.filter(entry => entry.wrapperType === 'track')

    const renderSongs = justSongs.map((song, i) => {
        return (
            <div key={ i }>
                <p>{ song.trackName }</p>
            </div>
        )
    })

    
    return (
        <div>
            { albumData.length > 0 ? <h2>{ albumData[0].collectionName }</h2> : <Spinner /> }
            { navButtons() }
            { renderSongs }
        </div>
    )
}

export default AlbumView