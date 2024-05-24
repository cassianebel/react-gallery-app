import React, { useState, useEffect } from 'react'
import { Route, Routes, Navigate } from "react-router-dom";
import axios from 'axios';
import apiKey from './config.js'
import Nav from './components/Nav'
import Search from './components/Search'
import PhotoList from './components/PhotoList'

function App() {
  const [photos, setPhotos] = useState([]);
 
  const fetchData = async (query) => {
    try {
      const response = await axios.get(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=${query}&per_page=24&format=json&nojsoncallback=1`);
      setPhotos(response.data.photos.photo);
    } catch (error) {
      console.log('Error fetching and parsing data', error);
    }
  }
  
  return (
    <div className="container">
      <Search />
      <Nav />
      <Routes>
        <Route path="/" element={<PhotoList photos={photos} fetchData={fetchData} />}>
          <Route index element={<Navigate replace to="cats" />} />
        </Route>
        <Route path="cats" element={<PhotoList photos={photos} query="cats" fetchData={fetchData} />} />
        <Route path="dogs" element={<PhotoList photos={photos} query="dogs" fetchData={fetchData} />} />
        <Route path="computers" element={<PhotoList photos={photos} query="computers" fetchData={fetchData} />} />
        <Route path="search/:query" element={<PhotoList photos={photos} fetchData={fetchData} />} />
      </Routes>
      
    </div>
  )
}

export default App
