import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./App/store";
import VideoItem from "./Pages/VideoItem";
import Header from "./Pages/Header";
import Home from "./Components/Home";
import ScrollToTop from "./Pages/ScrollToTop";

function App() {
  return (
    <>
    <Provider store={store}>
      <BrowserRouter>
      <div >
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <ScrollToTop />
                  <Home />
                </>
              }
            />
            <Route  path="/Home" element={<Home />} />
            <Route path="/video/:id" element={<VideoItem />} />
            <Route path="/Header" element={<Header />} />
          </Routes>
      
          </div>
      </BrowserRouter>
    </Provider>
  
 
    </>
  );
}

export default App;
