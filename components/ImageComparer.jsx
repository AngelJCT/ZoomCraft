// components/ImageComparer.js
import React from 'react';
import ReactCompareImage from 'react-compare-image';
import CustomHandle from './CustomHandle';
import { ArrowDownTrayIcon } from '@heroicons/react/24/solid';

const ImageComparer = ({
  originalImage,
  upscaledImage,
  imageSize,
  handleDownload,
}) => (
  <div className="w-full rounded-[4px]">
    <div className="w-full aspect-[4/3] relative">
      <ReactCompareImage
        leftImage={originalImage}
        rightImage={upscaledImage}
        sliderPositionPercentage={0.5}
        leftImageLabel="Original"
        rightImageLabel="Upscaled"
        handle={<CustomHandle />}
        handleSize={40}
        handleColor="#fff"
        className="w-full h-full object-contain rounded-[4px]"
      />
    </div>
    
    {/* Download button */}
    <div className="flex justify-between mt-4">
      <button
        onClick={handleDownload}
        className="download-button sm:px-4 sm:py-2 sm:text-base bg-gradient-to-r from-[#31343a] to-[#5c6371] text-[#eaedef] rounded-[4px] font-semibold border border-[#eaedef] text-center flex items-center"
      >
        <ArrowDownTrayIcon className="w-5 h-5 mr-2" />
        Download
      </button>
    </div>
  </div>
);

export default ImageComparer;
