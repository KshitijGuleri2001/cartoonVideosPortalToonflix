import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import {VideoApiGet,PostSimilarvideoApi} from "../API/data"
const translatedSimilarVideos = {
  // ... your translations here
};

const VideoCards = () => {
  const [storeFilteredVideos, setStoreFilteredVideos] = useState([]);
  console.log("==",storeFilteredVideos)
  const navigate = useNavigate();
  const [loadingVideoId, setLoadingVideoId] = useState(null); // Add state for loading video
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${VideoApiGet}`);
        await new Promise((resolve) => setTimeout(resolve, 1000));
        setStoreFilteredVideos(response.data.videos);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const fetchContinueVideos = async (videoId, name, image, vurl) => {
    const ani = Cookies.get("number");
    try {
      const data = {
        ani: ani,
        videoid: videoId,
        imageurl: image,
        title: name,
        vurl: vurl,
      };
      const res = await axios.post(`${PostSimilarvideoApi}`, data);
      navigate(`/video/${videoId}`);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // Function to shuffle an array
  const shuffleArray = (array) => {
    let shuffledArray = array.slice();
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
    }
    return shuffledArray;
  };

  // Get a random subset of 12 videos
  const getRandomVideos = () => {
    const shuffledVideos = shuffleArray(storeFilteredVideos);
    return shuffledVideos.slice(0, 12);
  };

  return (
    <>
      <div className="container mx-auto max-w-full bg-[#5B5B5B] px-4 py-1">
        <div className="flex items-center px-2 py-6">
          <div className="border-t border-4 border-gray-400 flex-grow"></div>
          <div className="px-3 text-orange-500 font-bold text-2xl">
            Vidéos <span className="text-white">similaires</span>
          </div>
          <div className="border-t border-4 border-gray-400 flex-grow"></div>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-0 mb-2">
          {getRandomVideos().map((video) => (
            <div
              key={video.id}
             className={`text-white cursor-pointer rounded-xl shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-2xl overflow-hidden ${loadingVideoId === video.id ? 'opacity-50' : ''}`}
              onClick={() => !loadingVideoId && fetchContinueVideos(video.id, video.name, video.imgurl, video.vurl)}
            >
              <div
                className="relative w-full overflow-hidden rounded-xl border-2 border-gray/40"
                onClick={() =>
                  fetchContinueVideos(
                    video.id,
                    video.name,
                    video.imgurl,
                    video.vurl
                  )
                }
              >
                <img
                  src={video.imgurl}
                  alt={video.name}
                  width={500}
                  height={300}
                  className="w-full h-[200px] object-cover rounded-xl"
                />
                <div className="absolute bottom-0 left-0 w-full text-center bg-black bg-opacity-60 p-6 transition-all duration-300 opacity-0 hover:opacity-100">
                  <p className="text-white">
                    {translatedSimilarVideos[video.name] || video.name}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default VideoCards;
