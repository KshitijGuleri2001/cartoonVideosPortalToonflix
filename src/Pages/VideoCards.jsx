import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import ReactPaginate from "react-paginate";
import LoadingOverlay from '../Components/LoadingOverlay';
import {PostSimilarvideoApi} from '../API/data'
const VideoCards = () => {
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const [videosPerPage] = useState(16);
  const [loadingVideoId, setLoadingVideoId] = useState(null); // Add state for loading video
  const storeFilteredVideos = useSelector((state) => state.category.filteredVideos);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      try {
        await new Promise((resolve) => setTimeout(resolve, 100));
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const fetchContinueVideos = async (videoId, name, image, videoUrl) => {


    const ani = Cookies.get('number');
    try {
      const data = {
        ani: ani,
        videoid: videoId,
        imageurl: image,
        title: name,
        vurl: videoUrl,
      };

      await axios.post(`${PostSimilarvideoApi}`, data);
      navigate(`/video/${videoId}`);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoadingVideoId(null); // Clear loading after API call
    }
  };

  const indexOfLastVideo = (currentPage + 1) * videosPerPage;
  const indexOfFirstVideo = indexOfLastVideo - videosPerPage;
  const currentVideos = storeFilteredVideos.slice(indexOfFirstVideo, indexOfLastVideo);

  const handlePageClick = (event) => {
    setCurrentPage(event.selected);
  };

  return (
    <div className="container bg-[#5B5B5B] mx-auto max-w-full px-4">

      <div className="flex items-center px-2 py-6">
        <div className="border-t border-4 border-gray-400 flex-grow"></div>
        <div className="px-3 text-orange-500 font-bold text-2xl">Explorer <span className="text-white">Vidéos</span> </div>
        <div className="border-t border-4 border-gray-400 flex-grow"></div>
      </div>

      {loading ? (
        <LoadingOverlay isLoading={loading} />
      ) : (
        <>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-0 mb-2">
            {currentVideos.map((data) => (
              <div
                key={data.id}
                className={`text-white cursor-pointer rounded-xl shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-2xl overflow-hidden ${loadingVideoId === data.id ? 'opacity-80' : ''}`}
                onClick={() => !loadingVideoId && fetchContinueVideos(data.id, data.name, data.imgurl, data.vurl)}
              >
                <div className="relative w-full overflow-hidden rounded-xl border-2 border-gray/40">
                  <img
                    src={data.imgurl}
                    alt={data.name}
                    className="w-full h-[200px] object-cover rounded-xl"
                  />
                  <div className="absolute bottom-0 left-0 w-full text-center bg-black bg-opacity-60 p-6 transition-all duration-300 opacity-0 hover:opacity-100">
                    <p className="text-white">{data.name}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Custom Pagination Component */}
          <div className="flex items-center justify-center rounded py-4">
            <ReactPaginate
              previousLabel={
                <svg
                  className="h-5 w-5"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z"
                    clipRule="evenodd"
                  />
                </svg>
              }
              nextLabel={
                <svg
                  className="h-5 w-5"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
                    clipRule="evenodd"
                  />
                </svg>
              }
              breakLabel="..."
              pageCount={Math.ceil(storeFilteredVideos.length / videosPerPage)}
              marginPagesDisplayed={2}
              pageRangeDisplayed={5}
              onPageChange={handlePageClick}
              containerClassName="relative z-0 inline-flex flex-wrap -space-x-px rounded-md shadow-md bg-white"
              pageClassName="relative inline-flex items-center text-sm text-gray-500 p-2 md:px-3 md:py-2 hover:bg-gray-200"
              activeClassName="border border-indigo-300 text-white bg-orange-400"
              previousClassName="relative inline-flex items-center rounded-l-md p-2 text-sm text-gray-500 hover:bg-gray-200"
              nextClassName="relative inline-flex items-center rounded-r-md p-2 text-sm text-gray-500 hover:bg-gray-200"
              breakClassName="relative inline-flex items-center text-sm text-gray-500 p-2 md:px-3 md:py-2 hover:bg-gray-200"
              disabledClassName="opacity-50 cursor-not-allowed"
            />
          </div>
        </>
      )}
    </div>
  );
};

export default VideoCards;



