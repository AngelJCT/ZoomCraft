// components/ImageUploader.js
import React from 'react';

const ImageUploader = ({ handleUpload }) => (
  <input
    type="file"
    accept="image/*"
    onChange={handleUpload}
    className="block w-full xs:text-[12px] sm:text-base font-normal text-gray-300
      file:mr-4 file:sm:py-2 file:sm:px-4 file:sm:w-auto file:sm:h-auto
      file:rounded-full file:border-0
      file:sm:text-base file:font-semibold
      file:bg-[#eaedef] file:text-[#111417]
      hover:file:bg-[#dadfe3] cursor-pointer file:xs:w-[90px]
      file:xs:h-[30px] file:xs:text-[12px] file:xs:px-2 file:xs:py-1"
  />
);

export default ImageUploader;
