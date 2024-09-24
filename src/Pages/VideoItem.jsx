import React, { useEffect, useState } from "react";
import ReactPlayer from "react-player/lazy";
import Navbar from "../Pages/Navbar";
import SubHeader from "./SubHeader";
import Footer from "./Footer";
import SimilarVideos from "./SimilarVideos";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { FaHome } from "react-icons/fa";
import Comments from "./Comments";
import LoadingOverlay from '../Components/LoadingOverlay'; // Ensure this is correctly imported
import {Getbyid} from "../API/data"
const VideoItem = () => {
  const translatedNames = {
    // ... (your translatedNames object)
  };

  const [videoData, setVideoData] = useState(null);
  const [loading, setLoading] = useState(true); // Loading state
  const params = useParams();

  useEffect(() => {
    window.scroll({
      top: 0,
      behavior: "instant"
    });
  }, [params.id]);

  const fetchDataFromBackend = async () => {
    try {
      const res = await axios.get(`${Getbyid}?id=${params.id}`);
      const videoDetails = res.data.videos;
      setVideoData(videoDetails);
      setLoading(false); // Set loading to false once data is fetched
    } catch (error) {
      console.error("Error fetching data:", error);
      alert("Internal server error");
      setLoading(false); // Set loading to false in case of error
    }
  };

  useEffect(() => {
    fetchDataFromBackend();
  }, [params.id]);

  return (
    <>
      <Navbar />
      
      {loading && <LoadingOverlay />} {/* Display the loading overlay */}

      <div className="container mx-auto max-w-full bg-[#5B5B5B] px-4 py-6 flex gap-4">
        <Link to="/Home">
          <div className="px-4 mt-3 bg-black/20 border-2 border-black active md:active lg:active hover:bg-orange-600 rounded-xl font-bold shadow-lg shadow-zinc-700 hover:text-white active:bg-bg-black p-2">
            <FaHome size={20} />
          </div>
        </Link>
        <div className="flex items-center px-2 py-4">
          <div className="border-t border-4 border-gray-400 flex-grow"></div>
          <div className="px-3 text-orange-500 font-bold text-2xl">
            <span className="text-white">
              {translatedNames[videoData?.name] || videoData?.name}
            </span>
          </div>
          <div className="border-t border-4 border-gray-400 flex-grow"></div>
        </div>
      </div>

      <div className="max-w-full bg-black">
        <div className="w-full">
          <div
            onClick={() => {
              window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
            }}
            className="h-[550px]"
          >
            {videoData && (
              <ReactPlayer
                url={videoData.vurl}
                controls={true}
                width="100%"
                height="100%"
                loop={true}
                playing={true} 
                playsinline={true}
                className=""
              />
            )}
          </div>
        </div>
      </div>

      <div>
        <Comments videoId={params.id} />
      </div>

      <SimilarVideos videos={videoData?.videos} />

      <div className="w-full bottom-0 bg-[#5B5B5B]">
        <svg viewBox="0 0 1440 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M0 43.9999C106.667 43.9999 213.333 7.99994 320 7.99994C426.667 7.99994 533.333 43.9999 640 43.9999C746.667 43.9999 853.333 7.99994 960 7.99994C1066.67 7.99994 1173.33 43.9999 1280 43.9999C1386.67 43.9999 1440 19.0266 1440 9.01329V100H0V43.9999Z"
            className="fill-current text-gray-400"
          ></path>
        </svg>
      </div>

      <Footer />
    </>
  );
};

export default VideoItem;
