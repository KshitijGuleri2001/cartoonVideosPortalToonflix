import React from 'react';

const Footer = () => {
  const d = new Date();
  const currentYear = d.getFullYear();
  const lastYear = currentYear - 1;

  return (
    <div className="w-full h-5/6">
      <div></div>

      <div className="bg-gray-200 border-t border-solid text-gray-600 text-center relative w-full">
        <p className="font-bold py-4">
          Visiontrek-Communication, 
          <span className="text-orange-600">
            {` ${lastYear} - ${currentYear}`}
          </span>
        </p>
      </div>
    </div>
  );
};

export default Footer;
