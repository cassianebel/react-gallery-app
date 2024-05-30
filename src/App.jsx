import React, { useState, useEffect } from 'react'
import { Route, Routes, Navigate } from "react-router-dom";
import axios from 'axios';
import apiKey from './config.js'
import Nav from './components/Nav'
import Search from './components/Search'
import PhotoList from './components/PhotoList'
import NotFound from './components/NotFound'

function App() {
  const [photos, setPhotos] = useState([]);
  const [butterflies, setButterflies] = useState([]);
  const [flowers, setFlowers] = useState([]);
  const [frogs, setFrogs] = useState([]);
  const [loading, setLoading] = useState(true);

  /**
   * Fetch the photos for a search query
   * @param {string} query 
   */
  const fetchData = async (query) => {
    setLoading(true);
    try {
      const response = await axios.get(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=${query}&per_page=24&format=json&nojsoncallback=1`);
      setPhotos(response.data.photos.photo);
      setLoading(false);
    } catch (error) {
      console.log('Error fetching and parsing data', error);
    }
  }

  /**
   * Fetch the default photos for Butterflies, Flowers, and Frogs
   */
  const fetchDefaults = async () => {
    try {
      const responseButterflies = await axios.get(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=Butterflies&per_page=24&format=json&nojsoncallback=1`);
      setButterflies(responseButterflies.data.photos.photo);

      const responseFlowers = await axios.get(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=Flowers&per_page=24&format=json&nojsoncallback=1`);
      setFlowers(responseFlowers.data.photos.photo);

      const responseFrogs = await axios.get(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=Frogs&per_page=24&format=json&nojsoncallback=1`);
      setFrogs(responseFrogs.data.photos.photo);
    } catch (error) {
      console.log('Error fetching and parsing data', error);
    }
  }

  useEffect(() => {
    fetchDefaults();
  }, []);

  
  return (
    <div className="container">
      <Search />
      <Nav />
      <Routes>
        <Route path="/" >
          <Route index element={<Navigate replace to="butterflies" />} />
        </Route>
        <Route path="butterflies" element={<PhotoList photos={butterflies} pageTitle="Butterflies" />} />
        <Route path="flowers" element={<PhotoList photos={flowers} pageTitle="Flowers" />} />
        <Route path="frogs" element={<PhotoList photos={frogs} pageTitle="Frogs" />} />
        <Route path="search/:query" element={<PhotoList photos={photos} pageTitle="Search Results" fetchData={fetchData} loading={loading} />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      
    </div>
  )
}

export default App
