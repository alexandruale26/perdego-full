import { useState, useRef } from "react";
import PropTypes from "prop-types";
import Spinner from "../../ui/Spinner";
import { getImageUrl, deleteImage } from "../../../services/imageApi";
import { isValidImage, convertImage } from "./js/imageUploader.js";
import { uploadImage } from "./js/imageUploader.js";
import DeleteImage from "./DeleteImage";
import { cn } from "../../../lib/utils";

const ImageSelect = ({ onImageSelect }) => {
  const [imageUrl, setImageUrl] = useState(null);
  const [imgPath, setImgPath] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef(null);

  const handleImageSelect = async (event) => {
    const file = event.target.files && event.target.files[0];
    if (!file) return;
    setIsLoading(true);

    const imageIsValid = isValidImage(file.type, file.size);
    if (imageIsValid === false) return setIsLoading(false);

    const converted = await convertImage(file);

    if (converted.error) {
      console.log("error after converting");
      return setIsLoading(false);
    }

    const { data: imagePath, error: uploaderError } =
      await uploadImage(converted);

    if (uploaderError) {
      return setIsLoading(false);
    }
    setImgPath(imagePath);
    setImageUrl(getImageUrl(imagePath));
    onImageSelect(imagePath);

    if (imgPath !== null) await deleteImage(imgPath);
  };

  const openImageInput = (event) => {
    if (event.key === "Enter" || event.key === " ") {
      inputRef.current.click();
    }
  };

  const handleClearImage = async () => {
    setImageUrl(null);
    onImageSelect(null); // remove the image from the form

    // delete image from storage
    if (imgPath !== null) await deleteImage(imgPath);
    if (inputRef.current) inputRef.current.value = "";
    setImgPath(null);
  };

  return (
    <div className="w-full h-full flex justify-center">
      <div className="h-[400px] w-[600px] flex flex-col gap-2 group">
        <label
          tabIndex={0}
          onKeyDown={openImageInput}
          type="button"
          className={cn(
            "h-full border border-grey-4 rounded-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-grey-950 group-has-[:disabled]:focus-visible:ring-grey-300 group-has-[:disabled]:cursor-not-allowed overflow-hidden transition-colors cursor-pointer",
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
            onChange={handleImageSelect}
          />

          <Spinner size="large" show={isLoading} />

          {imageUrl === null && (
            <div className="h-full w-full flex items-center justify-center flex-col gap-3">
              <p className="text-base text-black">Adaugǎ o imagine</p>
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

        <DeleteImage
          show={imageUrl !== null && isLoading === false}
          onClick={handleClearImage}
          className="shrink-0"
          style={{
            opacity: imageUrl !== null && isLoading === false ? 100 : 0,
          }}
        >
          Eliminǎ imaginea
        </DeleteImage>
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
