import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedCategory } from '../slices/categorySlice';
import LoadingOverlay from '../Components/LoadingOverlay';

const translatedCategoryNames = {
  "All": "Tous",
  "T & T - Little Cooks": "T&T - Petits cuisiniers",
  "Kikool": "Kikool",
  "Boom & Reds": "Boum et rouges",
  "Alex & The Sea": "Alex et la mer",
  "Alex & Jungle": "Alex et Jungle",
  
};

const Header = ({ categories }) => {
  const [loading, setLoading] = useState(false);
  const storeSelectedCategory = useSelector((state) => state.category.selectedCategory);
  const dispatch = useDispatch();
  console.log("==",categories)
  const handleTabChange = (id) => {
    setLoading(true);

    setTimeout(() => {
      dispatch(setSelectedCategory(id));
      setLoading(false);
    }, 500); // 1 second delay
  };

  return (
    <div className="container mx-auto max-w-full h-full px-4">
      {/* Loading Overlay */}
      <LoadingOverlay isLoading={loading} />

      <div className="flex flex-col items-center justify-between gap-3">
        {/* Scrollable and responsive category tabs */}
        <div className="flex overflow-x-auto gap-2 py-3 w-full scrollbar-hide">
          <button
            className={`flex-shrink-0 px-4 py-2 rounded-full font-bold shadow-lg hover:cursor-pointer hover:bg-orange-600 hover:text-white ${
              storeSelectedCategory === 'All' ? 'bg-orange-600 text-white' : 'bg-white text-black'
            }`}
            onClick={() => handleTabChange('All')}
          >
           Tout
          </button>
          {categories.categories.map((category, i) => (
            <button
              key={i}
              className={`flex-shrink-0 px-4 py-2 rounded-full font-bold shadow-lg hover:bg-orange-600 hover:text-white ${
                storeSelectedCategory === category.sub_cat_id ? 'bg-orange-600 text-white' : 'bg-white text-black'
              }`}
              onClick={() => handleTabChange(category.sub_cat_id)}
            >
              {translatedCategoryNames[category.name]}
            </button>
          ))}
        </div>
      </div>
      <div
  className="w-full h-px max-w-6xl mx-auto py-1"
  style={{
    backgroundImage: 'linear-gradient(90deg, rgba(249, 115, 22, 0) 1.46%, rgba(249, 115, 22, 0.6) 40.83%, rgba(249, 115, 22, 0.3) 65.57%, rgba(249, 115, 22, 0) 107.92%)',
  }}
></div>


    </div>
  );
};

export default Header;
