import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import {
  setCategories,
  setSelectedCategory,
  setVideos,
} from "../slices/categorySlice";
import Navbar from "../Pages/Navbar";
import VideoCards from "../Pages/VideoCards";
import Footer from "../Pages/Footer";
import Header from "../Pages/Header";
import ContinueWatching from "../Pages/ContinueWatching";
import Cookies from "js-cookie";
import LoadingOverlay from './LoadingOverlay'; 
import {VideoApiGet} from '../API/data'
const Home = () => {
  const dispatch = useDispatch();
  const storeCategory = useSelector((state) => state.category);

  useEffect(() => {
    const exist = Cookies.get("number");
    if (exist === undefined || exist === null || exist === "null") {
      const uniqueid = generateUniqueUserId();
      Cookies.set("number", uniqueid, { expires: 2 });
    }
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${VideoApiGet}`);
        const { categories, videos } = response.data;
        dispatch(setCategories(categories));
        dispatch(setVideos(videos));
        dispatch(setSelectedCategory("All"));
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [dispatch]);

  return (
    <>
      <div className="bg-[#5B5B5B] min-h-screen">
        <Navbar />
        <div className="container mx-auto max-w-full px-4">
          <Header categories={storeCategory} />
          <ContinueWatching />
          <VideoCards categories={storeCategory} />
        </div>
 
      </div>
      <div class="w-full bottom-0 bg-[#5B5B5B] ">
    <svg viewBox="0 0 1440 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
            d="M0 43.9999C106.667 43.9999 213.333 7.99994 320 7.99994C426.667 7.99994 533.333 43.9999 640 43.9999C746.667 43.9999 853.333 7.99994 960 7.99994C1066.67 7.99994 1173.33 43.9999 1280 43.9999C1386.67 43.9999 1440 19.0266 1440 9.01329V100H0V43.9999Z"
            class="fill-current text-gray-400"></path>
    </svg>
</div>
      <Footer />
    </>
  );
};

export default Home;

function generateUniqueUserId() {
  let str = "qwertyuiopasdfghjklzxcvbnm1234567890";
  let uuid = "OM_";
  for (let i = 0; i < 16; i++) {
    uuid += str.charAt(Math.floor(Math.random() * str.length));
  }
  return uuid;
}
