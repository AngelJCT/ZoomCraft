"use client"
import React from "react";
import ImageUploader from "../components/ImageUploader";
import ImageComparer from "../components/ImageComparer";

/**
 * Main Page component for the Image Upscaler application.
 * This component handles image upload, upscaling, and display.
 */
export default function Page() {
  const [originalImage, setOriginalImage] = React.useState(null);
  const [upscaledImage, setUpscaledImage] = React.useState(null);
  const [isUpscaling, setIsUpscaling] = React.useState(false);
  const [imageSize, setImageSize] = React.useState({ width: 0, height: 0 });
  const [errorMessage, setErrorMessage] = React.useState(null);
  const [selectedFile, setSelectedFile] = React.useState(null);
  const [selectedOperation, setSelectedOperation] = React.useState('photo');


  /**
   * Handles the image upload process.
   * @param {Event} event - The file input change event.
   */
  const handleUpload = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setOriginalImage(imageUrl);
      setSelectedFile(file); // Save the file for later use

      // Reset upscaled image and error message
      setUpscaledImage(null);
      setErrorMessage(null);
      setSelectedOperation(null);

      // Create an Image object to get the dimensions
      const img = new Image();
      img.onload = () => {
        setImageSize({ width: img.width, height: img.height });
      };
      img.src = imageUrl;
    }
  };

    /**
   * Handles the image upscaling process using Claid AI API.
   * This function sends the original image to the Claid AI API for upscaling.
   */
  const handleUpscale = async () => {
    if (!originalImage || !selectedFile) return;

    setIsUpscaling(true);
    setUpscaledImage(null);
    setErrorMessage(null);

    try {
      console.log("Uploading image to Claid AI storage...");

        // Create a FormData object and append the file and data
        const formData = new FormData();
        formData.append("file", selectedFile);
        const dataPayload = {
          operations: {
            restorations: {
              upscale: selectedOperation,
            },
          },
          }
        formData.append("data", JSON.stringify(dataPayload));

      // Upload the image to Claid AI storage
      const uploadResponse = await fetch(
        "https://api.claid.ai/v1-beta1/image/edit/upload",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_CLAID_API_KEY}`,
            // Note: Do not set 'Content-Type' header when sending FormData; browser will set it automatically
          },
          body: formData,
        }
      );
      const uploadData = await uploadResponse.json();
      console.log("Upload response:", JSON.stringify(uploadData, null, 2));

      if (!uploadResponse.ok) {
        let errorMessage = "An error occurred while uploading the image";
        if (uploadData.error_message) {
          errorMessage = uploadData.error_message;
          if (uploadData.error_details) {
            const details = Object.entries(uploadData.error_details)
              .map(([key, value]) => `${key}: ${value.join(", ")}`)
              .join("; ");
            errorMessage += ` (${details})`;
          }
        }
        throw new Error(errorMessage);
      }

      const processedImageUrl = uploadData.data?.output?.tmp_url;

      if (processedImageUrl) {
        setUpscaledImage(processedImageUrl);
      } else {
        console.error('Processed image URL not found in the response');
        throw new Error("Processed image URL not found in the response")
      }
    } catch (error) {
      console.error('Error:', error);
      setErrorMessage(error.message);
    } finally {
      setIsUpscaling(false);
    }
  };

  /**
   * Handles the download of the upscaled image.
   */
  const handleDownload = async () => {
    if (!upscaledImage) return;
  
    try {
      const response = await fetch(upscaledImage);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
  
      // Create a temporary anchor element and trigger a download
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'upscaled_image.jpeg');
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
  
      // Clean up the temporary URL
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error downloading the image:', error);
      setErrorMessage('Failed to download the image.');
    }
  };
  

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-[#111417] via-[#3c464e] to-[#111417]">
    <div className="container items-center justify-center flex flex-col">
      <h1 className="sm:text-4xl xs:text-2xl font-bold mb-8 text-[#eaedef]">Image Upscaler</h1>
      <div className="space-y-5 w-full max-w-md">
        <div className="border-b pb-2 border-[#eaedef]/25">
          <ImageUploader handleUpload={handleUpload} />
        </div>
        

        {/* Operation Selection */}
        <h2 className="sm:text-lg xs:text-base font-semibold text-[#eaedef]">Select your type of image upscaling method:</h2>
        <div className="flex space-x-2 border-b pb-2 border-[#eaedef]/25">
          
          {[
            { name: 'photo', description: 'Used on photos of people, nature, architecture, etc. taken with phones or digital cameras.' },
            { name: 'smart_enhance', description: 'Used on small low quality product, real estate and food images.' },
            { name: 'faces', description: 'Used on images containing people' },
            { name: 'digital_art', description: 'Used on drawings, illustrations, paintings, cartoons, anime, etc.' }
          ].map((operation) => (
            <button
              key={operation.name}
              onClick={() => setSelectedOperation(operation.name)}
              disabled={!originalImage}
              title={operation.description}
              className={`operation-button sm:px-4 sm:py-2 rounded-[4px] font-semibold ${
                selectedOperation === operation.name && originalImage
                ? 'bg-[#8b98a6] text-[#111417]'
                : 'bg-[#eaedef] text-[#111417]'
              }`}
            >
              {operation.name.charAt(0).toUpperCase() + operation.name.slice(1).replace('_', ' ')}
            </button>
          ))}
        </div>

        {/* Upscale Button */}
        <div className="flex justify-between">
          <button
            onClick={handleUpscale}
            disabled={!originalImage || isUpscaling}
            className="upscale-button sm:px-4 sm:py-2 sm:text-base font-semibold bg-gradient-to-r from-[#31343a] to-[#5c6371] text-[#eaedef] rounded-[4px] hover:bg-[#dadfe3] disabled:opacity-50 border border-[#eaedef]"
          >
            {isUpscaling ? 'Upscaling...' : 'Upscale Image'}
          </button>

          {/* Display errors to users */}
          {errorMessage && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
            <strong className="font-bold">Error: </strong>
            <span className="block sm:inline">{errorMessage}</span>
          </div>
          )}
        </div>
      </div>

      <div className="mt-8 py-4 px-4 w-full max-w-3xl rounded-[4px] flex justify-center items-center bg-opacity-[0.08] bg-[#eaedef] backdrop-filter backdrop-blur-lg">
        {originalImage && upscaledImage ? (
          <ImageComparer
            originalImage={originalImage}
            upscaledImage={upscaledImage}
            imageSize={imageSize}
            handleDownload={handleDownload}
            className="rounded-lg"
          />

        ) : originalImage ? (
          <div>
            <h2 className="text-xl font-semibold mb-4 text-[#eaedef]">Original Image</h2>
            <img src={originalImage} alt="Original" className="max-w-full rounded-lg" />
            <p className="mt-4 font-medium text-[#eaedef]">
              Size: {imageSize.width} x {imageSize.height} pixels
            </p>
          </div>
        ) : null}
      </div>
    </div>
      
    </div>
  );
}