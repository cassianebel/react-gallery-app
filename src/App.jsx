import React, { useState, useEffect } from 'react'
import { Route, Routes, Navigate } from "react-router-dom";
import axios from 'axios';
import apiKey from './config.js'
import Nav from './components/Nav'
import Search from './components/Search'
import PhotoList from './components/PhotoList'

function App() {
  const [photos, setPhotos] = useState([]);
  const [cats, setCats] = useState([]);
  const [dogs, setDogs] = useState([]);
  const [computers, setComputers] = useState([]);
 
  const fetchData = async (query) => {
    try {
      const response = await axios.get(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=${query}&per_page=24&format=json&nojsoncallback=1`);
      setPhotos(response.data.photos.photo);
    } catch (error) {
      console.log('Error fetching and parsing data', error);
    }
  }

  const fetchDefaults = async () => {
    try {
      const responseCats = await axios.get(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=cats&per_page=24&format=json&nojsoncallback=1`);
      setCats(responseCats.data.photos.photo);

      const responseDogs = await axios.get(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=dogs&per_page=24&format=json&nojsoncallback=1`);
      setDogs(responseDogs.data.photos.photo);

      const responseComputers = await axios.get(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=computers&per_page=24&format=json&nojsoncallback=1`);
      setComputers(responseComputers.data.photos.photo);
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
          <Route index element={<Navigate replace to="cats" />} />
        </Route>
        <Route path="cats" element={<PhotoList photos={cats} pageTitle="Cats" />} />
        <Route path="dogs" element={<PhotoList photos={dogs} pageTitle="Dogs" />} />
        <Route path="computers" element={<PhotoList photos={computers} pageTitle="Computers" />} />
        <Route path="search/:query" element={<PhotoList photos={photos} />} />
      </Routes>
      
    </div>
  )
}

export default App
