/*
   * Handles the image upscaling process.
   * This function sends the original image to the Stability AI API for upscaling.
   */
  
  /* const handleUpscale = async () => {
    if (!originalImage) return;

    setIsUpscaling(true);
    setUpscaledImage(null);

    const payload = {
      image: dataURItoBlob(originalImage),
      prompt: "Upscaled image preserving as much details as the original image. Better details and colors with soft texture.",
      output_format: "webp"
    };

    try {
      const response = await axios.postForm(
        `https://api.stability.ai/v2beta/stable-image/upscale/conservative`,
        axios.toFormData(payload),
        {
          validateStatus: undefined,
          responseType: "arraybuffer",
          headers: { 
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_STABILITY_API_KEY}`, 
            Accept: "image/*",
          },
        }
      );

      if (response.status === 200) {
        const blob = new Blob([response.data], { type: 'image/webp' });
        setUpscaledImage(URL.createObjectURL(blob));
      } else {
        console.error(`Upscaling failed: ${response.status}`);
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsUpscaling(false);
    }
  };