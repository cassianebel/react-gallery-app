import React, { useState, useEffect } from 'react'
import { Route, Routes, Navigate } from "react-router-dom";
import apiKey from './config.js'
import Nav from './components/Nav'
import Search from './components/Search'
import PhotoList from './components/PhotoList'

function App() {

  
  return (
    <div className="container">
      <Search />
      <Nav />
      <Routes>
        <Route path="/" element={<PhotoList />}>
          <Route index element={<Navigate replace to="cats" />} />
        </Route>
        <Route path="cats" element={<PhotoList />} />
        <Route path="dogs" element={<PhotoList />} />
        <Route path="computers" element={<PhotoList />} />
        <Route path="search/:query" element={<PhotoList />} />
      </Routes>
      
    </div>
  )
}

export default App
