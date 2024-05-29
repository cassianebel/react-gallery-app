import React, { useState, useEffect } from 'react'
import { Route, Routes, Navigate } from "react-router-dom";
import axios from 'axios';
import apiKey from './config.js'
import Nav from './components/Nav'
import Search from './components/Search'
import PhotoList from './components/PhotoList'

function App() {
  const [photos, setPhotos] = useState([]);
  const [butterflies, setButterflies] = useState([]);
  const [flowers, setFlowers] = useState([]);
  const [frogs, setFrogs] = useState([]);
 
  const fetchData = async (query) => {
    console.log(query);
    try {
      const response = await axios.get(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=${query}&per_page=24&format=json&nojsoncallback=1`);
      console.log(response.data); // Log the response data
      setPhotos(response.data.photos.photo);
    } catch (error) {
      console.log('Error fetching and parsing data', error);
    }
}

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
      <Search fetchData={fetchData} />
      <Nav />
      <Routes>
        <Route path="/" >
          <Route index element={<Navigate replace to="butterflies" />} />
        </Route>
        <Route path="butterflies" element={<PhotoList photos={butterflies} pageTitle="Butterflies" />} />
        <Route path="flowers" element={<PhotoList photos={flowers} pageTitle="Flowers" />} />
        <Route path="frogs" element={<PhotoList photos={frogs} pageTitle="Frogs" />} />
        <Route path="search/:query" element={<PhotoList photos={photos} pageTitle="Search Results" />} />
      </Routes>
      
    </div>
  )
}

export default App
