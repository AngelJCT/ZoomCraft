const API_URL = '/api/upscale';

export async function upscaleImage(file, operation) {

  const formData = new FormData();
  formData.append("file", file);
  
  const dataPayload = {
    operations: {
      restorations: {
        upscale: operation,
      },
    },
  };
  formData.append("data", JSON.stringify(dataPayload));

  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.CLAID_API_KEY}`,
      },
      body: formData,
    });

    const data = await response.json();

    if (!response.ok) {
      let errorMessage = "An error occurred while uploading the image";
      if (data.error_message) {
        errorMessage = data.error_message;
        if (data.error_details) {
          const details = Object.entries(data.error_details)
            .map(([key, value]) => `${key}: ${value.join(", ")}`)
            .join("; ");
          errorMessage += ` (${details})`;
        }
      }
      throw new Error(errorMessage);
    }

    const processedImageUrl = data.data?.output?.tmp_url;
    if (!processedImageUrl) {
      throw new Error("Processed image URL not found in the response");
    }

    return processedImageUrl;
  } catch (error) {
    console.error('Error in upscaleImage:', error);
    throw error;
  }
}