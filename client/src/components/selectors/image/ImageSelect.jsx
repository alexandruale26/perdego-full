import { useState, useRef } from "react";
import PropTypes from "prop-types";
// import Spinner from "@/shared/Spinner";
import { Camera } from "lucide-react";
// import { getImageUrl, deleteImages } from "@/services/imageApi";
import { isImageAndValidSize, convertImage } from "./js/helpers.js";
import { imageUploader } from "./js/imageUploader.js";
import ImageDeleteButton from "./ImageDeleteButton";
import { cn } from "../../../lib/utils";

const ImageSelect = ({ className, onImageSelect }) => {
  const [imageUrl, setImageUrl] = useState(null);
  const [imgPaths, setImgPaths] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef(null);

  //TODO: work from here and finish image component

  const handleImageChange = async (event) => {
    // if an image is already selected and the user wants to select
    // another image and cancels the action this function will be called
    // const file = event.target.files && event.target.files[0];
    // if (!file) return;
    // setIsLoading(true);
    // const { isImageType, isValidSize } = isImageAndValidSize(file);
    // if (isImageType === false) {
    //   return setIsLoading(false);
    // } else if (isValidSize === false) {
    //   return setIsLoading(false);
    // }
    // converting the image to small and large variants
    // const converterResponse = await convertImage(file);
    // if (converterResponse.error) {
    //   return setIsLoading(false);
    // }
    // uploading the image variants to storage
    // const { data: imagePaths, error: uploaderError } = await imageUploader(
    //   converterResponse.data,
    // );
    // if (uploaderError) {
    //   return setIsLoading(false);
    // }
    // setImgPaths(imagePaths);
    // setImageUrl(getImageUrl(imagePaths[1]));
    // onImageSelect(imagePaths);
    // if (imgPaths !== null) await deleteImages(imgPaths);
  };

  const openImageInput = (event) => {
    if (event.key === "Enter" || event.key === " ") {
      inputRef.current?.click();
    }
  };

  const handleClearImage = async () => {
    // setImageUrl(null);
    // onImageSelect(null); // remove the image from the form
    // if (imgPaths !== null) await deleteImages(imgPaths);
    // if (inputRef.current) inputRef.current.value = "";
    // setImgPaths(null);
  };

  return (
    <div className={cn("bg-white rounded-md select-none group", className)}>
      <button
        onKeyDown={openImageInput}
        type="button"
        className={cn(
          "relative h-[400px] w-[600px] border border-grey-300 rounded-md focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-grey-950 group-has-[:disabled]:focus-visible:ring-grey-300 overflow-hidden transition-colors",
          {
            "hover:bg-grey-100": imageUrl === null && isLoading === false,
          },
        )}
      >
        <label className="h-full w-full overflow-hidden cursor-pointer group-has-[:disabled]:cursor-not-allowed">
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
              Se incarca....
            </div>
          )}

          {imageUrl === null && isLoading === false && (
            <div className="h-full w-full flex items-center justify-center flex-col gap-1">
              <p className="text-sm xs:text-base text-grey-800">
                Adaugǎ o imagine
              </p>
              <Camera
                width={40}
                height={40}
                strokeWidth={0.6}
                className="mt-2 max-w-[70px] xsm:max-w-[80px] max-h-[70px] xsm:max-h-[80px]"
              />
            </div>
          )}

          <img
            src={imageUrl}
            onLoad={() => setIsLoading(false)}
            onError={() => setIsLoading(false)}
            alt="selected"
            draggable="false"
            className={cn(
              "absolute w-full h-full object-cover hover:transition hover:brightness-[0.6] inset-0",
              {
                "opacity-0": isLoading || imageUrl === null,
                "opacity-100": isLoading === false && imageUrl !== null,
                "transition-opacity duration-1000 ease-out": isLoading === true,
              },
            )}
          />
        </label>
      </button>

      <ImageDeleteButton
        // show={imageUrl !== null && isLoading === false}
        show={true}
        onClick={handleClearImage}
        className="w-full"
      >
        Eliminǎ imaginea
      </ImageDeleteButton>
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
