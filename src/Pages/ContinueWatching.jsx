import axios from 'axios';
import Cookies from 'js-cookie';
import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import SyncLoader from "react-spinners/SyncLoader";
import { GetContinueApi } from '../API/data';

const translatedContinue = {
  // Your translated titles here...
};

const ContinueWatching = () => {
  const [loading, setLoading] = useState(true);
  const [continueVideos, setContinueVideos] = useState([]);

  useEffect(() => {
    const reloaded = localStorage.getItem("need-reloaded2");
    if (!reloaded) {
      localStorage.setItem('need-reloaded2', true);
      window.location.reload();
    }
  }, []);

  const fetchData = async () => {
    try {
      const ani = Cookies.get('number');
      const response = await axios.get(`${GetContinueApi}/?ani=${ani}`);
      console.log("=========",response.data)
      const videos = response.data.videos || [];
      
      // Use a Map to filter out duplicate video IDs
      const uniqueVideosMap = new Map();
      videos.forEach(video => {
        if (!uniqueVideosMap.has(video.id)) {
          uniqueVideosMap.set(video.id, video);
        }
      });

      // Convert the Map back to an array
      const uniqueVideos = Array.from(uniqueVideosMap.values());

      setContinueVideos(uniqueVideos);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="container mx-auto max-w-full px-4 py-2">
      <div className='p-2 text-lg text-orange-500 font-semibold'>
        <p>Continuer à <span className='text-white'>regarder </span> <span className='text-black'>.....</span></p>
      </div>
      {loading ? (
        <div className="flex justify-center items-center h-32">
          <SyncLoader color="#FFA500" loading={loading} size={12} />
        </div>
      ) : continueVideos.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mt-2">
          {continueVideos.map((data) => (
            <div
              key={data.id}
              className="bg-gray-800 rounded-lg shadow-md transform transition-all duration-200 hover:scale-105 hover:shadow-lg overflow-hidden"
            >
              <Link to={`/video/${data.videoid}`}>
                <div className="relative w-full overflow-hidden rounded-lg border-b border-solid border-red-600">
                  <img
                    src={data.imageurl}
                    alt={data.vurl}
                    className="w-full h-32 object-cover rounded-lg"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-80"></div>
                  <div className="absolute bottom-0 left-0 w-full p-2">
                    <p className="text-white text-xs font-medium">{translatedContinue[data.title] || data.title}</p>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex justify-center items-center h-10">
          <p className="text-gray-500">No video available</p>
        </div>
      )}
      <div className='py-2'></div>
    </div>
  );
};

export default ContinueWatching;
