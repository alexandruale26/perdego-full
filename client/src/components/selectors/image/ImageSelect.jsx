import { useState, useRef } from "react";
import PropTypes from "prop-types";
// import Spinner from "@/shared/Spinner";
import { Camera } from "lucide-react";
import { getImageUrl, deleteImages } from "../../../services/imageApi";
import { isImageAndValidSize, convertImage } from "./js/helpers.js";
import { imageUploader } from "./js/imageUploader.js";
import ImageDeleteButton from "./ImageDeleteButton";
import { cn } from "../../../lib/utils";

const ImageSelect = ({ onImageSelect }) => {
  const [imageUrl, setImageUrl] = useState(null);
  const [imgPaths, setImgPaths] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef(null);

  //TODO: style it to match other inputs

  const handleImageChange = async (event) => {
    // if an image is already selected and the user wants to select
    // another image and cancels the action this function will be called
    const file = event.target.files && event.target.files[0];
    if (!file) return;
    setIsLoading(true);
    const { isImageType, isValidSize } = isImageAndValidSize(file);
    if (isImageType === false) {
      return setIsLoading(false);
    } else if (isValidSize === false) {
      return setIsLoading(false);
    }
    // converting the image to small and large variants
    const converterResponse = await convertImage(file);
    if (converterResponse.error) {
      return setIsLoading(false);
    }
    // uploading the image variants to storage
    const { data: imagePaths, error: uploaderError } = await imageUploader(
      converterResponse.data,
    );
    if (uploaderError) {
      return setIsLoading(false);
    }
    setImgPaths(imagePaths);
    setImageUrl(getImageUrl(imagePaths[1]));
    onImageSelect(imagePaths);
    if (imgPaths !== null) await deleteImages(imgPaths);
  };

  const openImageInput = (event) => {
    if (event.key === "Enter" || event.key === " ") {
      inputRef.current.click();
    }
  };

  const handleClearImage = async () => {
    setImageUrl(null);
    onImageSelect(null); // remove the image from the form
    if (imgPaths !== null) await deleteImages(imgPaths);
    if (inputRef.current) inputRef.current.value = "";
    setImgPaths(null);
  };

  return (
    <div className="w-full h-full flex justify-center">
      <div className="h-[400px] w-[600px] flex flex-col gap-2">
        <label
          tabIndex={0}
          onKeyDown={openImageInput}
          type="button"
          className={cn(
            "h-full border border-grey-300 rounded-md focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-grey-950 group-has-[:disabled]:focus-visible:ring-grey-300 group-has-[:disabled]:cursor-not-allowed overflow-hidden transition-colors cursor-pointer",
            {
              "hover:bg-gray-100": imageUrl === null && isLoading === false,
            },
          )}
        >
          <input
            hidden
            type="file"
            accept="image/*"
            ref={inputRef}
            disabled={isLoading}
            onChange={handleImageChange}
          />

          {isLoading && (
            <div className="w-full h-full flex items-center justify-center">
              {/* <Spinner /> */}
              Se incarcǎ....
            </div>
          )}

          {imageUrl === null && isLoading === false && (
            <div className="h-full w-full flex items-center justify-center flex-col gap-3">
              <p className="text-base text-black">Adaugǎ o imagine</p>
              <Camera width={60} height={60} strokeWidth={0.8} />
            </div>
          )}

          <img
            src={imageUrl}
            onLoad={() => setIsLoading(false)}
            onError={() => setIsLoading(false)}
            alt="post image"
            draggable="false"
            className={cn(
              "w-full h-full object-cover opacity-0 hover:brightness-[0.5] transition-opacity hover:transition duration-500 ease-out",
              {
                "opacity-100": isLoading === false && imageUrl !== null,
              },
            )}
          />
        </label>

        <ImageDeleteButton
          show={imageUrl !== null && isLoading === false}
          onClick={handleClearImage}
          className="shrink-0"
          style={{
            opacity: imageUrl !== null && isLoading === false ? 100 : 0,
          }}
        >
          Eliminǎ imaginea
        </ImageDeleteButton>
      </div>
    </div>
  );
};
ImageSelect.displayName = "ImageSelect";
ImageSelect.displayName = "ImageSelect";
ImageSelect.propTypes = {
  className: PropTypes.string,
  onImageSelect: PropTypes.func.isRequired,
};

export default ImageSelect;